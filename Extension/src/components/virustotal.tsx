import { useEffect, useState } from "preact/hooks";
import { scanURL } from "../utils/general";

import virustotalImage from "../assets/virustotal.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Virsustotal = ({
  url,
  addNotification,
}: {
  url: string;
  addNotification: Function;
}) => {
  const [details, setDetails] = useState<{
    [key: string]: {
      method: string;
      engine_name: string;
      category: string;
      result: string;
    };
  }>({});
  const [result, setResult] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [startScan, setStartScan] = useState(false);
  const handleScanURL = () => {
    scanURL(url, (result: any) => {
      if (!result[1]) {
        setResult(result[0].data.attributes.stats);
        setDetails(result[0].data.attributes.results);
        setLoading(false);
      } else {
        if (result[0].response.status === 429) {
          addNotification(
            "You have exceeded the rate limit please try again later"
          );
        } else {
          addNotification(result[0].response.data.error.message);
        }
      }
    });
  };
  useEffect(() => {
    if (url !== "" && startScan) {
      handleScanURL();
    }
  }, [url]);
  return (
    <section
      className={
        "mx-8 min-h-48 max-md:min-h-64 max-md:m-0 max-md:rounded-none rounded-3xl flex max-md:flex-col overflow-hidden shadow-2xl shadow-black bg-Charcoal dark:bg-Gainsboro text-base relative"
      }
    >
      {!startScan ? (
        <>
          <div className={"w-full h-full flex justify-center items-center"}>
            <button
              type="button"
              class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-bold rounded-md text-lg px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              onClick={() => setStartScan(true)}
            >
              Start Scan
            </button>
          </div>
          <img
            src={virustotalImage}
            className={"max-sm:hidden h-full"}
            alt="virustotal Image"
          />
        </>
      ) : (
        <>
          <div
            className={
              "w-full p-6 max-md:p-5 flex items-center max-md:justify-center gap-4"
            }
          >
            <div
              id={"final-result"}
              className={
                "flex items-center justify-center relative rounded-full w-32 h-32 bg-white shadow-inner shadow-black"
              }
            >
              <span className={"font-bold text-xl"}>
                {result["malicious"] == undefined ? "--" : result["malicious"]}{" "}
                /{" "}
                {Object.keys(result).length !== 0
                  ? result["malicious"] +
                    result["suspicious"] +
                    result["harmless"] +
                    result["undetected"]
                  : "--"}
              </span>
            </div>
            <div
              className={
                "grid grid-cols-2 grid-rows-2 max-lg:grid-cols-1 max-lg:grid-rows-4 gap-x-6 max-md:gap-0 h-full items-center font-extrabold capitalize max-lg:text-sm max-md:h-24"
              }
            >
              <span className={"dark:text-red-600 text-red-500"}>
                <pre>
                  {"malicious".padEnd(11, " ")}:{" "}
                  {result["malicious"] == undefined
                    ? "--"
                    : result["malicious"]}
                </pre>
              </span>
              <span className={"dark:text-yellow-600 text-yellow-400"}>
                <pre>
                  {"suspicious".padEnd(11, " ")}:{" "}
                  {result["suspicious"] == undefined
                    ? "--"
                    : result["suspicious"]}
                </pre>
              </span>
              <span className={"dark:text-gray-600 text-gray-300"}>
                <pre>
                  {"undetected".padEnd(11, " ")}:{" "}
                  {result["undetected"] == undefined
                    ? "--"
                    : result["undetected"]}
                </pre>
              </span>
              <span className={"dark:text-green-600 text-green-400"}>
                <pre>
                  {"harmless".padEnd(11, " ")}:{" "}
                  {result["harmless"] == undefined ? "--" : result["harmless"]}
                </pre>
              </span>
            </div>
          </div>
          <div
            className={`overflow-auto database-scrollbar transform translate-x-2 h-full max-h-48 w-full dark:bg-gray-300 bg-gray-800 ${
              Object.keys(details).length == 0 ? "hidden" : ""
            }`}
          >
            <table className="w-full text-left text-xs rtl:text-right">
              <thead className="dark:text-gray-700 uppercase dark:bg-gray-50 bg-gray-700 text-gray-100 sticky top-0">
                <tr>
                  <th className="px-6 py-3">engine</th>
                  <th className="px-6 py-3">result</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(details).map((key) => (
                  <tr
                    key={key}
                    className={
                      "border-b border-gray-700  dark:hover:bg-gray-50 hover:bg-gray-600 text-sm"
                    }
                  >
                    <td className="font-medium ps-6 py-1 dark:text-gray-900 whitespace-nowrap text-white">
                      {details[key].engine_name}
                    </td>
                    <td className={" text-white ps-7 py-1 dark:text-black"}>
                      {details[key].result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <img
            src={virustotalImage}
            className={"max-md:hidden"}
            alt="virustotal Image"
          />
          {loading && (
            <div
              className={
                "absolute top-0 w-full h-full flex items-center justify-center bg-Charcoal dark:bg-gray-400"
              }
            >
              <FontAwesomeIcon
                icon={faCircleNotch}
                className={"text-white animate-spin text-3xl"}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Virsustotal;
