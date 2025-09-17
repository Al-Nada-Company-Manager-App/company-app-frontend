import { useMemo } from "react";
import { useGetAllDebts } from "@src/queries/Debts";
import { lightTheme, darkTheme } from "@src/hooks/dark&lightthemes";

export const useDebts = (isDark: boolean) => {
  const { data: debts, isLoading, error } = useGetAllDebts();

  const theme = useMemo(() => {
    return isDark ? darkTheme : lightTheme;
  }, [isDark]);

  return {
    debts,
    theme,
    isLoading,
    error,
  };
};
