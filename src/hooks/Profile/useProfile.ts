import { useMemo } from "react";
import { useAuthContext } from "@src/contexts/auth";
import { lightTheme, darkTheme } from "@src/hooks/dark&lightthemes";

export const useProfile = (isDark: boolean) => {
  const { user, logout } = useAuthContext();

  const theme = useMemo(() => {
    return isDark ? darkTheme : lightTheme;
  }, [isDark]);

  return {
    user,
    theme,
    logout,
  };
};
