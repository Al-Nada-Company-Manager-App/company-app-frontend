import { useMemo } from "react";
import { useGetAllPurchases } from "@src/queries/Purchases";

import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";

export const usePurchases = (isDark: boolean) => {
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  // Use React Query to fetch purchases data
  const { data: purchases, isLoading, error } = useGetAllPurchases();

  return {
    purchases,
    theme,
    isLoading,
    error,
  };
};
