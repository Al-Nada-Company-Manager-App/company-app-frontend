// React Query hooks for purchases
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { purchasesApi } from "./purchasesApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";
import type { Purchases } from "@src/types/Purchases/purchases";

export const purchasesKeys = {
  all: ["purchases"] as const,
  lists: () => [...purchasesKeys.all, "list"] as const,
  list: (filters: string) => [...purchasesKeys.lists(), { filters }] as const,
  details: () => [...purchasesKeys.all, "detail"] as const,
  detail: (id: number) => [...purchasesKeys.details(), id] as const,
};

// Get all purchases
export const useGetAllPurchases = () => {
  return useQuery({
    queryKey: purchasesKeys.lists(),
    queryFn: purchasesApi.getAllPurchases,
  });
};

//Get Products in Purchases by ID
export const useGetPurchasesProducts = (id: number) => {
  return useQuery({
    queryKey: purchasesKeys.detail(id),
    queryFn: () => purchasesApi.getPurchasesProducts(id),
    enabled: !!id,
  });
};

// Create purchase mutation
export const useCreatePurchase = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: purchasesApi.addPurchase,
    onSuccess: (newPurchase) => {
      // Invalidate and refetch purchases list
      queryClient.invalidateQueries({ queryKey: purchasesKeys.lists() });

      showSuccessMessage(
        `The Purchase Process for Bill Number ${newPurchase.pch_billnum} created successfully!`,
        "✅"
      );
    },
    onError: (error) => {
      console.error("Error creating Purchase:", error);
      showErrorMessage("Failed to create Purchase", "❌");
    },
  });
};

// Update purchase mutation
export const useUpdatePurchase = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: ({
      id,
      purchaseData,
    }: {
      id: number;
      purchaseData: Partial<Purchases>;
    }) => purchasesApi.updatePurchase(id, purchaseData),
    onSuccess: (updatedPurchase) => {
      // Invalidate and refetch purchases list
      queryClient.invalidateQueries({ queryKey: purchasesKeys.lists() });

      showSuccessMessage(
        `Purchase with Bill Number ${updatedPurchase.pch_billnum} updated successfully!`,
        "✅"
      );
    },
    onError: (error) => {
      console.error("Error updating Purchase:", error);
      showErrorMessage("Failed to update Purchase", "❌");
    },
  });
};

// Delete purchase mutation
export const useDeletePurchase = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: purchasesApi.deletePurchase,
    onSuccess: () => {
      // Invalidate and refetch purchases list
      queryClient.invalidateQueries({ queryKey: purchasesKeys.lists() });

      showSuccessMessage(`Purchase deleted successfully!`, "✅");
    },
    onError: (error) => {
      console.error("Error deleting Purchase:", error);
      showErrorMessage("Failed to delete Purchase", "❌");
    },
  });
};
