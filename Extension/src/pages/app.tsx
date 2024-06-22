import Navbar from "../components/navbar";
import Action from "../components/action";
import Notification from "../components/notification";

import { useState, useEffect } from "react";
import { getPreference, getURL } from "../utils/database";
import { changeTheme } from "../utils/general";
import Virsustotal from "../components/virustotal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import virustotalImage from "../assets/virustotal.svg";

export const App = () => {
  const [url, setUrl] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [virustotal, setVirustotal] = useState(false);
  const [theme, setTheme] = useState(null);
  const [startScan, setStartScan] = useState(false);
  useEffect(() => {
    getPreference((data) => {
      if (data !== undefined) setVirustotal(data);
    }, "virustotal");

    getURL((url: string) => setUrl(url));
  }, []);
  // handle theme change
  const handleTheme = () => {
    getPreference((data) => {
      if (theme !== data) {
        setTheme(data);
      }
    }, "theme");
  };
  useEffect(() => {
    handleTheme();
    const intervalId = setInterval(() => {
      handleTheme();
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (theme !== null) {
      changeTheme(theme);
    }
  }, [theme]);

  const addNotification = (message: string) => {
    // add only if the message is not empty and not already in the list
    if (message !== undefined && !notifications.includes(message)) {
      setNotifications((prevNotifications) => [message, ...prevNotifications]);
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from("section", { opacity: 0, y: 50, duration: 0.5 });
  }, []);

  return (
    <>
      <Navbar url={url} />
      <main
        className={
          "bg-white dark:bg-Charcoal h-calc-vh-2 py-10 flex flex-col gap-10 max-md:gap-0 max-md:pt-0 transition-colors duration-150"
        }
      >
        <Action url={url} addNotification={addNotification} />
        {virustotal &&
          (startScan ? (
            <Virsustotal url={url} addNotification={addNotification} />
          ) : (
            <div
              className={
                "mx-8 min-h-48 overflow-hidden max-md:min-h-64 flex max-md:m-0 max-md:rounded-none rounded-3xl shadow-2xl shadow-black bg-Charcoal dark:bg-Gainsboro"
              }
            >
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
                className={"h-full"}
                alt="virustotal Image"
              />
            </div>
          ))}
        <Notification
          message={notifications[0]}
          numMessages={notifications.length - 1}
          clearMessage={() => {
            setNotifications(notifications.slice(1));
          }}
        />
      </main>
    </>
  );
};
