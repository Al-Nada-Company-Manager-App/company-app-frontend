import { useMemo } from "react";
import { useGetAllCustomers } from "@src/queries/Customers/customerQueries";

import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";

export const useCustomers = (isDark: boolean) => {
  const theme = useMemo(
    () => (isDark ? darkTheme : lightTheme),
    [isDark]
  );

  // Use React Query to fetch customer data
  const { data: customers, isLoading, error } = useGetAllCustomers();


  return {
    customers,
    theme,
    isLoading,
    error,
  };
};
