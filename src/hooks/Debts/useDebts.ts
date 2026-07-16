import { useMemo } from "react";
import { useGetAllDebts } from "@src/queries/Debts";
import type { DebtQueryParams } from "@src/types/Debts/debt";
import { lightTheme, darkTheme } from "@src/hooks/dark&lightthemes";

export const useDebts = (isDark: boolean, params: DebtQueryParams = {}) => {
  const { data, isLoading, error } = useGetAllDebts(params);

  const theme = useMemo(() => {
    return isDark ? darkTheme : lightTheme;
  }, [isDark]);

  return {
    debts: data?.data ?? [],
    total: data?.metadata?.total ?? 0,
    theme,
    isLoading,
    error,
  };
};
