import { fetchWithAuth } from "@src/utils/apiClient";
import { API_BASE_URL } from "@src/config/api";
import type { Purchases, Products, PurchaseQueryParams, PaginatedPurchaseResponse } from "@src/types/Purchases/purchases";

const PURCHASES_URL = `${API_BASE_URL}/purchases`;

export const purchasesApi = {
  // Get all purchases
  getAllPurchases: async (params: PurchaseQueryParams = {}): Promise<PaginatedPurchaseResponse> => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));
    if (params.search) searchParams.set("search", params.search);

    const queryString = searchParams.toString();
    const url = queryString ? `${PURCHASES_URL}?${queryString}` : PURCHASES_URL;

    const response = await fetchWithAuth(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Purchases");
    }
    return response.json();
  },

  // Get Products in Purchases by ID
  getPurchasesProducts: async (id: number): Promise<Products[]> => {
    const response = await fetchWithAuth(`${PURCHASES_URL}/${id}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products for Purchases ID: ${id}`);
    }
    return response.json();
  },

  // Add new Purchases
  addPurchase: async (purchaseData: Partial<Purchases>): Promise<Purchases> => {
    console.log(purchaseData);
    const response = await fetchWithAuth(`${PURCHASES_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchaseData),
    });
    if (!response.ok) {
      throw new Error("Failed to add the Purchase Process");
    }
    return response.json();
  },

  // Update purchase
  updatePurchase: async (
    id: number,
    purchaseData: Partial<Purchases>,
  ): Promise<Purchases> => {
    const response = await fetchWithAuth(`${PURCHASES_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchaseData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update the Purchase with ID: ${id}`);
    }
    return response.json();
  },

  // Delete purchase
  deletePurchase: async (id: number): Promise<void> => {
    const response = await fetchWithAuth(`${PURCHASES_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete Purchase with ID: ${id}`);
    }
  },
};
