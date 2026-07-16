import { useMemo } from "react";
import { useGetAllPurchases } from "@src/queries/Purchases";
import type { PurchaseQueryParams } from "@src/types/Purchases/purchases";

import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";

export const usePurchases = (isDark: boolean, params: PurchaseQueryParams = {}) => {
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  // Use React Query to fetch purchases data
  const { data, isLoading, error } = useGetAllPurchases(params);

  return {
    purchases: data?.data ?? [],
    total: data?.metadata?.total ?? 0,
    theme,
    isLoading,
    error,
  };
};
