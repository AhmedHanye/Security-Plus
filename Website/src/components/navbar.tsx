import { useState, useEffect } from "react";
import { changeTheme, getThemeLocal, setThemeLocal } from "../utils/general";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/Security.png";

const Navbar = ({ currentPage }: { currentPage: number }) => {
  const [theme, setTheme] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    setTheme(getThemeLocal());
  }, []);
  useEffect(() => {
    changeTheme(theme);
    setThemeLocal(theme);
  }, [theme]);
  const Pages: any = {
    0: ["Home", "#"],
    1: ["Documentation", "#documentation"],
    2: ["About", "#about"],
  };
  return (
    <nav className="bg-gray-800 fixed top-0 z-50 w-screen">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <a className="flex flex-shrink-0 items-center" href="">
              <img className="h-8 w-auto transform transition-all duration-100 hover:scale-105 will-change-contents " src={logo} alt="Your Company" />
            </a>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 font-medium text-sm">
                {Object.keys(Pages).map((key) => {
                  return (
                    <a
                      key={key}
                      href={Pages[key][1]}
                      className={`${
                        currentPage === parseInt(key)
                          ? "bg-gray-900 text-white"
                          : "text-gray-300"
                      } rounded-md px-3 py-2 hover:bg-gray-700 hover:text-white`}
                    >
                      {Pages[key][0]}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Theme switcher */}
          <div>
            <button
              onClick={() => setTheme(!theme)}
              className={`${
                theme ? "text-white" : "text-yellow-300"
              } text-xl pe-2 hover:brightness-90 hover:scale-105`}
              title={`${theme ? "Light" : "Dark"}`}
            >
              {theme ? (
                <FontAwesomeIcon icon={faMoon} />
              ) : (
                <FontAwesomeIcon icon={faSun} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {Object.keys(Pages).map((key) => {
              return (
                <a
                  key={key}
                  href={Pages[key][1]}
                  className={`${
                    currentPage === parseInt(key)
                      ? "bg-gray-900 text-white"
                      : "text-gray-300"
                  } block rounded-md px-3 py-2 hover:bg-gray-700 hover:text-white`}
                >
                  {Pages[key][0]}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
