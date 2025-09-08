import { useThemeContext } from "@src/contexts/useThemeContext";
import Product from "@src/components/Products";
const StockPage = () => {
  const { isDark } = useThemeContext();

  return (
    <Product isDark={isDark} />
  );
};

export default StockPage;
