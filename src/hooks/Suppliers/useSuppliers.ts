import { useMemo } from "react";
import { useGetAllSuppliers } from "@src/queries/Suppliers";

import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";

export const useSuppliers = (isDark: boolean) => {
  const theme = useMemo(
    () => (isDark ? darkTheme : lightTheme),
    [isDark]
  );

  // Use React Query to fetch employees data
  const { data: suppliers, isLoading, error } = useGetAllSuppliers();


  return {
    suppliers,
    theme,
    isLoading,
    error,
  };
};
