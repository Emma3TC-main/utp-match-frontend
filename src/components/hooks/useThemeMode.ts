import { useState } from "react";

const THEME_STORAGE_KEY = "utp-match-theme";

export function useThemeMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === "dark";
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextState = !prev;
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        nextState ? "dark" : "light",
      );
      window.dispatchEvent(new Event("utp-theme-toggle"));
      return nextState;
    });
  };

  return { isDarkMode, toggleTheme };
}
