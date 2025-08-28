// React Query hooks for sales
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { salesApi } from "./salesApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";
import type { Sales } from "@src/types/Sales/sales";

export const salesKeys = {
  all: ["sales"] as const,
  lists: () => [...salesKeys.all, "list"] as const,
  list: (filters: string) => [...salesKeys.lists(), { filters }] as const,
  details: () => [...salesKeys.all, "detail"] as const,
  detail: (id: number) => [...salesKeys.details(), id] as const,
};

// Get all sales
export const useGetAllSales = () => {
  return useQuery({
    queryKey: salesKeys.lists(),
    queryFn: salesApi.getAllSales
  });
};

//Get Products in Sales by ID
export const useGetSalesProducts = (id: number, saleType: string) => {
  return useQuery({
    queryKey: [...salesKeys.detail(id), saleType],
    queryFn: () => salesApi.getSalesProducts(id, saleType),
    enabled: !!id && !!saleType,
  });
};

// Create sale mutation
export const useCreateSale = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: salesApi.addSale,
    onSuccess: (newSale) => {
      // Invalidate and refetch sales list
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });

      showSuccessMessage(
        `The Sale Process for Bill Number ${newSale.sl_billnum} created successfully!`,
        "✅"
      );
    },
    onError: (error) => {
      console.error("Error creating Sale:", error);
      showErrorMessage("Failed to create Sale", "❌");
    },
  });
};

// Update sale mutation
export const useUpdateSale = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: ({
      id,
      saleData,
    }: {
      id: number;
      saleData: Partial<Sales>;
    }) => salesApi.updateSale(id, saleData),
    onSuccess: (updatedSale) => {
      // Invalidate and refetch sales list
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });

      showSuccessMessage(
        `Sale with Bill Number ${updatedSale.sl_billnum} updated successfully!`,
        "✅"
      );
    },
    onError: (error) => {
      console.error("Error updating Sale:", error);
      showErrorMessage("Failed to update Sale", "❌");
    },
  });
};

// Delete sale mutation
export const useDeleteSale = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: salesApi.deleteSale,
    onSuccess: () => {
      // Invalidate and refetch sales list
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });

      showSuccessMessage(`Sale deleted successfully!`, "✅");
    },
    onError: (error) => {
      console.error("Error deleting Sale:", error);
      showErrorMessage("Failed to delete Sale", "❌");
    },
  });
};
