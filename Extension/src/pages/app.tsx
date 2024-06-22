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
  const [virustotal, setVirustotal] = useState(true);
  const [theme, setTheme] = useState(null);
  
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
    tl.from("section", { opacity: 0, y: 50,stagger:0.2, duration: 0.5, ease: "power2.out"});
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
        {virustotal && (
          <Virsustotal url={url} addNotification={addNotification} />
        )}
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
