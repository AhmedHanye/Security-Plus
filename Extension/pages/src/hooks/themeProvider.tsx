import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeContext } from "./themeContext";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>();
  const themeProviderRef = useRef<HTMLDivElement>(null);

  const getThemeFromLocalStorage = () =>
    (localStorage.getItem("theme") as Theme) ||
    localStorage.setItem("theme", "system") ||
    "system";

  const handleTheme = useCallback(() => {
    if (theme === "system" || !theme) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      themeProviderRef.current?.classList.toggle(
        "dark",
        systemTheme === "dark"
      );
      if (!theme) setTheme(getThemeFromLocalStorage()); // ! don't move this line so that the page doesn't flicker
    } else {
      themeProviderRef.current?.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  // * handle theme on mount , update in the same tab and system theme change
  useEffect(() => {
    handleTheme();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleTheme);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleTheme);
  }, [handleTheme, theme]);

  // * handle theme on another tap or window
  useEffect(() => {
    const handleThemeChangeOutside = (event: StorageEvent) => {
      if (event.key === "theme") {
        setTheme(getThemeFromLocalStorage());
      }
    };
    window.addEventListener("storage", handleThemeChangeOutside);
    return () =>
      window.removeEventListener("storage", handleThemeChangeOutside);
  }, []);

  return (
    <div ref={themeProviderRef}>
      {theme && (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
          {children}
        </ThemeContext.Provider>
      )}
    </div>
  );
};

export default ThemeProvider;
