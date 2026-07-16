import { useMemo } from "react";
import { useGetAllSales } from "@src/queries/Sales";
import type { SalesQueryParams } from "@src/types/Sales/sales";

import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";

export const useSales = (isDark: boolean, params: SalesQueryParams = {}) => {
  const theme = useMemo(
    () => (isDark ? darkTheme : lightTheme),
    [isDark]
  );

  // Use React Query to fetch sales data
  const { data, isLoading, error } = useGetAllSales(params);

  return {
    sales: data?.data ?? [],
    total: data?.metadata?.total ?? 0,
    theme,
    isLoading,
    error,
  };
};
