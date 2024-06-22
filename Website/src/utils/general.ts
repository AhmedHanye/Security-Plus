export const changeTheme = (theme: boolean): void => {
  const currentTheme = document
    .querySelector("html")
    ?.classList.contains("dark");
  if (currentTheme !== theme) {
    if (theme) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }
};

export const getThemeLocal = (): boolean => {
  return localStorage.getItem("theme") == "true";
};

export const setThemeLocal = (theme: boolean): void => {
  // set theme in local storage
  localStorage.setItem("theme", theme.toString());
};
