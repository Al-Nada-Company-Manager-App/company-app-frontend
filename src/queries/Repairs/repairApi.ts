// import type {
//   Repair,
//   CreateRepairInput,
//   UpdateRepairInput,
// } from "@src/types/Repairs/repair";

// const BASE_URL = "http://localhost:4000/repairs";

// export const getRepairs = async (): Promise<Repair[]> => {
//   const res = await fetch(BASE_URL);
//   if (!res.ok) throw new Error("Failed to fetch repairs");
//   return res.json();
// };

// export const addRepair = async (repair: CreateRepairInput): Promise<Repair> => {
//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(repair),
//   });
//   if (!res.ok) throw new Error("Failed to add repair");
//   return res.json();
// };

// export const updateRepair = async (
//   id: number,
//   data: UpdateRepairInput
// ): Promise<Repair> => {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error("Failed to update repair");
//   return res.json();
// };

// export const deleteRepair = async (id: number): Promise<void> => {
//   const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
//   if (!res.ok) throw new Error("Failed to delete repair");
// };


import type { Repair, CreateRepairInput } from "@src/types/Repairs/repair";

const API_BASE_URL = "http://localhost:4000";

export const repairApi = {
  getAllRepairs: async (): Promise<Repair[]> => {
    const res = await fetch(`${API_BASE_URL}/repairs`);
    if (!res.ok) throw new Error("Failed to fetch repairs");
    return res.json();
  },

  createRepair: async (
    data: CreateRepairInput
  ): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE_URL}/repairs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create repair");
    return res.json();
  },

  deleteRepair: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/repairs/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete repair ${id}`);
  },
};
