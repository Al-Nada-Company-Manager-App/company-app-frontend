import { useMemo } from "react";
import { useThemeContext } from "@src/contexts/theme";
import { lightTheme, darkTheme } from "@src/hooks/dark&lightthemes";
import {
  useGetSession,
  useLogin,
  useLogout,
  useChangePassword,
  useRegister,
} from "@src/queries/Auth";

export const useAuth = () => {
  const { isDark } = useThemeContext();

  const theme = useMemo(() => {
    return isDark ? darkTheme : lightTheme;
  }, [isDark]);

  // React Query hooks
  const sessionQuery = useGetSession();
  const loginMutation = useLogin(isDark);
  const logoutMutation = useLogout(isDark);
  const changePasswordMutation = useChangePassword(isDark);
  const registerMutation = useRegister(isDark);

  return {
    // Theme
    theme,
    isDark,

    // Session
    session: sessionQuery.data,
    isSessionLoading: sessionQuery.isLoading,
    isAuthenticated: sessionQuery.data?.success && !!sessionQuery.data?.user,
    user: sessionQuery.data?.user ?? null,
    refetchSession: sessionQuery.refetch,

    // Login
    login: loginMutation.mutateAsync,
    isLoginLoading: loginMutation.isPending,
    loginError: loginMutation.error,

    // Logout
    logout: logoutMutation.mutateAsync,
    isLogoutLoading: logoutMutation.isPending,

    // Change Password
    changePassword: changePasswordMutation.mutateAsync,
    isChangePasswordLoading: changePasswordMutation.isPending,

    // Register
    register: registerMutation.mutateAsync,
    isRegisterLoading: registerMutation.isPending,

    // Combined loading state
    isLoading:
      loginMutation.isPending ||
      logoutMutation.isPending ||
      changePasswordMutation.isPending ||
      registerMutation.isPending,
  };
};
