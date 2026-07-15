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
    pdfData: string;
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

  // Get a single quotation by ID
  getQuotationById: async (id: number): Promise<Quotation> => {
    const res = await fetchWithAuth(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch quotation");
    return res.json();
  },

  // Update a quotation
  updateQuotation: async (params: {
    id: number;
    data: CreateQuotationInput;
  }): Promise<{
    success: boolean;
    refCode: string;
    pdfData: string;
    message?: string;
  }> => {
    const res = await fetchWithAuth(`${BASE_URL}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || "Failed to update quotation");
    }
    return result;
  },

  // Download PDF
  downloadQuotationPdf: async (id: number): Promise<void> => {
    const res = await fetchWithAuth(`${BASE_URL}/${id}/download`);
    if (!res.ok) throw new Error("Failed to download PDF");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Quotation_${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },
};
