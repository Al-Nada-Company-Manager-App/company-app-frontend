// React Query hooks for suppliers
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supplierApi } from "./supplierApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";
import type { Supplier } from "@src/types/Suppliers/supplier";

export const supplierKeys = {
  all: ["suppliers"] as const,
  lists: () => [...supplierKeys.all, "list"] as const,
  list: (filters: string) => [...supplierKeys.lists(), { filters }] as const,
  details: () => [...supplierKeys.all, "detail"] as const,
  detail: (id: number) => [...supplierKeys.details(), id] as const,
};

// Get all suppliers
export const useGetAllSuppliers = () => {
  return useQuery({
    queryKey: supplierKeys.lists(),
    queryFn: supplierApi.getAllSuppliers,
  });
};

export const useGetAllCompanies = () => {
  return useQuery({
    queryKey: [...supplierKeys.all, "companies"],
    queryFn: supplierApi.getAllCompanies,
  });
};

//Get supplier Sales by ID
export const useGetSupplierPurchases = (id: number) => {
  return useQuery({
    queryKey: supplierKeys.detail(id),
    queryFn: () => supplierApi.getSupplierPurchases(id),
    enabled: !!id, // Only run if id is provided
  });
};

// Create supplier mutation
export const useCreateSupplier = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: supplierApi.addSupplier,
    onSuccess: (newSupplier) => {
      // Invalidate and refetch suppliers list
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() });

      showSuccessMessage(
        `supplier ${newSupplier.s_name || ""} created successfully!`,
        "✅",
      );
    },
    onError: (error) => {
      console.error("Error creating supplier:", error);
      showErrorMessage("Failed to create supplier", "❌");
    },
  });
};

// Update supplier mutation
export const useUpdateSupplier = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: ({
      id,
      supplierData,
    }: {
      id: number;
      supplierData: Partial<Supplier>;
    }) => supplierApi.updateSupplier(id, supplierData),
    onSuccess: (updatedSupplier) => {
      // Invalidate and refetch suppliers list
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() });

      showSuccessMessage(
        `Supplier ${updatedSupplier.s_name || ""} updated successfully!`,
        "✅",
      );
    },
    onError: (error) => {
      console.error("Error updating supplier:", error);
      showErrorMessage("Failed to update supplier", "❌");
    },
  });
};

// Update supplier photo mutation
export const useUpdateSupplierPhoto = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: ({ s_id, photo }: { s_id: number; photo: File }) =>
      supplierApi.updateSupplierPhoto(s_id, photo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() });
      showSuccessMessage("Supplier photo updated successfully!", "✅");
    },
    onError: (error) => {
      console.error("Error updating supplier photo:", error);
      showErrorMessage("Failed to update supplier photo", "❌");
    },
  });
};

// Delete supplier mutation
export const useDeleteSupplier = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: supplierApi.deleteSupplier,
    onSuccess: (id) => {
      // Invalidate and refetch suppliers list
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() });

      showSuccessMessage(`Supplier with ID ${id} deleted successfully!`, "✅");
    },
    onError: (error) => {
      console.error("Error deleting supplier:", error);
      showErrorMessage("Failed to delete supplier", "❌");
    },
  });
};
