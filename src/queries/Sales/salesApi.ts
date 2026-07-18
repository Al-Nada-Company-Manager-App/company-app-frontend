import { fetchWithAuth } from "@src/utils/apiClient";
import type { Sales, Products, SalesQueryParams, PaginatedSalesResponse } from "@src/types/Sales/sales";

const SALES_URL = `/sales`;

export const salesApi = {
  // Get all sales
  getAllSales: async (params: SalesQueryParams = {}): Promise<PaginatedSalesResponse> => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));
    if (params.search) searchParams.set("search", params.search);

    const queryString = searchParams.toString();
    const url = queryString ? `${SALES_URL}?${queryString}` : SALES_URL;

    const response = await fetchWithAuth(url);
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
      `${SALES_URL}/${id}/products/${saleType}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch products for Sale ID: ${id}`);
    }
    return response.json();
  },

  // Add new Sales
  addSale: async (salesData: Partial<Sales>): Promise<Sales> => {
    const response = await fetchWithAuth(`${SALES_URL}`, {
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
    const response = await fetchWithAuth(`${SALES_URL}/${id}`, {
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
    const response = await fetchWithAuth(`${SALES_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete Sale with ID: ${id}`);
    }
  },
};
