import { fetchWithAuth } from "@src/utils/apiClient";
import type { Sales, Products } from "@src/types/Sales/sales";

const API_BASE_URL = "http://192.168.1.44:4000/sales";

export const salesApi = {
  // Get all sales
  getAllSales: async (): Promise<Sales[]> => {
    const response = await fetchWithAuth(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Sales");
    }
    return response.json();
  },

  // Get Products in Sales by ID
  getSalesProducts: async (
    id: number,
    saleType: string,
  ): Promise<Products[]> => {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/${id}/products/${saleType}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch products for Sale ID: ${id}`);
    }
    return response.json();
  },

  // Add new Sales
  addSale: async (salesData: Partial<Sales>): Promise<Sales> => {
    const response = await fetchWithAuth(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salesData),
    });
    if (!response.ok) {
      throw new Error("Failed to add the Sale Process");
    }
    return response.json();
  },

  // Update sale
  updateSale: async (id: number, salesData: Partial<Sales>): Promise<Sales> => {
    const response = await fetchWithAuth(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salesData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update the Sale with ID: ${id}`);
    }
    return response.json();
  },

  // Delete sale
  deleteSale: async (id: number): Promise<void> => {
    const response = await fetchWithAuth(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete Sale with ID: ${id}`);
    }
  },
};
