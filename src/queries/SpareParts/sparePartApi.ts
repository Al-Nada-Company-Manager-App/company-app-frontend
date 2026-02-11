import { fetchWithAuth } from "@src/utils/apiClient";
import { API_BASE_URL } from "@src/config/api";
import type {
  SparePart,
  CreateSparePartInput,
  UpdateSparePartInput,
} from "@src/types/SpareParts/sparePart";

const SPARE_PARTS_URL = `${API_BASE_URL}/spare-parts`;

export const getSpareParts = async (): Promise<SparePart[]> => {
  const res = await fetchWithAuth(SPARE_PARTS_URL);
  if (!res.ok) throw new Error("Failed to fetch spare parts");
  return res.json();
};

export const addSparePart = async (
  sp: CreateSparePartInput,
): Promise<SparePart> => {
  const res = await fetchWithAuth(SPARE_PARTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sp),
  });
  if (!res.ok) throw new Error("Failed to add spare part");
  return res.json();
};

export const updateSparePart = async (
  id: number,
  data: UpdateSparePartInput,
): Promise<SparePart> => {
  const res = await fetchWithAuth(`${SPARE_PARTS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update spare part");
  return res.json();
};

export const deleteSparePart = async (id: number): Promise<void> => {
  const res = await fetchWithAuth(`${SPARE_PARTS_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete spare part");
};
