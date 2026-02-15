import { Card, Tag } from "antd";
import {
  BarcodeOutlined,
  InboxOutlined,
  DollarOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";

interface ProductCardProps {
  product: Product;
  theme: Theme;
  onClick?: () => void;
}

const ProductCard = ({ product, theme, onClick }: ProductCardProps) => {
  return (
    <Card
      style={{
        marginBottom: 16,
        background: theme.container?.background,
        borderColor: theme.row?.borderColor,
      }}
      bodyStyle={{ padding: 16 }}
      onClick={onClick}
      hoverable={!!onClick}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h4
            className="text-lg font-semibold m-0"
            style={{ color: theme.title?.color }}
          >
            {product.p_name}
          </h4>
          <Tag color={product.p_status === "Out of Stock" ? "red" : "green"}>
            {product.p_status}
          </Tag>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <div
            className="flex items-center gap-2"
            style={{ color: theme.employee?.roleSubtextColor }}
          >
            <BarcodeOutlined />
            <span>Model: {product.model_code || "N/A"}</span>
          </div>
          <div
            className="flex items-center gap-2"
            style={{ color: theme.employee?.roleSubtextColor }}
          >
            <ExperimentOutlined />
            <span>Serial: {product.serial_number || "N/A"}</span>
          </div>
          {product.p_quantity !== undefined && (
            <div
              className="flex items-center gap-2"
              style={{ color: theme.employee?.roleSubtextColor }}
            >
              <InboxOutlined />
              <span>Qty: {product.p_quantity}</span>
            </div>
          )}
          <div
            className="flex items-center gap-2 font-medium"
            style={{ color: theme.title?.color }}
          >
            <DollarOutlined />
            <span>${product.p_sellprice}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
