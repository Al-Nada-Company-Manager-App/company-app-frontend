import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";
import ProductAvatar from "./ProductAvatar";

interface ProductInfoProps {
  product: Product;
  theme: Theme;
}
const ProductInfo = ({ product, theme }: ProductInfoProps) => {
  return (
    <div className="flex items-center">
      <div className="mr-4">
        <ProductAvatar product={product} theme={theme} />
      </div>
      <div>
        <div style={{ color: theme.employee.nameColor }}>{product.p_name}</div>
      </div>
    </div>
  );
};

export default ProductInfo;
