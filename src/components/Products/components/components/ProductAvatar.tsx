import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";
import { getImageUrl, getPlaceholderUrl } from "@src/config/api";

interface ProductAvatarProps {
  product: Product;
  theme: Theme;
}

const ProductAvatar = ({ product, theme }: ProductAvatarProps) => {
  return (
    <div
      className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
      style={{
        background: "transparent",
        boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
      }}
    >
      <img
        src={getImageUrl("products", product.p_photo)}
        alt={`${product.p_name}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = getPlaceholderUrl("products");
          target.parentElement!.style.background = theme.avatar.background;
        }}
      />
    </div>
  );
};

export default ProductAvatar;
