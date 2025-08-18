import { useMemo } from "react";

import type { BreadcrumbTheme } from "../types/Breadcrumb/breadcrumb";

import type { UserMenuItem } from "../types/Breadcrumb/breadcrumb";

export const USER_MENU_ITEMS: UserMenuItem[] = [
  { id: "profile", label: "Sign In", icon: "User" },
  { id: "settings", label: "Settings", icon: "Settings" },
  { id: "notifications", label: "Notifications", icon: "Bell" },
  { id: "theme", label: "Toggle Theme", icon: "Moon" },
];

export const lightBreadcrumbTheme: BreadcrumbTheme = {
  container: {
    background: "transparent",
    textColor: "#2D3748",
  },
  searchInput: {
    background: "#FFFFFF",
    borderColor: "rgba(226, 232, 240, 0.3)",
    textColor: "#2D3748",
    placeholderColor: "#A0AEC0",
    iconColor: "#718096",
  },
  userMenu: {
    textColor: "#718096",
    iconColor: "#718096",
  },
  title: {
    color: "#2D3748",
  },
  breadcrumbText: {
    color: "#A0AEC0",
  },
};

export const darkBreadcrumbTheme: BreadcrumbTheme = {
  container: {
    background: "transparent",
    textColor: "#FFFFFF",
  },
  searchInput: {
    background: "#0F1535",
    borderColor: "rgba(226, 232, 240, 0.3)",
    textColor: "#FFFFFF",
    placeholderColor: "#A0AEC0",
    iconColor: "#FFFFFF",
  },
  userMenu: {
    textColor: "#FFFFFF",
    iconColor: "#FFFFFF",
  },
  title: {
    color: "#FFFFFF",
  },
  breadcrumbText: {
    color: "#A0AEC0",
  },
};


export const useBreadcrumb = (isDark: boolean) => {
  const theme = useMemo(
    () => (isDark ? darkBreadcrumbTheme : lightBreadcrumbTheme),
    [isDark]
  );

  return {
    theme,
    userMenuItems: USER_MENU_ITEMS,
  };
};
