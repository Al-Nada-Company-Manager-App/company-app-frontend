import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { quotationApi } from "./quotationApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";

export const quotationKeys = {
  all: ["quotations"] as const,
  lists: () => [...quotationKeys.all, "list"] as const,
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
