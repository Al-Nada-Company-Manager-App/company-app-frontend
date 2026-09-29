import { fetchWithAuth } from "@src/utils/apiClient";

const VISITS_URL = `/visits`;

export interface CustomerVisit {
  cv_id: number;
  c_id: number;
  e_id: number;
  cv_date: string;
  cv_notes: string | null;
  employee: {
    e_id: number;
    f_name: string;
    l_name: string;
    e_photo: string | null;
  };
}

export interface VisitSettings {
  visit_reset_months: string;
  visit_reset_last_run: string | null;
}

export const visitApi = {
  getCustomerVisits: async (c_id: number): Promise<CustomerVisit[]> => {
    const response = await fetchWithAuth(`${VISITS_URL}/customer/${c_id}`);
    if (!response.ok) throw new Error("Failed to fetch customer visits");
    return response.json();
  },

  logVisit: async (c_id: number, notes?: string): Promise<CustomerVisit> => {
    const response = await fetchWithAuth(`${VISITS_URL}`, {
      method: "POST",
      body: JSON.stringify({ c_id, notes }),
    });
    if (!response.ok) throw new Error("Failed to log visit");
    const data = await response.json();
    return data.visit;
  },

  getSettings: async (): Promise<VisitSettings> => {
    const response = await fetchWithAuth(`${VISITS_URL}/settings`);
    if (!response.ok) throw new Error("Failed to fetch visit settings");
    return response.json();
  },

  updateSettings: async (visit_reset_months: number): Promise<void> => {
    const response = await fetchWithAuth(`${VISITS_URL}/settings`, {
      method: "PUT",
      body: JSON.stringify({ visit_reset_months }),
    });
    if (!response.ok) throw new Error("Failed to update visit settings");
  },

  runAutoReset: async (): Promise<{ reset: number; customersProcessed: number; message: string }> => {
    const response = await fetchWithAuth(`${VISITS_URL}/auto-reset`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to run auto-reset");
    return response.json();
  },

  unvisitCustomer: async (c_id: number): Promise<void> => {
    const response = await fetchWithAuth(`${VISITS_URL}/unvisit/${c_id}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to unvisit customer");
  },

  clearAllVisits: async (): Promise<void> => {
    const response = await fetchWithAuth(`${VISITS_URL}/clear-all`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to clear visits");
  },
};
