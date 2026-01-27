import type { Supplier } from "@src/types/Suppliers/supplier";
import type { Theme } from "@src/types/theme";
import { getImageUrl, getPlaceholderUrl } from "@src/config/api";

interface SupplierAvatarProps {
  supplier: Partial<Supplier>;
  theme: Theme;
}

const SupplierAvatar = ({ supplier, theme }: SupplierAvatarProps) => {
  return (
    <div
      className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
      style={{
        background: supplier.s_photo ? "transparent" : theme.avatar.background,
        boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
      }}
    >
      <img
        src={getImageUrl("suppliers", supplier.s_photo)}
        alt={supplier.s_name}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = getPlaceholderUrl("suppliers");
          target.parentElement!.style.background = theme.avatar.background;
        }}
      />
    </div>
  );
};

export default SupplierAvatar;
