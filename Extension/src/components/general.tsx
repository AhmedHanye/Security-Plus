import { useState, useEffect } from "react";
import { setPreference, getPreference } from "../utils/database";
import { changeTheme } from "../utils/general";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const General = () => {
  const [preferences, setPreferences] = useState<any>({
    theme: "false",
    virustotal: "false",
    apikey: "",
  });
  const [apiControl, setApiControl] = useState(false);

  const handlePreference = (preference: string) => {
    const value = getPreference(preference);
    if (value !== undefined && value !== null && value !== "") {
      setPreferences((prev: any) => ({
        ...prev,
        [preference]: value,
      }));
    }
  };
  const handleUpdates = () => {
    handlePreference("theme");
    handlePreference("virustotal");
    handlePreference("apikey");
    changeTheme();
  };
  useEffect(() => {
    handleUpdates();
    const interval = setInterval(() => {
      handleUpdates();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useGSAP(()=>{
    gsap.from(".preference", {
      opacity: 0,
      x: -40,
      duration: 0.3,
      stagger: 0.2,
      ease:"ease-in-out"
    });
  },[])

  return (
    <section id="Preferences" className="flex flex-col gap-6 px-5 max-sm:px-1">
      <div className="flex items-center justify-between text-lg preference">
        <p className="font-semibold dark:text-white">Dark Mode</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.theme === "true"}
            className="sr-only peer"
            onChange={() => {
              setPreference(
                "theme",
                preferences.theme === "true" ? "false" : "true"
              );
              setPreferences((prev: any) => ({
                ...prev,
                theme: preferences.theme === "true" ? "false" : "true",
              }));
            }}
          />
          <div className="group peer will-change-contents ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-[3rem] h-[1.4rem] shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:text-[0.5rem] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-4 after:w-4 after:top-[0.2rem] after:left-[0.14rem] after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-7 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
        </label>
      </div>
      <div className="flex items-center justify-between text-lg preference">
        <p className="font-semibold dark:text-white">VirusTotal</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.virustotal === "true"}
            className="sr-only peer"
            onChange={() => {
              setPreference(
                "virustotal",
                preferences.virustotal === "true" ? "false" : "true"
              );
              setPreferences((prev: any) => ({
                ...prev,
                virustotal:
                  preferences.virustotal === "true" ? "false" : "true",
              }));
            }}
          />
          <div className="group peer will-change-contents ring-0 bg-rose-400 rounded-full outline-none duration-100 after:duration-300 w-[3rem] h-[1.4rem] shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:text-[0.5rem] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-4 after:w-4 after:top-[0.2rem] after:left-[0.14rem] after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-7 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
        </label>
      </div>
      <div className="flex items-center justify-between text-lg preference">
        <p className="font-semibold dark:text-white">VirusTotal API key</p>
        <div className="flex items-center gap-4">
          <button
            className="text-Charcoal dark:text-white transition-all duration-100 will-change-contents hover:scale-105"
            onClick={() => {
              setPreference("apikey", preferences.apikey);
              setApiControl(!apiControl);
            }}
            title={apiControl ? "Save" : "Edit"}
          >
            {apiControl ? (
              <FontAwesomeIcon icon={faFloppyDisk} />
            ) : (
              <FontAwesomeIcon icon={faPenToSquare} />
            )}
          </button>
          <input
            type="text"
            className="w-80 max-sm:w-40 h-full bg-gray-600 dark:bg-gray-100 text-white dark:text-Charcoal rounded-md py-1 text-sm font-semibold px-2"
            value={preferences.apikey}
            onChange={(e: any) => {
              setPreferences((prev: any) => ({
                ...prev,
                apikey: e?.target?.value,
              }));
            }}
            disabled={!apiControl}
          />
        </div>
      </div>
    </section>
  );
};

export default General;
