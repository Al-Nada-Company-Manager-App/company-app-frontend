import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@src/utils/apiClient";

export const useGetAllReceipts = (params: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: ["receipts", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set("page", String(params.page));
      if (params.limit) searchParams.set("limit", String(params.limit));
      if (params.search) searchParams.set("search", params.search);
      
      const queryStr = searchParams.toString();
      const url = `/receipts${queryStr ? `?${queryStr}` : ""}`;
      const res = await fetchWithAuth(url);
      return await res.json();
    },
  });
};

export const useGetReceiptById = (id: number | null) => {
  return useQuery({
    queryKey: ["receipts", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetchWithAuth(`/receipts/${id}`);
      const data = await res.json();
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (receiptData: any) => {
      const res = await fetchWithAuth("/receipts", {
        method: "POST",
        body: JSON.stringify(receiptData),
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
    },
  });
};

export const useUpdateReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await fetchWithAuth(`/receipts/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
    },
  });
};

export const useDeleteReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetchWithAuth(`/receipts/${id}`, {
        method: "DELETE",
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
    },
  });
};
