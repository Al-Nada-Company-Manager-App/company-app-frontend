import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSpareParts,
  addSparePart,
  updateSparePart,
  deleteSparePart,
} from "./sparePartApi";
import type {
  CreateSparePartInput,
  UpdateSparePartInput,
} from "@src/types/SpareParts/sparePart";

export const sparePartKeys = {
  all: ["spareparts"] as const,
  lists: () => [...sparePartKeys.all, "list"] as const,
  detail: (id: number) => [...sparePartKeys.all, "detail", id] as const,
};


export const useSpareParts = () => {
  return useQuery({
    queryKey: sparePartKeys.lists(),
    queryFn: getSpareParts,
  });
};

export const useAddSparePart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSparePartInput) => addSparePart(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: sparePartKeys.lists() }),
  });
};

export const useUpdateSparePart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSparePartInput }) =>
      updateSparePart(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: sparePartKeys.lists() }),
  });
};

export const useDeleteSparePart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteSparePart(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: sparePartKeys.lists() }),
  });
};
