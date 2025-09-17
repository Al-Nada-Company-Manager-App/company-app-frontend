// React Query hooks for debts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { debtApi } from "./debtApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";
import type { Debt } from "@src/types/Debts/debt";

export const debtKeys = {
  all: ["debts"] as const,
  lists: () => [...debtKeys.all, "list"] as const,
  list: (filters: string) => [...debtKeys.lists(), { filters }] as const,
  details: () => [...debtKeys.all, "detail"] as const,
  detail: (id: number) => [...debtKeys.details(), id] as const,
};

// Get all debts
export const useGetAllDebts = () => {
  return useQuery({
    queryKey: debtKeys.lists(),
    queryFn: debtApi.getAllDebts,
  });
};

// Update debt mutation
export const useUpdateDebt = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: ({ id, debtData }: { id: number; debtData: Partial<Debt> }) =>
      debtApi.updateDebt(id, debtData),
    onSuccess: () => {
      // Invalidate and refetch debts list
      queryClient.invalidateQueries({ queryKey: debtKeys.lists() });

      showSuccessMessage("Debt updated successfully!", "✅");
    },
    onError: (error) => {
      console.error("Error updating debt:", error);
      showErrorMessage("Failed to update debt", "❌");
    },
  });
};

// Delete debt mutation
export const useDeleteDebt = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: (id: number) => debtApi.deleteDebt(id),
    onSuccess: () => {
      // Invalidate and refetch debts list
      queryClient.invalidateQueries({ queryKey: debtKeys.lists() });

      showSuccessMessage("Debt deleted successfully!", "✅");
    },
    onError: (error) => {
      console.error("Error deleting debt:", error);
      showErrorMessage("Failed to delete debt", "❌");
    },
  });
};

// Delete customer mutation
