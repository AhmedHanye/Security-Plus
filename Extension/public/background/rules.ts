/* eslint-disable @typescript-eslint/no-unused-vars */
// * Add a new rules to the declarativeNetRequest API
const updateRules = (rules, callback) => {
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
              type: "block",
            },
            condition: {
              urlFilter: "*",
              resourceTypes: ["main_frame"],
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

const updateNewRules = ({ pageRules, domainRules }, callback) => {
  let id = 2;
  const newDomainRules = domainRules.map((rule) => {
    if (rule.status === "allowed")
      return {
        id: id++,
        priority: 1,
        action: {
          type: "allow",
        },
        condition: {
          urlFilter: `*://${rule.domain}/*`,
          resourceTypes: ["main_frame"],
        },
      };
  });
  const newPageRules = pageRules.map((rule) => {
    if (rule.status === "allowed")
      return {
        id: id++,
        priority: 1,
        action: {
          type: "allow",
        },
        condition: {
          urlFilter: rule.url,
          resourceTypes: ["main_frame"],
        },
      };
  });
  updateRules(
    [...newDomainRules, ...newPageRules].filter((rule) => rule !== undefined),
    callback
  );
};

const redirectUrl = (details, path) => {
  chrome.tabs.update(details.tabId, {
    url: chrome.runtime.getURL("index.html#/") + path,
  });
};

const manageRedirect = (details, searchUrl) => {
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
