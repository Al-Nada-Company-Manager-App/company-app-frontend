import { useMemo } from "react";
import { useAuthContext } from "@src/contexts/auth";
import { getImageUrl } from "@src/config/api";

import type { BreadcrumbTheme } from "@src/types/Breadcrumb/breadcrumb";

import type { UserMenuItem } from "@src/types/Breadcrumb/breadcrumb";

const lightBreadcrumbTheme: BreadcrumbTheme = {
  container: {
    background: "transparent",
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
  notification: {
    iconColor: "#6C79EF",
    badgeBackground: "#ED1316",
    badgeTextColor: "#FFFFFF",
  },
};

const darkBreadcrumbTheme: BreadcrumbTheme = {
  container: {
    background: "transparent",
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
  notification: {
    iconColor: "#828CE8",
    badgeBackground: "#ED1316",
    badgeTextColor: "#FFFFFF",
  },
};

const lightBreadcrumbScrolledTheme: BreadcrumbTheme = {
  container: {
    background: "rgba(239, 240, 251, 0.8)",
    textColor: "#090B1B",
  },
  searchInput: {
    background: "rgba(239, 240, 251, 0.9)",
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
  notification: {
    iconColor: "#6C79EF",
    badgeBackground: "#ED1316",
    badgeTextColor: "#FFFFFF",
  },
};

const darkBreadcrumbScrolledTheme: BreadcrumbTheme = {
  container: {
    background: "rgba(4, 5, 16, 0.8)",
    textColor: "#E4E6F6",
  },
  searchInput: {
    background: "rgba(4, 5, 16, 0.9)",
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
  notification: {
    iconColor: "#828CE8",
    badgeBackground: "#ED1316",
    badgeTextColor: "#FFFFFF",
  },
};

export const useBreadcrumb = (isDark: boolean) => {
  const { user } = useAuthContext();

  const theme = useMemo(
    () => (isDark ? darkBreadcrumbTheme : lightBreadcrumbTheme),
    [isDark],
  );

  const scrolledTheme = useMemo(
    () => (isDark ? darkBreadcrumbScrolledTheme : lightBreadcrumbScrolledTheme),
    [isDark],
  );

  const userMenuItems: UserMenuItem[] = useMemo(
    () => [
      {
        id: "profile",
        label: user ? `${user.f_name} ${user.l_name}` : "John Doe",
        icon: "User",
        image: getImageUrl("employees", user?.e_photo),
        isProfile: true,
      },
      { id: "settings", label: "Settings", icon: "Settings" },
      { id: "notifications", label: "Notifications", icon: "Bell" },
      { id: "theme", label: "Toggle Theme", icon: "Moon" },
    ],
    [user],
  );

  return {
    theme,
    scrolledTheme,
    userMenuItems,
  };
};
