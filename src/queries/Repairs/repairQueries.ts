import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { repairApi } from "./repairApi";
import type { CreateRepairInput } from "@src/types/Repairs/repair";
import { useThemedMessage } from "@src/hooks/useThemedMessage";
import { productKeys } from "@src/queries/Products";
import { sparePartKeys } from "@src/queries/SpareParts";

export const repairKeys = {
  all: ["repairs"] as const,
  lists: () => [...repairKeys.all, "list"] as const,
  detail: (id: number) => [...repairKeys.all, "detail", id] as const,
};

// Get all repairs
export const useGetAllRepairs = () =>
  useQuery({
    queryKey: repairKeys.lists(),
    queryFn: repairApi.getAllRepairs,
  });

// Create repair
export const useCreateRepair = (isDark = false) => {
  const client = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: (data: CreateRepairInput) => repairApi.createRepair(data),
    onSuccess: () => {
      // 🔄 refresh repairs, spare parts, and products
      client.invalidateQueries({ queryKey: repairKeys.lists() });
      client.invalidateQueries({ queryKey: sparePartKeys.lists() });
      client.invalidateQueries({ queryKey: productKeys.lists() });

      showSuccessMessage("Repair added successfully!", "🛠️");
    },
    onError: () => {
      showErrorMessage("Failed to add repair.");
    },
  });
};

// Delete repair
export const useDeleteRepair = (isDark = false) => {
  const client = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: (id: number) => repairApi.deleteRepair(id),
    onSuccess: (_, id) => {
      client.removeQueries({ queryKey: repairKeys.detail(id) });

      // 🔄 refresh related data
      client.invalidateQueries({ queryKey: repairKeys.lists() });
      client.invalidateQueries({ queryKey: sparePartKeys.lists() });
      client.invalidateQueries({ queryKey: productKeys.lists() });

      showSuccessMessage("Repair deleted successfully!", "🗑️");
    },
    onError: () => {
      showErrorMessage("Failed to delete repair.");
    },
  });
};
