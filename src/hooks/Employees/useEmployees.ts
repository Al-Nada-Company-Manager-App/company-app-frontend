import { useMemo } from "react";
import type { Employee, EmployeeTheme } from "@src/types/Employees/employee";
import { useGetAllEmployees } from "@src/queries/Employees/employeeQueries";
const lightEmployeeTheme: EmployeeTheme = {
  button: {
    background: "#6C79F7",
    color: "#fff",
    hoverBackground: "#5A67D8",
    hoverColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 4px 16px rgba(108,121,239,0.12)",
    fontWeight: "550",
    fontSize: "16px",
    padding: "12px 24px",
    border: "none",
    transition: "background 0.2s, color 0.2s",
  },
  container: {
    background:
      "linear-gradient(126.97deg, rgba(255, 255, 255, 0.9) 28.26%, rgba(240, 240, 240, 0.8) 91.2%)",
    borderRadius: "20px",
    backdropFilter: "blur(60px)",
  },
  title: {
    color: "#2D3748",
  },
  headers: {
    color: "#A0AEC0",
  },
  row: {
    borderColor: "#E2E8F0",
    hoverBackground: "rgba(108, 121, 239, 0.08)",
  },
  employee: {
    nameColor: "#2D3748",
    emailColor: "#A0AEC0",
    roleColor: "#2D3748",
    roleSubtextColor: "#A0AEC0",
    dateColor: "#2D3748",
    editColor: "#A0AEC0",
  },
  avatar: {
    background: "#4FD1C5",
  },
  status: {
    online: {
      background: "#01B574",
      color: "#FFFFFF",
    },
    offline: {
      background: "transparent",
      borderColor: "#A0AEC0",
      color: "#A0AEC0",
    },
  },
  modal: {
    background: "rgba(255, 255, 255, 0.95)",
    color: "#2D3748",
    contentColor: "#4A5568",
    iconColor: "#ED8936",
    // Cancel button
    cancelButtonBg: "transparent",
    cancelButtonColor: "#4A5568",
    cancelButtonBorder: "#E2E8F0",
    cancelButtonHoverBg: "#F7FAFC",
    cancelButtonHoverColor: "#2D3748",
    cancelButtonHoverBorder: "#CBD5E0",
    // Confirm button
    confirmButtonBg: "#6C79F7",
    confirmButtonColor: "#FFFFFF",
    confirmButtonHoverBg: "#5A67D8",
    confirmButtonHoverColor: "#FFFFFF",
  },
};

const darkEmployeeTheme: EmployeeTheme = {
  button: {
    background: "#6C79F7",
    color: "#fff",
    hoverBackground: "#5A67D8",
    hoverColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    fontWeight: "600",
    fontSize: "16px",
    padding: "12px 24px",
    border: "none",
    transition: "background 0.2s, color 0.2s",
  },
  container: {
    background:
      "linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
    borderRadius: "20px",
    backdropFilter: "blur(60px)",
  },
  title: {
    color: "#FFFFFF",
  },
  headers: {
    color: "#A0AEC0",
  },
  row: {
    borderColor: "#56577A",
    hoverBackground: "rgba(255, 255, 255, 0.05)",
  },
  employee: {
    nameColor: "#FFFFFF",
    emailColor: "#A0AEC0",
    roleColor: "#FFFFFF",
    roleSubtextColor: "#A0AEC0",
    dateColor: "#FFFFFF",
    editColor: "#A0AEC0",
  },
  avatar: {
    background: "#4FD1C5",
  },
  status: {
    online: {
      background: "#01B574",
      color: "#FFFFFF",
    },
    offline: {
      background: "transparent",
      borderColor: "#FFFFFF",
      color: "#FFFFFF",
    },
  },
  modal: {
    background: "rgba(16, 20, 50, 0.95)",
    color: "#FFFFFF",
    contentColor: "#CBD5E0",
    iconColor: "#F6AD55",
    // Cancel button
    cancelButtonBg: "transparent",
    cancelButtonColor: "#CBD5E0",
    cancelButtonBorder: "#56577A",
    cancelButtonHoverBg: "rgba(255, 255, 255, 0.1)",
    cancelButtonHoverColor: "#FFFFFF",
    cancelButtonHoverBorder: "#718096",
    // Confirm button
    confirmButtonBg: "#6C79F7",
    confirmButtonColor: "#FFFFFF",
    confirmButtonHoverBg: "#5A67D8",
    confirmButtonHoverColor: "#FFFFFF",
  },
};

export const useEmployees = (isDark: boolean) => {
  const theme = useMemo(
    () => (isDark ? darkEmployeeTheme : lightEmployeeTheme),
    [isDark]
  );

  // Use React Query to fetch employees data
  const { data: employees, isLoading, error } = useGetAllEmployees();

  const activeEmployees = useMemo(
    () => (employees ?? []).filter((employee: Employee) => employee.e_active),
    [employees]
  );

  const deactivatedEmployees = useMemo(
    () => (employees ?? []).filter((employee: Employee) => !employee.e_active),
    [employees]
  );

  return {
    employees,
    activeEmployees,
    deactivatedEmployees,
    theme,
    isLoading,
    error,
  };
};
