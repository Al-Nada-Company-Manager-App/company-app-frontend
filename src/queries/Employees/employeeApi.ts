import type {
  Employee,
  EmployeePermissions,
} from "@src/types/Employees/employee";

const API_BASE_URL = "http://localhost:4000/employees";

// Employee API functions
export const employeeApi = {
  // Get all employees
  getAllEmployees: async (): Promise<Employee[]> => {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    return response.json();
  },

  // Get employee by ID
  getEmployeeById: async (id: number): Promise<Employee> => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch employee with ID: ${id}`);
    }
    return response.json();
  },

  // Get employee permissions by ID
  getEmployeePermissions: async (id: number): Promise<EmployeePermissions> => {
    const response = await fetch(`${API_BASE_URL}/${id}/employeeAccess`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch permissions for employee with ID: ${id}`,
      );
    }
    return response.json();
  },

  // Create new employee
  createEmployee: async (
    employeeData: Omit<Employee, "e_id">,
  ): Promise<Employee> => {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });
    if (!response.ok) {
      throw new Error("Failed to create employee");
    }
    return response.json();
  },

  // Update employee
  updateEmployee: async ({
    id,
    data,
  }: {
    id: number;
    data: Partial<Employee>;
  }): Promise<Employee> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update employee with ID: ${id}`);
    }
    return response.json();
  },

  // Update employee permissions
  updatePermissions: async (
    id: number,
    permissions: EmployeePermissions,
  ): Promise<EmployeePermissions> => {
    const response = await fetch(`${API_BASE_URL}/${id}/updateAccess`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(permissions),
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `Failed to update permissions for employee with ID: ${id}. Status: ${response.status}. ${errorText}`,
      );
    }
    return response.json();
  },

  // Delete employee
  deleteEmployee: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete employee with ID: ${id}`);
    }
  },

  // Activate employee
  activateEmployee: async (id: number): Promise<Employee> => {
    const response = await fetch(`${API_BASE_URL}/${id}/activate`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error(`Failed to activate employee with ID: ${id}`);
    }
    return response.json();
  },

  // Deactivate employee
  deactivateEmployee: async (id: number): Promise<Employee> => {
    const response = await fetch(`${API_BASE_URL}/${id}/deactivate`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error(`Failed to deactivate employee with ID: ${id}`);
    }
    return response.json();
  },

  // Upload employee photo
  uploadEmployeePhoto: async (
    id: number,
    file: File,
  ): Promise<{ e_photo: string }> => {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await fetch(`${API_BASE_URL}/${id}/photo`, {
      method: "PATCH",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload photo for employee with ID: ${id}`);
    }
    return response.json();
  },
};
