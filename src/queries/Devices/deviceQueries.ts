import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDevices, addDevice, updateDevice, deleteDevice } from "./deviceApi";
import type { CreateDeviceInput } from "@src/types/Devices/device";

export const useGetAllDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: getDevices,
  });
};

export const useAddDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDeviceInput) => addDevice(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["devices"] }),
  });
};

export const useUpdateDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateDeviceInput }) =>
      updateDevice(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["devices"] }),
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteDevice(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["devices"] }),
  });
};
