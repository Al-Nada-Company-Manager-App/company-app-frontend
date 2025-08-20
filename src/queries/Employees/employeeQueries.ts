import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "./employeeApi";

export const employeeKeys = {
  all: ["employees"] as const,
  lists: () => [...employeeKeys.all, "list"] as const,
  list: (filters: string) => [...employeeKeys.lists(), { filters }] as const,
  details: () => [...employeeKeys.all, "detail"] as const,
  detail: (id: number) => [...employeeKeys.details(), id] as const,
};

// Get all employees
export const useGetAllEmployees = () => {
  return useQuery({
    queryKey: employeeKeys.lists(),
    queryFn: employeeApi.getAllEmployees,
  });
};

// Get employee by ID
export const useGetEmployeeById = (id: number) => {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: () => employeeApi.getEmployeeById(id),
    enabled: !!id, // Only run if id is provided
  });
};

// Create employee mutation
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.createEmployee,
    onSuccess: () => {
      // Invalidate and refetch employees list
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
    onError: (error) => {
      console.error("Error creating employee:", error);
    },
  });
};

// Update employee mutation
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.updateEmployee,
    onSuccess: (updatedEmployee) => {
      // Update the specific employee in the cache
      queryClient.setQueryData(
        employeeKeys.detail(updatedEmployee.e_id),
        updatedEmployee
      );
      // Invalidate the employees list to refresh it
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
    onError: (error) => {
      console.error("Error updating employee:", error);
    },
  });
};

// Delete employee mutation
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.deleteEmployee,
    onSuccess: (_, deletedId) => {
      // Remove the employee from the cache
      queryClient.removeQueries({ queryKey: employeeKeys.detail(deletedId) });
      // Invalidate the employees list to refresh it
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
    },
  });
};

// Activate employee mutation
export const useActivateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.activateEmployee,
    onSuccess: (updatedEmployee) => {
      // Update the specific employee in the cache
      queryClient.setQueryData(
        employeeKeys.detail(updatedEmployee.e_id),
        updatedEmployee
      );
      // Invalidate the employees list to refresh it
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
    onError: (error) => {
      console.error("Error activating employee:", error);
    },
  });
};

// Deactivate employee mutation
export const useDeactivateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.deactivateEmployee,
    onSuccess: (updatedEmployee) => {
      // Update the specific employee in the cache
      queryClient.setQueryData(
        employeeKeys.detail(updatedEmployee.e_id),
        updatedEmployee
      );
      // Invalidate the employees list to refresh it
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
    onError: (error) => {
      console.error("Error deactivating employee:", error);
    },
  });
};
