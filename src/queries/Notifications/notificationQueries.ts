import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "./notificationApi";

export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  list: (filters: string) => [...notificationKeys.lists(), { filters }] as const,
  details: () => [...notificationKeys.all, "detail"] as const,
  detail: (id: number) => [...notificationKeys.details(), id] as const,
};

//Get all notifications
export const useGetAllNotifications = (filters: string = "") => {
  return useQuery({
    queryKey: notificationKeys.list(filters),
    queryFn: () => notificationApi.getAllNotifications(),
  });
}

// Create notification mutation
export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationApi.createNotification,
    onSuccess: () => {
      // Invalidate and refetch notifications list
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
    onError: (error) => {
      console.error("Error creating notification:", error);
    },
  });
}

// Delete notification mutation
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => notificationApi.deleteNotification(id),
    onSuccess: (_, deletedId) => {
      // Remove the notification from the cache
      queryClient.removeQueries({ queryKey: notificationKeys.detail(deletedId) });
      // Invalidate the notifications list to refresh it
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
    onError: (error) => {
      console.error("Error deleting notification:", error);
    },
  });
}
