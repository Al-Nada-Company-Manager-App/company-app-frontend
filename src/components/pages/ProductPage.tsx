import Product from "@src/components/Products";
import { useThemeContext } from "@src/contexts/useThemeContext";

const ProductPage = () => {
  const { isDark } = useThemeContext();

  return <Product isDark={isDark} />;
};

export default ProductPage;
