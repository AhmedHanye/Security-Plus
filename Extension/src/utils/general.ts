import axios from "axios";
import { getPreference } from "./database";

// const apiKey: any = getPreference((data: any) => {
//   return data === undefined ? "" : data;
// }, "apikey");

let headers = {
  accept: "application/json",
  "content-type": "application/x-www-form-urlencoded",
  "X-Apikey": "",
};

export const changeTheme = (): void => {
  const currentTheme = document
    .querySelector("html")
    ?.classList.contains("dark");
  const localTheme = getPreference("theme") === "true";
  if (localTheme !== currentTheme) {
    if (localTheme == true) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }
};

const getURLId = async (url: string): Promise<any> => {
  try {
    const response = await axios.post(
      "https://www.virustotal.com/api/v3/urls",
      {
        url: url,
      },
      {
        headers: headers,
      }
    );
    return [response.data.data.id, false];
  } catch (error) {
    return [error, true];
  }
};

const getResult = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${id}`,
      {
        headers: headers,
      }
    );
    if (response.data.data.attributes.status == "queued") {
      return getResult(id);
    }
    return [response.data, false];
  } catch (error) {
    return [error, true];
  }
};

export const scanURL = async (
  url: string,
  callback: Function
): Promise<any> => {
  const apikey = await new Promise<string>((resolve) => {
    const key = getPreference("apikey");
    resolve(key);
  });
  if (apikey === undefined || apikey === null || apikey === "") {
    callback(["Please enter an API key", true]);
    return;
  }

  headers["X-Apikey"] = apikey;
  const id = await getURLId(url);
  if (id[1]) {
    callback(id);
  } else {
    const result = await getResult(id[0]);
    callback(result);
  }
};
