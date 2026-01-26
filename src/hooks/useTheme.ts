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
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  useEffect(() => {
    const shouldDark = getInitialTheme();
    setIsDark(shouldDark);
    applyThemeToDocument(shouldDark);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
        applyThemeToDocument(e.matches);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
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
