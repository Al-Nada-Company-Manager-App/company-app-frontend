import { useMemo } from "react";
import { useGetAllCustomers } from "@src/queries/Customers/customerQueries";

import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";
import type { CustomerQueryParams } from "@src/types/Customers/customer";

export const useCustomers = (
  isDark: boolean,
  params: CustomerQueryParams = {},
) => {
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  // Use React Query to fetch customer data with server-side params
  const { data, isLoading, error } = useGetAllCustomers(params);

  return {
    customers: data?.data ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? 10,
    theme,
    isLoading,
    error,
  };
};
