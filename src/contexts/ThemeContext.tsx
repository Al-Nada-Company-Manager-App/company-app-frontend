import type { ReactNode } from "react";
import { useTheme } from "@src/hooks/useTheme";
import { ThemeContext } from "./ThemeContextObject";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeData = useTheme();
  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
};
