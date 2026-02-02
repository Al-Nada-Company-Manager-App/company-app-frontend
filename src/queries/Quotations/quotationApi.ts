import { fetchWithAuth } from "@src/utils/apiClient";
import type {
  Quotation,
  CreateQuotationInput,
} from "@src/types/Quotations/quotation";
import { API_BASE_URL } from "@src/config/api";

const BASE_URL = `${API_BASE_URL}/quotes`;

export const quotationApi = {
  // Get all quotations
  getAllQuotations: async (): Promise<Quotation[]> => {
    const res = await fetchWithAuth(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch quotations");
    return res.json();
  },

  // Create a new quotation
  createQuotation: async (
    data: CreateQuotationInput,
  ): Promise<{
    success: boolean;
    refCode: string;
    pdfUrl: string;
    message?: string;
  }> => {
    const res = await fetchWithAuth(`${BASE_URL}/generate`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || "Failed to create quotation");
    }
    return result;
  },
};
