import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { visitApi } from "./visitApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";

export const visitKeys = {
  all: ["visits"] as const,
  byCustomer: (c_id: number) => ["visits", "customer", c_id] as const,
  settings: () => ["visits", "settings"] as const,
};

export const useGetCustomerVisits = (c_id: number | null) => {
  return useQuery({
    queryKey: visitKeys.byCustomer(c_id ?? 0),
    queryFn: () => visitApi.getCustomerVisits(c_id!),
    enabled: !!c_id && c_id > 0,
  });
};

export const useLogVisit = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: ({ c_id, notes }: { c_id: number; notes?: string }) =>
      visitApi.logVisit(c_id, notes),
    onSuccess: (_data, { c_id }) => {
      queryClient.invalidateQueries({ queryKey: visitKeys.byCustomer(c_id) });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => {
      console.error("Error logging visit:", error);
      showErrorMessage("Failed to log visit.");
    },
  });
};

export const useGetVisitSettings = () => {
  return useQuery({
    queryKey: visitKeys.settings(),
    queryFn: visitApi.getSettings,
  });
};

export const useUpdateVisitSettings = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: (months: number) => visitApi.updateSettings(months),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: visitKeys.settings() });
      showSuccessMessage("Visit settings saved!", "✅");
    },
    onError: () => showErrorMessage("Failed to save visit settings."),
  });
};

export const useRunAutoReset = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: visitApi.runAutoReset,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: visitKeys.settings() });
      showSuccessMessage(data.message, "🔄");
    },
    onError: () => showErrorMessage("Failed to run auto-reset."),
  });
};

export const useUnvisitCustomer = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: (c_id: number) => visitApi.unvisitCustomer(c_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => showErrorMessage("Failed to unvisit customer."),
  });
};

export const useClearAllVisits = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: visitApi.clearAllVisits,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      showSuccessMessage("All visits cleared!", "🗑️");
    },
    onError: () => showErrorMessage("Failed to clear visits."),
  });
};
