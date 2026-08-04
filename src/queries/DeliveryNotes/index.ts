import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@src/utils/apiClient";

export const useGetAllDeliveries = (params: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: ["deliveries", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set("page", String(params.page));
      if (params.limit) searchParams.set("limit", String(params.limit));
      if (params.search) searchParams.set("search", params.search);
      
      const queryStr = searchParams.toString();
      const url = `/deliveries${queryStr ? `?${queryStr}` : ""}`;
      const res = await fetchWithAuth(url);
      return await res.json();
    },
  });
};

export const useGetDeliveryById = (id: number | null) => {
  return useQuery({
    queryKey: ["deliveries", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetchWithAuth(`/deliveries/${id}`);
      const data = await res.json();
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateDelivery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (deliveryData: any) => {
      const res = await fetchWithAuth("/deliveries", {
        method: "POST",
        body: JSON.stringify(deliveryData),
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
    },
  });
};

export const useUpdateDelivery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await fetchWithAuth(`/deliveries/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
    },
  });
};

export const useDeleteDelivery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetchWithAuth(`/deliveries/${id}`, {
        method: "DELETE",
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
    },
  });
};
