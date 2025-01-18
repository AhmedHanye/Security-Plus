type Rule = {
  url?: string;
  domain?: string;
  status: "allowed" | "blocked";
  id?: number;
};

type MessageRequest = {
  action: "addRule" | "getData" | "deleteRule" | "changeState" | "deleteMultipleRules" | "changeMultipleState";
  data?: Rule | Rule[];
};

type RuleSet = {
  pageRules: Rule[];
  domainRules: Rule[];
};

type CallbackFunction = (response?: any) => void;

type ChromeRule = chrome.declarativeNetRequest.Rule;

type UpdateRulesCallback = (response?: string) => void;
