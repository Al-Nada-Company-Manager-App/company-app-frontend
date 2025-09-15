import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { repairApi } from "./repairApi";
import type {
  CreateRepairInput,
  Repair,
  UpdateRepairInput,
} from "@src/types/Repairs/repair";
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

export const useUpdateRepair = (isDark = false) => {
  const client = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRepairInput }) =>
      repairApi.updateRepair(id, data),
    onSuccess: (updatedRepair: Repair, { id }) => {
      client.setQueryData(repairKeys.detail(id), updatedRepair);

      client.setQueryData(repairKeys.lists(), (old: Repair[] | undefined) =>
        old?.map((r) => (r.rep_id === id ? updatedRepair : r))
      );

      // ensure the detail query is refetched from the server (so nested stock/spare data is populated)
      client.invalidateQueries({ queryKey: repairKeys.detail(id) });

      client.invalidateQueries({ queryKey: repairKeys.lists() });
      client.invalidateQueries({ queryKey: sparePartKeys.lists() });
      showSuccessMessage("Repair updated successfully!", "🛠️");
    },
    onError: () => {
      showErrorMessage("Failed to update repair.");
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

export const useGetRepairById = (id?: number, enabled = false) =>
  useQuery({
    queryKey: id ? repairKeys.detail(id) : ["repairs", "detail", -1],
    queryFn: () => (id ? repairApi.getRepairById(id) : Promise.reject()),
    enabled: Boolean(id && enabled),
    staleTime: 0,
  });
