import { useState, useEffect, useMemo } from "react";

interface ThemeConfig {
  backgroundImage: string;
  containerBg: string;
  textColor: string;
  buttonStyles: {
    backgroundColor: string;
    color: string;
  };
  gradient1: string;
  gradient2: string;
}

const lightTheme: ThemeConfig = {
  backgroundImage: "/Images/homePage/lightModeBackground.jpg",
  containerBg: "#f5f7fa",
  textColor: "black",
  buttonStyles: { backgroundColor: "#e5e7eb", color: "black" },
  gradient1:
    "linear-gradient(159.02deg,rgba(255,255,255,0.7) 14.25%,rgba(245,245,245,0.55) 56.45%,rgba(230,230,230,0.4) 86.14%)",
  gradient2:
    "linear-gradient(180deg,rgba(250,250,250,0.6) 23.5%,rgba(255,255,255,0) 100%)",
};

const darkTheme: ThemeConfig = {
  backgroundImage: "/Images/homePage/darkModeBackground.jpg",
  containerBg: "#020515",
  textColor: "white",
  buttonStyles: { backgroundColor: "#374151", color: "white" },
  gradient1:
    "linear-gradient(159.02deg,rgba(15,18,59,0.7) 14.25%,rgba(9,13,46,0.55) 56.45%,rgba(2,5,21,0.4) 86.14%)",
  gradient2:
    "linear-gradient(180deg,rgba(6,11,38,0.6) 23.5%,rgba(15,18,59,0) 100%)",
};

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  const currentTheme = useMemo(
    () => (isDark ? darkTheme : lightTheme),
    [isDark]
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
