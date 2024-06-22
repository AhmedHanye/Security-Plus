import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";

const Navbar = ({ url }: { url: string }) => {
  const [clicked, setClecked] = useState(false);
  return (
    <nav className={"bg-red-600 flex h-10 flex-row text-white"}>
      <div className={"relative group w-fit"}>
        <button
          id="refresh"
          className={"px-4 h-full bg-navy-blue group"}
          name={"refresh"}
          aria-label={"refresh"}
        >
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className={
              "group-hover:scale-110 group-hover:rotate-180 transition-all duration-250 will-change-contents text-xl"
            }
            onClick={() => (window.location.href = url)}
          />
        </button>
        <span
          className={
            "absolute p-1 rounded text-xs left-1/2 -translate-x-1/2 -bottom-7 bg-black font-semibold hidden group-hover:block dark:bg-white dark:text-black"
          }
        >
          refresh
        </span>
      </div>
      <div
        id="url"
        className={`w-full h-full px-4 font-semibold text-xl bg-gunmetal flex items-center text-nowrap text-ellipsis overflow-x-scroll hide-scrollbar overflow-y-hidden ${
          clicked ? "shadow-dual-neumorphic" : ""
        }`}
        onClick={() => setClecked(true)}
        onBlur={() => setClecked(false)}
        tabIndex={0} // This is required to make the div focusable if you remove it the div will not be focusable
      >
        <p>{url || ""}</p>
      </div>
      <div className={"relative group w-fit"}>
        <button
          id="copyUrl"
          className={"px-4 h-full bg-navy-blue group relative"}
          onClick={() => {
            navigator.clipboard.writeText(url);
          }}
          name={"copy url"}
          aria-label={"copy url"}
        >
          <FontAwesomeIcon
            icon={faCopy}
            className={
              "group-hover:scale-110 transition-all duration-250 will-change-contents text-xl"
            }
          />
        </button>
        <span
          className={
            "absolute p-1 rounded text-xs left-1/2 -translate-x-1/2 -bottom-7 bg-black font-semibold hidden group-hover:block dark:bg-white dark:text-black"
          }
        >
          copy
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
