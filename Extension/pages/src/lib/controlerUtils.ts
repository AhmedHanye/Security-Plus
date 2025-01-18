const setLoading = (loading: boolean) => {
  const loader = document.querySelector("#loading");
  if (loader && loader instanceof HTMLElement) {
    loader.style.display = loading ? "flex" : "none";
  }
};

export const handleChangeState = (rule: rule) => {
  setLoading(true);
  chrome.runtime.sendMessage(
    {
      action: "changeState",
      data: rule,
    },
    () => setLoading(false)
  );
};

export const handleDelete = (rule: rule) => {
  setLoading(true);
  chrome.runtime.sendMessage(
    {
      action: "deleteRule",
      data: rule,
    },
    () => setLoading(false)
  );
};

export const handleMultipleDelete = (rules: rule[]) => {
  setLoading(true);
  chrome.runtime.sendMessage(
    {
      action: "deleteMultipleRules",
      data: rules,
    },
    () => setLoading(false)
  );
};

export const handleMultipleChangeState = (rules: rule[]) => {
  setLoading(true);
  chrome.runtime.sendMessage(
    {
      action: "changeMultipleState",
      data: rules,
    },
    () => setLoading(false)
  );
};

export const handleData = (
  callback: (response: { pageRules: rule[]; domainRules: rule[] }) => void
) => {
  const getData = () => {
    setLoading(true);
    chrome.runtime.sendMessage(
      {
        action: "getData",
      },
      (Response) => {
        setLoading(false);
        callback(Response);
      }
    );
  };
  getData();
  // * when chrom storage is updated
  chrome.storage.onChanged.addListener(getData);
};

export const handleUrlAction = (
  rule: rule,
  callback: (response: string) => void
) => {
  setLoading(true);
  chrome.runtime.sendMessage(
    {
      action: "addRule",
      data: rule,
    },
    (Response) => {
      setLoading(false);
      callback(Response);
    }
  );
};
