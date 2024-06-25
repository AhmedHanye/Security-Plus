const sendMessage = (
  message: {
    type: number;
    item?: string;
    state?: boolean;
    id?: number;
  },
  callball: Function
) => {
  try {
    chrome.runtime.sendMessage(message, (response) => {
      callball(response);
    });
  } catch (err) {
    callball(["err", true]);
  }
};

const getPreference = (preference: string) : any => {
  return localStorage.getItem(preference);
};

const setPreference = (preference: string, value: any) => {
  localStorage.setItem(preference, value);
};

const getURL = (callback: Function) => {
  chrome.tabs.getCurrent((tab) => {
    const tabId: any = tab?.id;
    chrome.storage.local.get([tabId.toString()], (result) => {
      callback(result[tabId]);
    });
  });
};

export { sendMessage, getPreference, setPreference, getURL };
