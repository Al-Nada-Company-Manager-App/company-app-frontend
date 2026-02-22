import { fetchWithAuth } from "@src/utils/apiClient";
import { API_BASE_URL } from "@src/config/api";
import type {
  Customer,
  CustomerSales,
  CustomerLocation,
  PaginatedCustomerResponse,
  CustomerQueryParams,
} from "@src/types/Customers/customer";

const CUSTOMERS_URL = `${API_BASE_URL}/customers`;

export const customerApi = {
  // Get customer locations for map
  getCustomerLocations: async (): Promise<CustomerLocation[]> => {
    const response = await fetchWithAuth(`${CUSTOMERS_URL}/locations`);
    if (!response.ok) {
      throw new Error("Failed to fetch customer locations");
    }
    return response.json();
  },

  // Get all customers (paginated, with search and type filter)
  getAllCustomers: async (
    params: CustomerQueryParams = {},
  ): Promise<PaginatedCustomerResponse> => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));
    if (params.search) searchParams.set("search", params.search);
    if (params.type) searchParams.set("type", params.type);

    const queryString = searchParams.toString();
    const url = queryString
      ? `${CUSTOMERS_URL}?${queryString}`
      : `${CUSTOMERS_URL}`;

    const response = await fetchWithAuth(url);
    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }
    return response.json();
  },

  // Get a single customer by ID
  getCustomerById: async (id: number): Promise<Customer> => {
    const response = await fetchWithAuth(`${CUSTOMERS_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch customer with ID: ${id}`);
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
