import { useMemo } from "react";

import { useGetAllEmployees } from "@src/queries/Employees/employeeQueries";
import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";

export const useEmployees = (isDark: boolean, page = 1, limit = 10, search = "", status = "") => {
  const theme = useMemo(
    () => (isDark ? darkTheme : lightTheme),
    [isDark]
  );

  // Use React Query to fetch employees data
  const { data, isLoading, error } = useGetAllEmployees(page, limit, search, status);

  const employees = data?.data ?? [];
  const metadata = data?.metadata;

  return {
    employees,
    metadata,
    theme,
    isLoading,
    error,
  };
};
