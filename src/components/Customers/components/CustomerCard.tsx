import { Card, Avatar } from "antd";
import {
  UserOutlined,
  ShopOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";

interface CustomerCardProps {
  customer: Customer;
  theme: Theme;
  onClick?: () => void;
}

const CustomerCard = ({ customer, theme, onClick }: CustomerCardProps) => {
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
            icon={
              customer.c_type === "COMPANY" ? (
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
              {customer.c_name}
            </h4>
            <span
              style={{ color: theme.employee?.roleSubtextColor, opacity: 0.7 }}
            >
              {customer.c_type}
            </span>
            {customer.c_company_id && (
              <div
                style={{
                  fontSize: "12px",
                  color: theme.employee?.roleSubtextColor,
                }}
              >
                Company ID: {customer.c_company_id}
              </div>
            )}
            <div className="mt-2 flex flex-col gap-1">
              {customer.c_phone && (
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.employee?.roleSubtextColor }}
                >
                  <PhoneOutlined /> {customer.c_phone}
                </span>
              )}
              {customer.c_email && (
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.employee?.roleSubtextColor }}
                >
                  <MailOutlined /> {customer.c_email}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerCard;
