import { useMemo } from "react";

import type { BreadcrumbTheme } from "../../types/Breadcrumb/breadcrumb";

import type { UserMenuItem } from "../../types/Breadcrumb/breadcrumb";

export const USER_MENU_ITEMS: UserMenuItem[] = [
  {
    id: "profile",
    label: "John Doe",
    icon: "User",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
    isProfile: true,
  },
  { id: "settings", label: "Settings", icon: "Settings" },
  { id: "notifications", label: "Notifications", icon: "Bell" },
  { id: "theme", label: "Toggle Theme", icon: "Moon" },
];

const lightBreadcrumbTheme: BreadcrumbTheme = {
  container: {
    background: "#EFF0FB",
    textColor: "#090B1B",
  },
  searchInput: {
    background: "#EFF0FB",
    borderColor: "#6C79EF",
    textColor: "#090B1B",
    placeholderColor: "#6C79EF",
    iconColor: "#17217D",
  },
  userMenu: {
    textColor: "#17217D",
    iconColor: "#6C79EF",
  },
  userProfile: {
    nameColor: "#090B1B",
    imageBorder: "#6C79EF",
    containerBackground: "rgba(108, 121, 239, 0.1)",
    containerBorder: "#6C79EF",
  },
  title: {
    color: "#090B1B",
  },
  breadcrumbText: {
    color: "#6C79EF",
  },
};

const darkBreadcrumbTheme: BreadcrumbTheme = {
  container: {
    background: "#040510",
    textColor: "#E4E6F6",
  },
  searchInput: {
    background: "#040510",
    borderColor: "#828CE8",
    textColor: "#E4E6F6",
    placeholderColor: "#828CE8",
    iconColor: "#828CE8",
  },
  userMenu: {
    textColor: "#828CE8",
    iconColor: "#828CE8",
  },
  userProfile: {
    nameColor: "#E4E6F6",
    imageBorder: "#828CE8",
    containerBackground: "rgba(130, 140, 232, 0.1)",
    containerBorder: "#828CE8",
  },
  title: {
    color: "#E4E6F6",
  },
  breadcrumbText: {
    color: "#828CE8",
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
