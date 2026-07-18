import { fetchWithAuth } from "@src/utils/apiClient";
import type { Debt, DebtQueryParams, PaginatedDebtResponse } from "@src/types/Debts/debt";

const DEBTS_URL = `/debts`;

export const debtApi = {
  //Get all debts
  getAllDebts: async (params: DebtQueryParams = {}): Promise<PaginatedDebtResponse> => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));
    if (params.search) searchParams.set("search", params.search);

    const queryString = searchParams.toString();
    const url = queryString ? `${DEBTS_URL}?${queryString}` : DEBTS_URL;

    const response = await fetchWithAuth(url);
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
