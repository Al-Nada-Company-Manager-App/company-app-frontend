import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { quotationApi } from "./quotationApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";

export const quotationKeys = {
  all: ["quotations"] as const,
  lists: () => [...quotationKeys.all, "list"] as const,
  detail: (id: number) => [...quotationKeys.all, "detail", id] as const,
};

// Get all quotations hook
export const useGetAllQuotations = () => {
  return useQuery({
    queryKey: quotationKeys.lists(),
    queryFn: quotationApi.getAllQuotations,
  });
};

// Create quotation mutation hook
export const useCreateQuotation = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: quotationApi.createQuotation,
    onSuccess: (data) => {
      // Invalidate and refetch quotations list
      queryClient.invalidateQueries({ queryKey: quotationKeys.lists() });

      showSuccessMessage(
        `Quotation ${data.refCode} created successfully!`,
        "✅",
      );
    },
    onError: (error: any) => {
      console.error("Error creating Quotation:", error);
      showErrorMessage(error.message || "Failed to create Quotation", "❌");
    },
  });
};

// Get single quotation hook
export const useGetQuotationById = (id: number | null) => {
  return useQuery({
    queryKey: quotationKeys.detail(id!),
    queryFn: () => quotationApi.getQuotationById(id!),
    enabled: !!id,
  });
};

// Update quotation mutation hook
export const useUpdateQuotation = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: quotationApi.updateQuotation,
    onSuccess: (data, variables) => {
      // Invalidate list and specific detail
      queryClient.invalidateQueries({ queryKey: quotationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: quotationKeys.detail(variables.id) });

      showSuccessMessage(
        `Quotation ${data.refCode} updated successfully!`,
        "✅",
      );
    },
    onError: (error: any) => {
      console.error("Error updating Quotation:", error);
      showErrorMessage(error.message || "Failed to update Quotation", "❌");
    },
  });
};
