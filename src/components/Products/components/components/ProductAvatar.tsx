import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";

interface ProductAvatarProps {
  product: Product;
  theme: Theme;
}

const ProductAvatar = ({ product, theme }: ProductAvatarProps) => {
  return (
    <div
      className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
      style={{
        background: product.p_photo ? "transparent" : theme.avatar.background,
        boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
      }}
    >
      {product.p_photo ? (
        <img
          src={
            product.p_photo
              ? `/Images/products/${product.p_photo}`
              : "/Images/products/1.jpg"
          }
          alt={`${product.p_name}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.parentElement!.style.background = theme.avatar.background;
          }}
        />
      ) : null}
    </div>
  );
};

export default ProductAvatar;
