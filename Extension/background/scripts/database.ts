// * save rules to database
const saveRules = async (ruleType: string, rules: Rule[]): Promise<void> => {
  return new Promise<void>((resolve) => {
    chrome.storage.local.set({ [ruleType]: rules }, () => {
      resolve();
    });
  });
};

// * get rules from database
const getRules = async (ruleType: string): Promise<Rule[]> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(ruleType, (data) => {
      resolve(data[ruleType] || []);
    });
  });
};

// * search for info about a specific url
const searchUrl = async (url: string, callback: (pageRule: Rule | undefined, domainRule: Rule | undefined) => void): Promise<void> => {
  const domain = new URL(url).hostname;
  const pageRules = await getRules("pageRules");
  const domainRules = await getRules("domainRules");
  const matchedPageRules = pageRules.find((rule) => rule.url === url);
  const matchedDomainRules = domainRules.find((rule) => rule.domain === domain);
  callback(matchedPageRules, matchedDomainRules);
};

// * add a new rule to the database
const addRule = async (rule: Rule, callback: () => void): Promise<void> => {
  const ruleType = rule.url ? "url" : "domain";
  const ruleDatabaseType = rule.url ? "pageRules" : "domainRules";
  const rules: Rule[] = await getRules(ruleDatabaseType);
  let updated = false;
  for (const r of rules) {
    if (r[ruleType] === rule[ruleType]) {
      r.status = rule.status as "allowed" | "blocked";
      updated = true;
      break;
    }
  }
  if (!updated) {
    rules.push(rule);
  }
  await saveRules(ruleDatabaseType, rules);
  callback();
};

// * delete a rule from the database
const deleteRule = async (rule: Rule): Promise<void> => {
  const ruleType = rule.url ? "url" : "domain";
  const ruleDatabaseType = rule.url ? "pageRules" : "domainRules";
  const rules: Rule[] = await getRules(ruleDatabaseType);
  const newRules = rules.filter((r) => r[ruleType] !== rule[ruleType]);
  await saveRules(ruleDatabaseType, newRules);
};

// * change state of a rule
const changeState = async (rule: Rule): Promise<void> => {
  const ruleType = rule.url ? "url" : "domain";
  const ruleDatabaseType = rule.url ? "pageRules" : "domainRules";
  const rules: Rule[] = await getRules(ruleDatabaseType);
  for (const r of rules) {
    if (r[ruleType] === rule[ruleType]) {
      r.status = r.status === "allowed" ? "blocked" : "allowed";
      break;
    }
  }
  await saveRules(ruleDatabaseType, rules);
};


// * delete multiple rules
const deleteMultipleRules = async (rules: Rule[]): Promise<void> => {
  for (const rule of rules) {
    await deleteRule(rule);
  }
};

// * change state of multiple rules
const changeMultipleState = async (rules: Rule[]): Promise<void> => {
  for (const rule of rules) {
    await changeState(rule);
  }
};

export { saveRules, getRules, searchUrl, addRule, deleteRule, changeState, deleteMultipleRules, changeMultipleState };