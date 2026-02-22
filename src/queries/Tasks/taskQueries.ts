import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "./taskApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";

export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => [...taskKeys.all, "list"] as const,
};

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: taskKeys.lists(),
    queryFn: taskApi.getAllTasks,
  });
};

export const useCreateTask = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: (_newTask) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      showSuccessMessage("Task created successfully!", "✅");
    },
    onError: (error) => {
      console.error("Error creating task:", error);
      showErrorMessage("Failed to create task.");
    },
  });
};

export const useUpdateTask = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: taskApi.updateTask,
    onSuccess: (_updatedTask) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      showSuccessMessage("Task updated successfully!", "✅");
    },
    onError: (error) => {
      console.error("Error updating task:", error);
      showErrorMessage("Failed to update task.");
    },
  });
};

export const useUpdateTaskStatus = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: taskApi.updateTaskStatus,
    onSuccess: (_updatedTask) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      // Optional: show less intrusive message for status updates
      // showSuccessMessage("Task status updated!", "✅");
    },
    onError: (error) => {
      console.error("Error updating task status:", error);
      showErrorMessage("Failed to update task status.");
    },
  });
};

export const useDeleteTask = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      showSuccessMessage("Task deleted successfully!", "🗑️");
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
      showErrorMessage("Failed to delete task.");
    },
  });
};
