import Navbar from "../components/navbar";
import Action from "../components/action";
import Notification from "../components/notification";

import { useState, useEffect } from "react";
import { getPreference, getURL } from "../utils/database";
import { changeTheme } from "../utils/general";
import Virsustotal from "../components/virustotal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const App = () => {
  const [url, setUrl] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [virustotal, setVirustotal] = useState(false);
  const handleUpdates = () => {
    setVirustotal(getPreference("virustotal") == "true");
    changeTheme();
  };
  useEffect(() => {
    handleUpdates();
    getURL((url: string) => {
      setUrl(url);
    });
    const interval = setInterval(() => {
      handleUpdates();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const addNotification = (message: string) => {
    // add only if the message is not empty and not already in the list
    if (message !== undefined && !notifications.includes(message)) {
      setNotifications((prevNotifications) => [message, ...prevNotifications]);
    }
  };

  useGSAP(() => {
    gsap.from("section", {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.5,
      ease: "ease-in-out",
    });
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
        <Virsustotal url={url} addNotification={addNotification} virustotal={virustotal} />
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
