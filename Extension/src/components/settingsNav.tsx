import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const SettingsNav = () => {
  // this block of code is responsible for the sidebar navigation opening and closing
  const handleNav = (state: boolean) => {
    const sidebar = document.getElementById("cta-button-sidebar");
    if (state) {
      sidebar?.classList.add("-translate-x-full");
    } else {
      sidebar?.classList.remove("-translate-x-full");
    }
  };
  const navListener = () => {
    document.addEventListener("click", (e: Event) => {
      const target = e.target as Element;
      // if the clicked element is not the nav
      if (!target?.closest("#settings-navbar")) {
        handleNav(true);
      }
    });
  };
  useEffect(() => {
    navListener();
    // cleanup
    return () => {
      navListener();
    };
  });
  return (
    <nav id="settings-navbar" className={"fixed top-0 z-50"}>
      <button
        data-drawer-target="cta-button-sidebar"
        data-drawer-toggle="cta-button-sidebar"
        aria-controls="cta-button-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => handleNav(false)}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="cta-button-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="index.html#settings/general"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faGears}
                  className="text-lg text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="ms-3">General</span>
              </a>
            </li>
            <li>
              <a
                href="index.html#settings/databases"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faDatabase}
                  className="text-lg text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className="ms-3">DataBases</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </nav>
  );
};

export default SettingsNav;
