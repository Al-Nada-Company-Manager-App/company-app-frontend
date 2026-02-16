import { Card, Avatar } from "antd";
import {
  UserOutlined,
  ShopOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import type { Supplier } from "@src/types/Suppliers/supplier";
import type { Theme } from "@src/types/theme";
import { getImageUrl } from "@src/config/api";

interface SupplierCardProps {
  supplier: Supplier;
  theme: Theme;
  onClick?: () => void;
}

const SupplierCard = ({ supplier, theme, onClick }: SupplierCardProps) => {
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
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar
            size={48}
            src={getImageUrl("suppliers", supplier.s_photo)}
            icon={
              supplier.s_type === "COMPANY" ? (
                <ShopOutlined />
              ) : (
                <UserOutlined />
              )
            }
            style={{
              flexShrink: 0,
              backgroundColor: theme.avatar?.background || "#1890ff",
            }}
          />
          <div>
            <h4
              className="text-lg font-semibold m-0"
              style={{ color: theme.title?.color }}
            >
              {supplier.s_name}
            </h4>
            <span
              style={{ color: theme.employee?.roleSubtextColor, opacity: 0.7 }}
            >
              {supplier.s_type}
            </span>
            {supplier.company && (
              <div
                style={{
                  fontSize: "12px",
                  color: theme.employee?.roleSubtextColor,
                }}
              >
                Company: {supplier.company.s_name}
              </div>
            )}
            <div className="mt-2 flex flex-col gap-1">
              {supplier.s_phone && (
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.employee?.roleSubtextColor }}
                >
                  <PhoneOutlined /> {supplier.s_phone}
                </span>
              )}
              {supplier.s_email && (
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.employee?.roleSubtextColor }}
                >
                  <MailOutlined /> {supplier.s_email}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SupplierCard;
