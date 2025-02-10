import { createContext, useContext } from "react";

export type Theme = "light" | "dark" | "system";

export const ThemeContext = createContext<{
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}>({
  theme: "system",
  changeTheme: () => {
    console.warn(
      "ThemeContext: changeTheme was called outside of ThemeProvider"
    );
  },
});

export const useTheme = () => useContext(ThemeContext);
