import { createContext } from "react";

import type { ThemeConfig } from "@src/types/theme";
export interface ThemeContextType {
  isDark: boolean;
  theme: ThemeConfig;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
