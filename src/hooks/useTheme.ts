import { useState, useEffect, useMemo } from "react";
import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  const currentTheme = useMemo(
    () => (isDark ? darkTheme : lightTheme),
    [isDark],
  );

  const applyThemeToDocument = (dark: boolean) => {
    document.documentElement.classList.toggle("dark", dark);
  };

  const getInitialTheme = (): boolean => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return false; // Force light mode as default
  };

  useEffect(() => {
    const shouldDark = getInitialTheme();
    setIsDark(shouldDark);
    applyThemeToDocument(shouldDark);
  }, []);

  useEffect(() => {
    // OS theme change listener removed to prevent overriding explicit user preference
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    applyThemeToDocument(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return {
    isDark,
    theme: currentTheme,
    toggleTheme,
  };
};
