import { fetchWithAuth } from "@src/utils/apiClient";
import { API_BASE_URL } from "@src/config/api";
import type { Debt } from "@src/types/Debts/debt";

const DEBTS_URL = `${API_BASE_URL}/debts`;

export const debtApi = {
  //Get all debts
  getAllDebts: async (): Promise<Debt[]> => {
    const response = await fetchWithAuth(`${DEBTS_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch debts");
    }
    return response.json();
  },
  //Update debt
  updateDebt: async (id: number, debtData: Partial<Debt>): Promise<Debt> => {
    const response = await fetchWithAuth(`${DEBTS_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(debtData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update debt with ID: ${id}`);
    }
    return response.json();
  },
  //delete debt
  deleteDebt: async (id: number): Promise<void> => {
    const response = await fetchWithAuth(`${DEBTS_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete debt with ID: ${id}`);
    }
  },
};
