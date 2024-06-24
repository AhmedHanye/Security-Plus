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

const getPreference = (
  callback: ((arg0: any) => void) | undefined,
  preference: string
) => {
  chrome.storage.local.get(preference, function (data) {
    if (callback) {
      callback(data[preference]);
    }
  });
};

const setPreference = (preference: string, value: any) => {
  const preferenceObj: { [key: string]: any } = {};
  preferenceObj[preference] = value;
  chrome.storage.local.set(preferenceObj);
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
