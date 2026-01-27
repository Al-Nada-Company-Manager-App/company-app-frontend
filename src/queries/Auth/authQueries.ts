import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./authApi";
import type {
  LoginRequest,
  ChangePasswordRequest,
  RegisterRequest,
} from "./authApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";

// Query keys for auth
export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
};

// Get current session
export const useGetSession = () => {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: authApi.getSession,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
};

// Login mutation
export const useLogin = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate session to refetch user data
        queryClient.invalidateQueries({ queryKey: authKeys.session() });
        showSuccessMessage("Login successful! Welcome back.", "👋");
      } else {
        showErrorMessage(response.message || "Login failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      showErrorMessage("Network error. Please try again.");
    },
  });
};

// Logout mutation
export const useLogout = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: (response) => {
      if (response.success) {
        // Clear all cached data on logout
        queryClient.clear();
        showSuccessMessage("Logged out successfully.", "👋");
      }
    },
    onError: (error) => {
      console.error("Logout error:", error);
      showErrorMessage("Failed to logout. Please try again.");
    },
  });
};

// Change password mutation
export const useChangePassword = (isDark: boolean = false) => {
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
    onSuccess: (response) => {
      if (response.success) {
        showSuccessMessage(
          response.message || "Password changed successfully!",
          "🔐",
        );
      } else {
        showErrorMessage(response.message || "Failed to change password.");
      }
    },
    onError: (error) => {
      console.error("Change password error:", error);
      showErrorMessage("Network error. Please try again.");
    },
  });
};

// Register mutation
export const useRegister = (isDark: boolean = false) => {
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      if (response.success) {
        showSuccessMessage(
          "Account created successfully! Please wait for activation.",
          "✅",
        );
      } else {
        showErrorMessage(response.message || "Registration failed.");
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
      showErrorMessage("Network error. Please try again.");
    },
  });
};
