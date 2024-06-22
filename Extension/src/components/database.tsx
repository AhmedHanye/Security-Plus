import { useState, useEffect } from "react";
import { sendMessage } from "../utils/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const DataBase = ({
  name,
  setNotifications,
  setLoading,
}: {
  name: string;
  setNotifications: Function;
  setLoading: Function;
}) => {
  interface Url {
    id: number;
    url: string;
    state: boolean;
    date: Date;
  }
  const options = name === "URLs" ? [0, 4, 6] : [1, 5, 7];
  const [urls, setUrls] = useState<Url[]>([]);
  const [checked, setChecked] = useState<number[]>([]);
  const [databaseLoading, setDatabaseLoading] = useState(true);
  // 0 or 1 => 0
  const getItems = (t: number): void => {
    setDatabaseLoading(true);
    sendMessage({ type: t }, (response: [Url[], boolean]) => {
      if (!response[1]) {
        setUrls(response[0]);
      }
      setDatabaseLoading(false);
    });
  };
  // 6 or 7 => 2
  const removeItem = (t: number, id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      sendMessage({ type: t, id: id }, (response: [Url[], boolean]) => {
        if (!response[1]) {
          setUrls((prevUrls) => prevUrls.filter((url) => url.id !== id));
          setChecked((prevChecked) => prevChecked.filter((c) => c !== id));
          resolve(true);
        } else {
          getItems(options[0]);
          setNotifications((prevNotifications: any) => [
            "the items weren't updated earlier, but everything is good to go now",
            ...prevNotifications,
          ]);
          resolve(false);
        }
      });
    });
  };

  // 4 or 5 => 1
  const changeItem = (
    t: number,
    id: number,
    state: boolean
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      sendMessage(
        { type: t, id: id, state: state },
        (response: [Url[], boolean]) => {
          console.log(response);
          if (!response[1]) {
            setUrls((prevUrls) =>
              prevUrls.map((url) => {
                if (url.id === id) {
                  url.state = state;
                }
                return url;
              })
            );
            resolve(true);
          } else {
            getItems(options[0]);
            setNotifications((prevNotifications: any) => [
              `The Items in ${name} weren't updated earlier, but everything is good to go now`,
              ...prevNotifications,
            ]);
            resolve(false);
          }
        }
      );
    });
  };

  useEffect((): void => {
    getItems(options[0]);
  }, []);

  return (
    <div className={"p-5 max-md:p-2 database"}>
      <div className="pt-12 relative ">
        <h1 className=" absolute top-0 text-xl left-0 font-bold dark:text-gray-200 text-Charcoal">
          {name}
        </h1>
        <div className="flex gap-5 text-black dark:text-white font-bold absolute top-4 right-3">
          <button
            disabled={checked.length === 0}
            className={`${checked.length == 0 && "cursor-not-allowed"}`}
            onClick={async () => {
              setLoading(true);
              for (const id of checked) {
                const success: boolean = await changeItem(
                  options[1],
                  id,
                  !urls.find((url) => url.id === id)!.state
                );
                if (!success) {
                  setLoading(false);
                  return;
                }
              }
              setLoading(false);
            }}
          >
            Change
          </button>
          <button
            disabled={checked.length === 0}
            className={`${checked.length == 0 && "cursor-not-allowed"}`}
            onClick={async () => {
              setLoading(true);
              for (const id of checked) {
                const success: boolean = await removeItem(options[2], id);
                if (!success) {
                  setLoading(false);
                  return;
                }
              }
              setLoading(false);
            }}
          >
            Remove
          </button>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <div
            className={
              "overflow-auto database-scrollbar h-72 min-w-[60vw] dark:bg-gray-300 bg-gray-800"
            }
          >
            <table className="w-full text-left text-sm max-lg:text-xs max-md:text-[0.6rem] max-sm:text-[0.4rem] rtl:text-right">
              <thead className="dark:text-gray-700 uppercase dark:bg-gray-50 bg-gray-700 text-gray-100 sticky top-0">
                <tr>
                  <th className="gap-3 px-6 flex py-3">
                    <div className="flex items-center">
                      <input
                        id={`${name}-checkbox-all`}
                        type="checkbox"
                        onChange={(e: any) => {
                          if (e.target.checked) {
                            setChecked(urls.map((url) => url.id));
                          } else {
                            setChecked([]);
                          }
                        }}
                        checked={
                          urls.length !== 0 && urls.length == checked.length
                        }
                        className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    {name}
                  </th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url) => (
                  <tr
                    key={url.id}
                    className="border-b border-gray-700 dark:hover:bg-gray-50 hover:bg-gray-600"
                  >
                    <td
                      scope="row"
                      className="flex gap-3 py-2 px-6 w-[26rem] max-lg:w-[16rem] max-md:w-36 font-medium dark:text-gray-900 whitespace-nowrap text-white"
                    >
                      <div className="flex items-center">
                        <input
                          id={`${name}-checkbox-table-search-${url.id}`}
                          type="checkbox"
                          checked={checked.includes(url.id)}
                          onChange={(e: any) => {
                            if (e.target.checked) {
                              setChecked([...checked, url.id]);
                            } else {
                              setChecked(checked.filter((id) => id !== url.id));
                            }
                          }}
                          className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <p
                        className="text-nowrap break-words text-ellipsis overflow-hidden"
                        title={url.url}
                      >
                        {url.url}
                      </p>
                    </td>
                    <td
                      className={"text-nowrap text-white dark:text-black px-2 "}
                    >
                      <time dateTime={new Date(url.date).toISOString()}>
                        {new Date(url.date)
                          .toLocaleDateString()
                          .replace(/\//g, "-")}
                      </time>
                    </td>
                    <td
                      className={`font-bold px-4 ${
                        url.state ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <span>{url.state ? "Allowed" : "Blocked"}</span>
                    </td>
                    <td className="flex items-center pe-2 ">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={async () => {
                          setLoading(true);
                          await changeItem(options[1], url.id, !url.state);
                          setLoading(false);
                        }}
                      >
                        Change
                      </button>
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                        onClick={async () => {
                          setLoading(true);
                          await removeItem(options[2], url.id);
                          setLoading(false);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {databaseLoading && (
            <div
              className={
                "absolute top-0 w-full h-full flex justify-center items-center text-4xl text-white dark:text-blue-500 bg-Charcoal dark:bg-white"
              }
            >
              <FontAwesomeIcon
                icon={faCircleNotch}
                className={"animate-spin"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataBase;
