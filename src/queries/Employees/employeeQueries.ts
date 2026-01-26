import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "./employeeApi";
import { useThemedMessage } from "@src/hooks/useThemedMessage";
import type { EmployeePermissions } from "@src/types/Employees/employee";

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

// Get employee permissions by ID
export const useGetPermissions = (id: number, options = {}) => {
  return useQuery({
    queryKey: ["employeePermissions", id],
    queryFn: () => employeeApi.getEmployeePermissions(id),
    enabled: !!id,
    ...options,
  });
};
// Create employee mutation
export const useCreateEmployee = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: employeeApi.createEmployee,
    onSuccess: (newEmployee) => {
      // Invalidate and refetch employees list
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });

      showSuccessMessage(
        `Employee ${newEmployee?.f_name || ""} ${
          newEmployee?.l_name || ""
        } created successfully!`,
        "✅",
      );
    },
    onError: (error) => {
      console.error("Error creating employee:", error);
      showErrorMessage(
        "Failed to create employee. Please check your input and try again.",
      );
    },
  });
};

// Update employee mutation
export const useUpdateEmployee = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: employeeApi.updateEmployee,
    onSuccess: (updatedEmployee) => {
      // Update the specific employee in the cache
      queryClient.setQueryData(
        employeeKeys.detail(updatedEmployee.e_id),
        updatedEmployee,
      );
      // Invalidate the employees list to refresh it
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });

      showSuccessMessage(
        `Employee ${updatedEmployee?.f_name || ""} ${
          updatedEmployee?.l_name || ""
        } updated successfully!`,
        "✅",
      );
    },
    onError: (error) => {
      console.error("Error updating employee:", error);
      showErrorMessage(
        "Failed to update employee information. Please try again.",
      );
    },
  });
};

// Update employee permissions mutation
export const useUpdatePermissions = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: ({
      id,
      ...permissions
    }: EmployeePermissions & { id: number }) =>
      employeeApi.updatePermissions(id, permissions),
    onSuccess: (updatedPermissions, variables) => {
      queryClient.setQueryData(
        ["employeePermissions", variables.id],
        updatedPermissions,
      );
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      showSuccessMessage("Employee permissions updated successfully!", "✅");
    },
    onError: (error) => {
      console.error("Error updating employee permissions:", error);
      showErrorMessage(
        "Failed to update employee permissions. Please try again.",
      );
    },
  });
};

// Delete employee mutation
export const useDeleteEmployee = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: employeeApi.deleteEmployee,
    onSuccess: (_, deletedId) => {
      // Remove the employee from the cache
      queryClient.removeQueries({ queryKey: employeeKeys.detail(deletedId) });
      // Invalidate the employees list to refresh it
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });

      showSuccessMessage("Employee deleted successfully!", "🗑️");
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
      showErrorMessage("Failed to delete employee. Please try again.");
    },
  });
};

// Activate employee mutation
export const useActivateEmployee = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: employeeApi.activateEmployee,
    onSuccess: (updatedEmployee) => {
      // Update the specific employee in the cache
      queryClient.setQueryData(
        employeeKeys.detail(updatedEmployee.e_id),
        updatedEmployee,
      );
      // Invalidate the employees list to refresh it
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });

      showSuccessMessage(
        `Employee ${updatedEmployee?.f_name || ""} ${
          updatedEmployee?.l_name || ""
        } activated successfully!`,
        "✅",
      );
    },
    onError: (error) => {
      console.error("Error activating employee:", error);
      showErrorMessage("Failed to activate employee. Please try again.");
    },
  });
};

// Deactivate employee mutation
export const useDeactivateEmployee = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: employeeApi.deactivateEmployee,
    onSuccess: (updatedEmployee) => {
      // Update the specific employee in the cache
      queryClient.setQueryData(
        employeeKeys.detail(updatedEmployee.e_id),
        updatedEmployee,
      );
      // Invalidate the employees list to refresh it
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });

      showSuccessMessage(
        `Employee ${updatedEmployee?.f_name || ""} ${
          updatedEmployee?.l_name || ""
        } deactivated successfully!`,
        "⏸️",
      );
    },
    onError: (error) => {
      console.error("Error deactivating employee:", error);
      showErrorMessage("Failed to deactivate employee. Please try again.");
    },
  });
};

// Update employee photo mutation
export const useUpdateEmployeePhoto = (isDark: boolean = false) => {
  const queryClient = useQueryClient();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);

  return useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) =>
      employeeApi.uploadEmployeePhoto(id, file),
    onSuccess: (data, variables) => {
      // Invalidate the specific employee
      queryClient.invalidateQueries({
        queryKey: employeeKeys.detail(variables.id),
      });
      // Invalidate the employees list
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });

      showSuccessMessage("Profile photo updated successfully!", "✅");
      return data;
    },
    onError: (error) => {
      console.error("Error updating profile photo:", error);
      showErrorMessage("Failed to update profile photo. Please try again.");
    },
  });
};
