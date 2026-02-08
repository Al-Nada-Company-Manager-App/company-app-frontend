import { fetchWithAuth } from "@src/utils/apiClient";
import type { Device, CreateDeviceInput } from "@src/types/Devices/device";

const BASE_URL = "http://192.168.1.44:4000/devices";

export const getDevices = async (): Promise<Device[]> => {
  const res = await fetchWithAuth(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch devices");
  return res.json();
};

export const addDevice = async (device: CreateDeviceInput): Promise<Device> => {
  const res = await fetchWithAuth(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(device),
  });
  if (!res.ok) throw new Error("Failed to add device");
  return res.json();
};

export const updateDevice = async (
  id: number,
  data: CreateDeviceInput,
): Promise<Device> => {
  const res = await fetchWithAuth(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update device");
  return res.json();
};

export const deleteDevice = async (id: number): Promise<void> => {
  const res = await fetchWithAuth(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete device");
};
