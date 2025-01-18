import { updateNewRules, manageRedirect } from './rules';
import { getRules, searchUrl, addRule, deleteRule, changeState, deleteMultipleRules, changeMultipleState } from './database';

// * Add Default Rule to redirect to the Check and Control page
chrome.runtime.onInstalled.addListener(async () => {
  try {
    const pageRules = await getRules("pageRules");
    const domainRules = await getRules("domainRules");
    await updateNewRules({ pageRules, domainRules }, () => {});
  } catch (error) {
    console.error('Error during installation:', error);
  }
});

// * got checkControl page or to block page based on rules
chrome.webNavigation.onBeforeNavigate.addListener((details) =>
  manageRedirect(details, searchUrl)
);

// * talk to index.html
chrome.runtime.onMessage.addListener((request: MessageRequest, sender, sendResponse: CallbackFunction): boolean => {
  const handleRuleUpdate = async () => {
    const pageRules = await getRules("pageRules");
    const domainRules = await getRules("domainRules");
    updateNewRules({ pageRules, domainRules }, sendResponse);
  };

  try {
    switch (request.action) {
      case "addRule":
        if (request.data && !Array.isArray(request.data)) {
          addRule(request.data as Rule, () => handleRuleUpdate());
        }
        break;

      case "getData":
        (async () => {
          const pageRules = await getRules("pageRules");
          const domainRules = await getRules("domainRules");
          sendResponse({ pageRules, domainRules });
        })();
        break;

      case "deleteRule":
        if (request.data && !Array.isArray(request.data)) {
          deleteRule(request.data as Rule).then(handleRuleUpdate);
        }
        break;

      case "changeState":
        if (request.data && !Array.isArray(request.data)) {
          changeState(request.data as Rule).then(handleRuleUpdate);
        }
        break;

      case "deleteMultipleRules":
        if (request.data && Array.isArray(request.data)) {
          deleteMultipleRules(request.data).then(handleRuleUpdate);
        }
        break;

      case "changeMultipleState":
        if (request.data && Array.isArray(request.data)) {
          changeMultipleState(request.data).then(handleRuleUpdate);
        }
        break;
    }
  } catch (error) {
    console.error('Error handling message:', error);
    sendResponse({ error: 'An error occurred' });
  }

  return true;
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("index.html"),
  });
});
