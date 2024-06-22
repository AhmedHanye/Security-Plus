import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import { getPreference } from "../utils/database";
import { changeTheme } from "../utils/general";

const Block = () => {
  const [theme, setTheme] = useState(false);
  const intervalRef: any = useRef();
  const themeRef = useRef(theme);
  const handleGetTheme = () => {
    getPreference((data) => {
      if (themeRef.current !== data) setTheme(data);
    }, "theme");
  };
  useEffect(() => {
    handleGetTheme();

    intervalRef.current = setInterval(() => {
      handleGetTheme();
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  // handle theme change
  useEffect(() => {
    changeTheme(theme);
    themeRef.current = theme;
  }, [theme]);
  return (
    <main
      className={
        "h-screen w-screen flex flex-col justify-center relative bg-blocked bg-no-repeat bg-center bg-white text-black dark:bg-Charcoal dark:text-white"
      }
    >
      <div className={"absolute top-5 right-8 text-3xl max-md:text-2xl group"}>
        <button>
          <FontAwesomeIcon
            icon={faGear}
            className={
              "group-hover:rotate-180 group-hover:scale-105 transition-all duration-250 will-change-contents"
            }
            onClick={() => {
              window.location.href = "#settings/general";
            }}
          />
        </button>
        <span
          className={
            "absolute p-1 text-white bg-black dark:bg-white dark:text-black rounded text-xs left-1/2 -translate-x-1/2 -bottom-7 font-semibold hidden group-hover:block"
          }
        >
          settings
        </span>
      </div>
      <div className={"absolute top-5 left-8 text-3xl max-md:text-2xl group"}>
        <button>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className={
              "group-hover:scale-105 transition-all duration-250 will-change-contents"
            }
            onClick={() => {
              window.location.href = "";
            }}
          />
        </button>
        <span
          className={
            "absolute p-1 text-nowrap text-white bg-black dark:bg-white dark:text-black rounded text-xs left-1/2 -translate-x-1/2 -bottom-7 font-semibold hidden group-hover:block"
          }
        >
          change status
        </span>
      </div>
      <h1
        className={
          "flex items-center gap-5 max-md:gap-2 absolute top-5 left-1/2 transform -translate-x-1/2"
        }
      >
        <FontAwesomeIcon
          icon={faLock}
          className="text-6xl max-lg:text-5xl max-md:text-xl text-red-500"
        />
        <span className={"text-4xl max-lg:text-4xl max-md:text-2xl max-sm:text-lg max-md:pt-1"}>
          This Site is Blocked!
        </span>
      </h1>
    </main>
  );
};

export default Block;
