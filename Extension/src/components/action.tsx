import actionImage from "../assets/action.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

import { sendMessage } from "../utils/database";

const Action = ({
  url,
  addNotification,
}: {
  url: string;
  addNotification: Function;
}) => {
  const [option, setOption] = useState<number>(0);
  const handleAction = () => {
    sendMessage(
      {
        type: option === 0 || option === 1 ? 2 : 3,
        item: option === 0 || option === 1 ? url : new URL(url).hostname,
        state: option === 0 || option === 2 ? false : true,
      },
      (response: string) => {
        if (!response[1]) {
          window.location.href = url;
        } else {
          addNotification(response[0]);
        }
      }
    );
  };
  return (
    <section
      id="action"
      className={
        "mx-8 h-48 max-md:h-64 max-md:m-0 max-md:rounded-none rounded-3xl flex overflow-hidden shadow-2xl shadow-black bg-Charcoal dark:bg-Gainsboro text-base"
      }
    >
      <div className={"w-full flex max-md:flex-col p-3"}>
        <div className={"w-2/3 max-md:w-full h-full flex flex-col ps-4"}>
          <h1 className={"w-fit flex items-center gap-2"}>
            <p className={"text-white dark:text-black text-2xl font-semibold"}>
              Take Action
            </p>
            <div className={"h-fit relative group"}>
              <FontAwesomeIcon
                icon={faCircleInfo}
                className={"text-base text-blue-500 cursor-pointer"}
              />
              <span
                className={
                  "absolute hidden group-hover:block bg-gray-200 dark:bg-gray-900 dark:text-white w-80 h-28 top-8 text-sm  left-1/2 transform -translate-x-1/2 p-1.5 rounded-lg "
                }
              >
                The priority of the action (block or allow) is for the website
                not the domain which means if the domain is blocked and the
                website is allowed every website in that domain will be blocked
                but the website will be allowed and vice versa.
              </span>
            </div>
          </h1>
          <div className={"h-full w-full flex items-center"}>
            <div class="w-full mx-4 max-md:ms-0">
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-md:py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e: React.ChangeEvent<EventTarget>) => {
                  const target = e.target as HTMLSelectElement;
                  if (target) {
                    setOption(parseInt(target.value, 10));
                  }
                }}
              >
                <option value="0" selected>
                  Block Website
                </option>
                <option value="1">Allow Website</option>
                <option value="2">Block Domain</option>
                <option value="3">Allow Domain</option>
              </select>
            </div>
          </div>
        </div>
        <div
          className={
            "w-1/3 max-md:w-full h-full flex flex-col justify-between gap-1 p-4 items-center"
          }
        >
          <p
            className={
              "text-white max-md:text-sm dark:text-black font-bold text-center"
            }
          >
            {option === 0
              ? "This will block only the website from being accessed."
              : option === 1
              ? "This will allow only the website to be accessed."
              : option === 2
              ? "This will block the domain and subdomains from being accessed."
              : "This will allow the domain and subdomains to be accessed."}
          </p>
          <button
            className={`text-white w-52 h-11 max-md:h-9 max-lg:text-base max-md:text-sm max-lg:w-full rounded-lg text-xl font-semibold hover:brightness-110 transition-all will-change-contents duration-100 ${
              option == 0 || option == 2 ? "bg-red-600" : "bg-green-600"
            }`}
            name={"action"}
            aria-label={"action"}
            onClick={handleAction}
          >
            {option === 0
              ? "Block Website"
              : option === 1
              ? "Allow Website"
              : option === 2
              ? "Block Domain"
              : "Allow Domain"}
          </button>
        </div>
      </div>
      <img src={actionImage} className={"max-md:hidden"} alt="action image" />
    </section>
  );
};

export default Action;
