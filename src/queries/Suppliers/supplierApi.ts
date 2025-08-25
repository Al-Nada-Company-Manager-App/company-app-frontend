import type { Supplier, SupplierPurchases } from "@src/types/Suppliers/supplier";

const API_BASE_URL = "http://localhost:4000";

export const supplierApi = {
  // Get all suppliers
  getAllSuppliers: async (): Promise<Supplier[]> => {
    const response = await fetch(`${API_BASE_URL}/suppliers`);
    if (!response.ok) {
      throw new Error("Failed to fetch suppliers");
    }
    return response.json();
  },

  // Get Supplier Sales by ID
  getSupplierPurchases: async (id: number): Promise<SupplierPurchases[]> => {
    const response = await fetch(`${API_BASE_URL}/suppliers/${id}/purchases`);
    if (!response.ok) {
      throw new Error(`Failed to fetch sales for supplier with ID: ${id}`);
    }
    return response.json();
  },

  // Add new supplier
  addSupplier: async (
    supplierData: Omit<Supplier, "s_id">
  ): Promise<Supplier> => {
    const response = await fetch(`${API_BASE_URL}/suppliers`, {
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
    supplierData: Partial<Supplier>
  ): Promise<Supplier> => {
    const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
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
    formData.append("s_id", String(s_id));
    formData.append("photo", photo);
    const response = await fetch(
      `${API_BASE_URL}/suppliers/updatesupplierphoto`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to update supplier photo for ID: ${s_id}`);
    }
    // Assuming the API returns the new photo filename
    const data = await response.json();
    return data.filename || "";
  },

  // Delete supplier
  deleteSupplier: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/suppliers/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete supplier with ID: ${id}`);
    }
  },
};
