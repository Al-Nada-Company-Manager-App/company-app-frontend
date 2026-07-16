import { Card, Avatar, Tag } from "antd";
import { AppstoreOutlined, BarcodeOutlined, InboxOutlined } from "@ant-design/icons";
import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";
import { getImageUrl } from "@src/config/api";

interface ProductCardProps {
  product: Product;
  theme: Theme;
  onClick?: () => void;
  showExpireDate?: boolean;
  showCategory?: boolean;
  showSize?: boolean;
}

const ProductCard = ({ product, theme, onClick, showCategory, showSize }: ProductCardProps) => {
  return (
    <Card
      className={`rounded-2xl transition-all duration-300 shadow-sm overflow-hidden ${
        onClick ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer" : ""
      }`}
      style={{
        marginBottom: 16,
        background: theme.container?.background,
        borderColor: theme.row?.borderColor,
        borderWidth: "1px",
        borderStyle: "solid",
      }}
      bodyStyle={{ padding: "20px" }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4 w-full">
          <Avatar
            size={56}
            src={product.p_photo ? getImageUrl("products", product.p_photo) : undefined}
            icon={<AppstoreOutlined />}
            style={{
              flexShrink: 0,
              backgroundColor: theme.avatar?.background || "#1890ff",
              border: `2px solid ${theme.row?.borderColor || "transparent"}`
            }}
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4
                className="text-lg font-semibold m-0"
                style={{ color: theme.title?.color }}
              >
                {product.p_name}
              </h4>
              <Tag color={product.p_quantity > 10 ? "green" : product.p_quantity > 0 ? "orange" : "red"}>
                {product.p_quantity} in stock
              </Tag>
            </div>
            {showCategory && product.p_category && (
              <span
                style={{ color: theme.employee?.roleSubtextColor, opacity: 0.7, display: "block" }}
              >
                {product.p_category}
              </span>
            )}
            
            <div className="mt-2 flex flex-col gap-1">
              <span
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#faad14" }}
              >
                ${product.p_sellprice?.toFixed(2)}
              </span>
              
              {product.model_code && (
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.employee?.roleSubtextColor }}
                >
                  <BarcodeOutlined /> {product.model_code}
                </span>
              )}
              {showSize && product.p_size && (
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.employee?.roleSubtextColor }}
                >
                  <InboxOutlined /> Size: {product.p_size}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
