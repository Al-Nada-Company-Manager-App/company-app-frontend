import { fetchWithAuth } from "@src/utils/apiClient";
import { API_BASE_URL } from "@src/config/api";
import type {
  Repair,
  CreateRepairInput,
  UpdateRepairInput,
} from "@src/types/Repairs/repair";

const REPAIRS_URL = `${API_BASE_URL}/repairs`;

export const repairApi = {
  getAllRepairs: async (): Promise<Repair[]> => {
    const res = await fetchWithAuth(`${REPAIRS_URL}`);
    if (!res.ok) throw new Error("Failed to fetch repairs");
    return res.json();
  },

  getRepairById: async (id: number): Promise<Repair> => {
    const res = await fetchWithAuth(`${REPAIRS_URL}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch repair ${id}`);
    return res.json();
  },

  createRepair: async (
    data: CreateRepairInput,
  ): Promise<{ success: boolean }> => {
    const res = await fetchWithAuth(`${REPAIRS_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create repair");
    return res.json();
  },

  updateRepair: async (
    id: number,
    data: UpdateRepairInput,
  ): Promise<Repair> => {
    const res = await fetchWithAuth(`${REPAIRS_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to update repair ${id}`);
    return res.json(); // ✅ should return the updated Repair object
  },

  deleteRepair: async (id: number): Promise<void> => {
    const res = await fetchWithAuth(`${REPAIRS_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete repair ${id}`);
  },
};
