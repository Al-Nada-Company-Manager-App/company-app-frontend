import type { Customer ,CustomerSales } from "@src/types/Customers/customer";

const API_BASE_URL = "http://localhost:4000"; 

export const customerApi = {
    // Get all customers
    getAllCustomers: async (): Promise<Customer[]> => {
        const response = await fetch(`${API_BASE_URL}/customers`);
        if (!response.ok) {
            throw new Error("Failed to fetch customers");
        }
        return response.json();
    },

    // Get Customer Sales by ID
    getCustomerSales: async (id: number): Promise<CustomerSales[]> => {
        const response = await fetch(`${API_BASE_URL}/customers/${id}/sales`);
        if (!response.ok) {
            throw new Error(`Failed to fetch sales for customer with ID: ${id}`);
        }
        return response.json();
    },

    // Add new customer
    addCustomer: async (customerData: Omit<Customer, "c_id">): Promise<Customer> => {
        const response = await fetch(`${API_BASE_URL}/customers`, {
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
    updateCustomer: async (id: number, customerData: Partial<Customer>): Promise<Customer> => {
        const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
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

    // Delete customer
    deleteCustomer: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/customers/delete/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Failed to delete customer with ID: ${id}`);
        }
    },
};