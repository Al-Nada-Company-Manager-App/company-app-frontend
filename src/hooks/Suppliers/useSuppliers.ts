import { useMemo } from "react";
import { useGetAllSuppliers } from "@src/queries/Suppliers";

import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";
import type { SupplierQueryParams } from "@src/types/Suppliers/supplier";

export const useSuppliers = (isDark: boolean, params: SupplierQueryParams = {}) => {
  const theme = useMemo(
    () => (isDark ? darkTheme : lightTheme),
    [isDark]
  );

  // Use React Query to fetch supplier data
  const { data, isLoading, error } = useGetAllSuppliers(params);

  return {
    suppliers: data?.data ?? [],
    total: data?.metadata?.total ?? 0,
    theme,
    isLoading,
    error,
  };
};
