import { fetchWithAuth } from "@src/utils/apiClient";
import { API_BASE_URL } from "@src/config/api";
import type {
  Supplier,
  SupplierPurchases,
  SupplierQueryParams,
  PaginatedSupplierResponse,
} from "@src/types/Suppliers/supplier";

const SUPPLIERS_URL = `${API_BASE_URL}/suppliers`;

export const supplierApi = {
  // Get all suppliers
  getAllSuppliers: async (params: SupplierQueryParams = {}): Promise<PaginatedSupplierResponse> => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));
    if (params.search) searchParams.set("search", params.search);
    if (params.type) searchParams.set("type", params.type);

    const queryString = searchParams.toString();
    const url = queryString ? `${SUPPLIERS_URL}?${queryString}` : SUPPLIERS_URL;

    const response = await fetchWithAuth(url);
    if (!response.ok) {
      throw new Error("Failed to fetch suppliers");
    }
    return response.json();
  },

  getAllCompanies: async (): Promise<{ s_id: number; s_name: string }[]> => {
    const response = await fetchWithAuth(`${SUPPLIERS_URL}/companies`);
    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }
    return response.json();
  },

  // Get Supplier Sales by ID
  getSupplierPurchases: async (id: number): Promise<SupplierPurchases[]> => {
    const response = await fetchWithAuth(`${SUPPLIERS_URL}/${id}/purchases`);
    if (!response.ok) {
      throw new Error(`Failed to fetch sales for supplier with ID: ${id}`);
    }
    return response.json();
  },

  // Add new supplier
  addSupplier: async (
    supplierData: Omit<Supplier, "s_id">,
  ): Promise<Supplier> => {
    const response = await fetchWithAuth(`${SUPPLIERS_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplierData),
    });
    if (!response.ok) {
      throw new Error("Failed to add supplier");
    }
    return response.json();
  },

  // Update supplier
  updateSupplier: async (
    id: number,
    supplierData: Partial<Supplier>,
  ): Promise<Supplier> => {
    const response = await fetchWithAuth(`${SUPPLIERS_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplierData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update supplier with ID: ${id}`);
    }
    return response.json();
  },

  // Update supplier photo
  updateSupplierPhoto: async (s_id: number, photo: File): Promise<string> => {
    console.log("Updating supplier photo for ID:", s_id);
    const formData = new FormData();
    formData.append("photo", photo);
    const response = await fetchWithAuth(`${SUPPLIERS_URL}/${s_id}/photo`, {
      method: "PATCH",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Failed to update supplier photo for ID: ${s_id}`);
    }
    // Assuming the API returns the new photo filename
    const data = await response.json();
    return data.filename || "";
  },

  // Delete supplier
  deleteSupplier: async (id: number): Promise<void> => {
    const response = await fetchWithAuth(`${SUPPLIERS_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete supplier with ID: ${id}`);
    }
  },
};
