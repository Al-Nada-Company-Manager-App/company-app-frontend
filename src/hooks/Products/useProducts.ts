import { useMemo } from "react";
import { useGetAllProducts } from "@src/queries/Products/productQueries";
import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";
import type { ProductQueryParams } from "@src/types/Products/product";

export const useProducts = (isDark: boolean, params: ProductQueryParams = {}) => {
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const { data, isLoading, error } = useGetAllProducts(params);

  return { 
    products: data?.data ?? [],
    total: data?.metadata?.total ?? 0,
    theme, 
    isLoading, 
    error 
  };
};
