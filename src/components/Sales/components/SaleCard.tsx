import { Card, Tag, Avatar } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import type { Sales } from "@src/types/Sales/sales";
import type { Theme } from "@src/types/theme";
import moment from "moment";

interface SaleCardProps {
  sale: Sales;
  theme: Theme;
  onClick?: () => void;
}

const SaleCard = ({ sale, theme, onClick }: SaleCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "green";
      case "PENDING":
        return "orange";
      case "CANCELLED":
        return "red";
      default:
        return "default";
    }
  };

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
          <div className="flex items-center gap-3">
            <Avatar
              size={40}
              icon={<UserOutlined />}
              style={{ backgroundColor: theme.avatar?.background || "#1890ff" }}
              src={sale.customer?.c_photo}
            />
            <div className="flex flex-col">
              <span style={{ color: theme.title?.color, fontWeight: "bold" }}>
                {sale.customer?.c_name || "Unknown Customer"}
              </span>
              <span
                style={{
                  color: theme.employee?.roleSubtextColor,
                  fontSize: "12px",
                }}
              >
                Sale ID: #{sale.sl_id}
              </span>
            </div>
          </div>
          <Tag color={getStatusColor(sale.sl_status)}>{sale.sl_status}</Tag>
        </div>

        <div className="flex flex-col gap-1 text-sm mt-2">
          <div className="flex justify-between items-center w-full">
            <div
              className="flex items-center gap-2"
              style={{ color: theme.employee?.roleSubtextColor }}
            >
              <FileTextOutlined />
              <span>Bill #{sale.sl_billnum}</span>
            </div>
            <div
              className="flex items-center gap-2 font-bold"
              style={{ color: theme.title?.color, fontSize: "16px" }}
            >
              <span>${sale.sl_total}</span>
            </div>
          </div>

          <div
            className="flex items-center gap-2"
            style={{ color: theme.employee?.roleSubtextColor }}
          >
            <CalendarOutlined />
            <span>Date: {moment(sale.sl_date).format("YYYY-MM-DD")}</span>
          </div>
          {sale.products && (
            <div
              className="flex items-center gap-2"
              style={{ color: theme.employee?.roleSubtextColor }}
            >
              <span>Items: {sale.products.length}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SaleCard;
