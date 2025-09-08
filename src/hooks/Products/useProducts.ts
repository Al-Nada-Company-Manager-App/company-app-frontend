import { useMemo } from "react";
import { useGetAllProducts } from "@src/queries/Products/productQueries";
import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";

export const useProducts = (isDark: boolean) => {
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const { data: products, isLoading, error } = useGetAllProducts();

  // Categorize products
  const measuring = useMemo(
    () => products?.filter((p) => p.p_category === "Measuring & Controllers"),
    [products]
  );
  const lab = useMemo(
    () => products?.filter((p) => p.p_category === "Laboratory Equipment"),
    [products]
  );
  const chemicals = useMemo(
    () => products?.filter((p) => p.p_category === "Chemical"),
    [products]
  );
  const spares = useMemo(
    () => products?.filter((p) => p.p_category === "Spare Part"),
    [products]
  );
  const others = useMemo(
    () =>
      products?.filter(
        (p) =>
          ![
            "Measuring & Controllers",
            "Laboratory Equipment",
            "Chemical",
            "Spare Part",
          ].includes(p.p_category)
      ),
    [products]
  );

  return { theme, isLoading, error, measuring, lab, chemicals, spares, others };
};
