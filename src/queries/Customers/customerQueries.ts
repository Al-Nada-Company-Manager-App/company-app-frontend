// React Query hooks for customers
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customerApi } from "./customerApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";
import type { Customer,CustomerSales } from "@src/types/Customers/customer";

export const customerKeys = {
    all: ["customers"] as const,
    lists: () => [...customerKeys.all, "list"] as const,
    list: (filters: string) => [...customerKeys.lists(), { filters }] as const,
    details: () => [...customerKeys.all, "detail"] as const,
    detail: (id: number) => [...customerKeys.details(), id] as const,
};

// Get all customers
export const useGetAllCustomers = () => {
    return useQuery({
        queryKey: customerKeys.lists(),
        queryFn: customerApi.getAllCustomers,
    });
}

//Get customer Sales by ID
export const useGetCustomerSales = (id: number) => {
    return useQuery({
        queryKey: customerKeys.detail(id),
        queryFn: () => customerApi.getCustomerSales(id),
        enabled: !!id, // Only run if id is provided
    });
};

// Create customer mutation
export const useCreateCustomer = (isDark: boolean = false) => {
    const queryClient = useQueryClient();
    const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

    return useMutation({
        mutationFn: customerApi.addCustomer,
        onSuccess: (newCustomer) => {
            // Invalidate and refetch customers list
            queryClient.invalidateQueries({ queryKey: customerKeys.lists() });

            showSuccessMessage(
                `Customer ${newCustomer.c_name || ""} created successfully!`,
                "✅"
            );
        },
        onError: (error) => {
            console.error("Error creating customer:", error);
            showErrorMessage("Failed to create customer", "❌");
        },
    });
}

// Update customer mutation
export const useUpdateCustomer = (isDark: boolean = false) => {
    const queryClient = useQueryClient();
    const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

    return useMutation({
        mutationFn: ({ id, customerData }: { id: number; customerData: Partial<Customer> }) =>
            customerApi.updateCustomer(id, customerData),
        onSuccess: (updatedCustomer) => {
            // Invalidate and refetch customers list
            queryClient.invalidateQueries({ queryKey: customerKeys.lists() });

            showSuccessMessage(
                `Customer ${updatedCustomer.c_name || ""} updated successfully!`,
                "✅"
            );
        },
        onError: (error) => {
            console.error("Error updating customer:", error);
            showErrorMessage("Failed to update customer", "❌");
        },
    });
}

// Delete customer mutation
export const useDeleteCustomer = (isDark: boolean = false) => {
    const queryClient = useQueryClient();
    const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

    return useMutation({
        mutationFn: customerApi.deleteCustomer,
        onSuccess: (id) => {
            // Invalidate and refetch customers list
            queryClient.invalidateQueries({ queryKey: customerKeys.lists() });

            showSuccessMessage(`Customer with ID ${id} deleted successfully!`, "✅");
        },
        onError: (error) => {
            console.error("Error deleting customer:", error);
            showErrorMessage("Failed to delete customer", "❌");
        },
    });
}

    