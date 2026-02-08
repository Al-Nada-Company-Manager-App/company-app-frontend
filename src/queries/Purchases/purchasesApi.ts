import { fetchWithAuth } from "@src/utils/apiClient";
import type { Purchases, Products } from "@src/types/Purchases/purchases";

const API_BASE_URL = "http://192.168.1.44:4000/purchases";

export const purchasesApi = {
  // Get all purchases
  getAllPurchases: async (): Promise<Purchases[]> => {
    const response = await fetchWithAuth(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Purchases");
    }
    return response.json();
  },

  // Get Products in Purchases by ID
  getPurchasesProducts: async (id: number): Promise<Products[]> => {
    const response = await fetchWithAuth(`${API_BASE_URL}/${id}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products for Purchases ID: ${id}`);
    }
    return response.json();
  },

  // Add new Purchases
  addPurchase: async (purchaseData: Partial<Purchases>): Promise<Purchases> => {
    console.log(purchaseData);
    const response = await fetchWithAuth(`${API_BASE_URL}`, {
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
    const response = await fetchWithAuth(`${API_BASE_URL}/${id}`, {
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
    const response = await fetchWithAuth(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete Purchase with ID: ${id}`);
    }
  },
};
