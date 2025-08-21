import { useMemo } from "react";
import type { Employee } from "@src/types/Employees/employee";
import { useGetAllEmployees } from "@src/queries/Employees/employeeQueries";
import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";

export const useEmployees = (isDark: boolean) => {
  const theme = useMemo(
    () => (isDark ? darkTheme : lightTheme),
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
