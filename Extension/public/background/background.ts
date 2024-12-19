importScripts("./rules.js");
importScripts("./database.js");

// TODO: Optimize the code

// * Add Default Rule to redirect to the Check and Control page
chrome.runtime.onInstalled.addListener(async () =>
  updateNewRules(
    {
      pageRules: await getRules("pageRules"),
      domainRules: await getRules("domainRules"),
    },
    () => {}
  )
);

// * got checkControl page or to block page based on rules
chrome.webNavigation.onBeforeNavigate.addListener((details) =>
  manageRedirect(details, searchUrl)
);

// * talk to index.html
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "addRule") {
    addRule(request.data, async () => {
      updateNewRules(
        {
          pageRules: await getRules("pageRules"),
          domainRules: await getRules("domainRules"),
        },
        sendResponse
      );
    });
  } else if (request.action === "getData") {
    getRules("pageRules").then((pageRules) => {
      getRules("domainRules").then((domainRules) => {
        sendResponse({ pageRules, domainRules });
      });
    });
  } else if (request.action === "deleteRule") {
    deleteRule(request.data).then(async () => {
      updateNewRules(
        {
          pageRules: await getRules("pageRules"),
          domainRules: await getRules("domainRules"),
        },
        sendResponse
      );
    });
  } else if (request.action === "changeState") {
    changeState(request.data).then(async () => {
      updateNewRules(
        {
          pageRules: await getRules("pageRules"),
          domainRules: await getRules("domainRules"),
        },
        sendResponse
      );
    });
  } else if (request.action === "deleteMultipleRules") {
    deleteMultipleRules(request.data).then(async () => {
      updateNewRules(
        {
          pageRules: await getRules("pageRules"),
          domainRules: await getRules("domainRules"),
        },
        sendResponse
      );
    });
  } else if (request.action === "changeMultipleState") {
    changeMultipleState(request.data).then(async () => {
      updateNewRules(
        {
          pageRules: await getRules("pageRules"),
          domainRules: await getRules("domainRules"),
        },
        sendResponse
      );
    });
  }
  return true; // ! return true to keep the message channel open
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("index.html"),
  });
});
