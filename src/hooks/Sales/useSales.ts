import { useMemo } from "react";
import { useGetAllSales } from "@src/queries/Sales";

import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";

export const useSales = (isDark: boolean) => {
  const theme = useMemo(
    () => (isDark ? darkTheme : lightTheme),
    [isDark]
  );

  // Use React Query to fetch sales data
  const { data: sales, isLoading, error } = useGetAllSales();


  return {
    sales,
    theme,
    isLoading,
    error,
  };
};
