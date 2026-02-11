import { fetchWithAuth } from "@src/utils/apiClient";
import { API_BASE_URL } from "@src/config/api";
import type { Customer, CustomerSales } from "@src/types/Customers/customer";

const CUSTOMERS_URL = `${API_BASE_URL}/customers`;

export const customerApi = {
  // Get all customers
  getAllCustomers: async (): Promise<Customer[]> => {
    const response = await fetchWithAuth(`${CUSTOMERS_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }
    return response.json();
  },

  getAllCompanies: async (): Promise<{ c_id: number; c_name: string }[]> => {
    const response = await fetchWithAuth(`${CUSTOMERS_URL}/companies`);
    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }
    return response.json();
  },

  // Get Customer Sales by ID
  getCustomerSales: async (id: number): Promise<CustomerSales[]> => {
    const response = await fetchWithAuth(`${CUSTOMERS_URL}/${id}/sales`);
    if (!response.ok) {
      throw new Error(`Failed to fetch sales for customer with ID: ${id}`);
    }
    return response.json();
  },

  // Add new customer
  addCustomer: async (
    customerData: Omit<Customer, "c_id">,
  ): Promise<Customer> => {
    const response = await fetchWithAuth(`${CUSTOMERS_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      throw new Error("Failed to add customer");
    }
    return response.json();
  },

  // Update customer
  updateCustomer: async (
    id: number,
    customerData: Partial<Customer>,
  ): Promise<Customer> => {
    const response = await fetchWithAuth(`${CUSTOMERS_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update customer with ID: ${id}`);
    }
    return response.json();
  },

  // Update customer photo
  updateCustomerPhoto: async (c_id: number, photo: File): Promise<string> => {
    const formData = new FormData();
    formData.append("photo", photo);
    const response = await fetchWithAuth(`${CUSTOMERS_URL}/${c_id}/photo`, {
      method: "PATCH",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Failed to update customer photo for ID: ${c_id}`);
    }
    // Assuming the API returns the new photo filename
    const data = await response.json();
    return data.filename || "";
  },

  // Delete customer
  deleteCustomer: async (id: number): Promise<void> => {
    const response = await fetchWithAuth(`${CUSTOMERS_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete customer with ID: ${id}`);
    }
  },
};
