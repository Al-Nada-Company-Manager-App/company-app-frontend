import { fetchWithAuth } from "@src/utils/apiClient";
import type {
  Quotation,
  CreateQuotationInput,
  QuotationQueryParams,
  PaginatedQuotationResponse,
} from "@src/types/Quotations/quotation";

const BASE_URL = `/quotes`;

export const quotationApi = {
  // Get all quotations
  getAllQuotations: async (params: QuotationQueryParams = {}): Promise<PaginatedQuotationResponse> => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));
    if (params.search) searchParams.set("search", params.search);

    const queryString = searchParams.toString();
    const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

    const res = await fetchWithAuth(url);
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
    data?: any;
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
    data?: any;
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
