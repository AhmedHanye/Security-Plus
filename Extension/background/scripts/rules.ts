// ! don't change these states it works for both chrome and firefox
const allow = "allow" as chrome.declarativeNetRequest.RuleActionType.ALLOW;
const block = "block" as chrome.declarativeNetRequest.RuleActionType.BLOCK;
const mainFrame = chrome.declarativeNetRequest.ResourceType.MAIN_FRAME;

const updateRules = (
  rules: ChromeRule[],
  callback: UpdateRulesCallback
): void => {
  chrome.declarativeNetRequest.getDynamicRules((preRules) => {
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: preRules.map((rule) => rule.id), // ! remove all previous rules so we have no conflicts
        addRules: [
          // ! Default rule to block all requests so no request is made to the (known/unknown) url
          {
            id: 1,
            priority: 1,
            action: {
              type: block,
            },
            condition: {
              urlFilter: "*",
              resourceTypes: [
                mainFrame,
              ],
            },
          },
          // * Add new rules
          ...rules,
        ],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        }
        callback("Rules Updated");
      }
    );
  });
};

const updateNewRules = (
  { pageRules, domainRules }: RuleSet,
  callback: UpdateRulesCallback
): void => {
  let id = 2;
  const newDomainRules: ChromeRule[] = domainRules
    .filter((rule) => rule.status === "allowed")
    .map((rule) => ({
      id: id++,
      priority: 1,
      action: {
        type: allow,
      },
      condition: {
        urlFilter: `*://${rule.domain}/*`,
        resourceTypes: [mainFrame],
      },
    }));

  const newPageRules: ChromeRule[] = pageRules
    .filter((rule) => rule.status === "allowed")
    .map((rule) => ({
      id: id++,
      priority: 1,
      action: {
        type: allow,
      },
      condition: {
        urlFilter: rule.url || "",
        resourceTypes: [mainFrame],
      },
    }));

  updateRules([...newDomainRules, ...newPageRules], callback);
};

const redirectUrl = (
  details: chrome.webNavigation.WebNavigationParentedCallbackDetails,
  path: string
): void => {
  chrome.tabs.update(details.tabId, {
    url: chrome.runtime.getURL("index.html#/") + path,
  });
};

const manageRedirect = (
  details: chrome.webNavigation.WebNavigationParentedCallbackDetails,
  searchUrl: (
    url: string,
    callback: (pageRule: Rule | undefined, domainRule: Rule | undefined) => void
  ) => void
): void => {
  if (details.frameId !== 0 || !details.url.startsWith("http")) return;
  searchUrl(details.url, (pageRule, domainRule) => {
    if (!pageRule && !domainRule) {
      redirectUrl(details, "check/" + encodeURIComponent(details.url));
    } else if (pageRule) {
      if (pageRule.status === "blocked")
        redirectUrl(details, "block/" + encodeURIComponent(details.url));
    } else if (domainRule) {
      if (domainRule.status === "blocked")
        redirectUrl(details, "block/" + encodeURIComponent(details.url));
    }
  });
};

export { updateRules, updateNewRules, redirectUrl, manageRedirect };
