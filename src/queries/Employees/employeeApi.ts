import type { Employee , EmployeePermissions} from "@src/types/Employees/employee";

// Base API URL - you can move this to an environment variable later
const API_BASE_URL = "http://localhost:4000"; // Change this to your actual API URL

// Employee API functions
export const employeeApi = {
  // Get all employees
  getAllEmployees: async (): Promise<Employee[]> => {
    const response = await fetch(`${API_BASE_URL}/employees`);
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    return response.json();
  },

  // Get employee by ID
  getEmployeeById: async (id: number): Promise<Employee> => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch employee with ID: ${id}`);
    }
    return response.json();
  },

  // Get employee permissions by ID
  getEmployeePermissions: async (id: number): Promise<EmployeePermissions> => {
    const response = await fetch(
      `${API_BASE_URL}/employees/employeeAccess/${id}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch permissions for employee with ID: ${id}`
      );
    }
    return response.json();
  },

  // Create new employee
  createEmployee: async (
    employeeData: Omit<Employee, "e_id">
  ): Promise<Employee> => {
    const response = await fetch(`${API_BASE_URL}/employees`, {
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
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
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
    permissions: EmployeePermissions
  ): Promise<EmployeePermissions> => {
    const response = await fetch(
      `${API_BASE_URL}/employees/updateAccess`, 
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...permissions }),
      }
    );
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `Failed to update permissions for employee with ID: ${id}. Status: ${response.status}. ${errorText}`
      );
    }
    return response.json();
  },

  // Delete employee
  deleteEmployee: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/employees/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete employee with ID: ${id}`);
    }
  },

  // Activate employee
  activateEmployee: async (id: number): Promise<Employee> => {
    const response = await fetch(`${API_BASE_URL}/employees/activate/${id}`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error(`Failed to activate employee with ID: ${id}`);
    }
    return response.json();
  },

  // Deactivate employee
  deactivateEmployee: async (id: number): Promise<Employee> => {
    const response = await fetch(`${API_BASE_URL}/employees/deactivate/${id}`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error(`Failed to deactivate employee with ID: ${id}`);
    }
    return response.json();
  },
};
