import { Card, Tag } from "antd";
import { ShoppingCartOutlined, CalendarOutlined } from "@ant-design/icons";
import type { Sales } from "@src/types/Sales/sales";
import type { Theme } from "@src/types/theme";
import { convertTimestampToDate } from "@src/utils/ConvertDate";

interface SaleCardProps {
  sale: Sales;
  theme: Theme;
  onClick?: () => void;
}

const SaleCard = ({ sale, theme, onClick }: SaleCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Pending":
        return "orange";
      case "Cancelled":
        return "red";
      default:
        return "default";
    }
  };

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
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 56,
              height: 56,
              flexShrink: 0,
              backgroundColor: theme.avatar?.background || "#f0f2f5",
              color: theme.title?.color || "#1890ff",
              fontSize: 24,
              border: `2px solid ${theme.row?.borderColor || "transparent"}`
            }}
          >
            <ShoppingCartOutlined />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4
                className="text-lg font-semibold m-0"
                style={{ color: theme.title?.color }}
              >
                #{sale.sl_id} - {sale.customer?.c_name || "Unknown Customer"}
              </h4>
              <Tag color={getStatusColor(sale.sl_status)}>
                {sale.sl_status}
              </Tag>
            </div>
            
            <span
              style={{ color: theme.employee?.roleSubtextColor, opacity: 0.7, display: "block", fontSize: "13px" }}
            >
              Bill No: {sale.sl_billnum}
            </span>
            
            <div className="mt-2 flex flex-col gap-1">
              <span
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#faad14" }}
              >
                Total: {sale.sl_currency} {sale.sl_total?.toFixed(2)}
              </span>
              
              <span
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.employee?.roleSubtextColor }}
              >
                <CalendarOutlined /> {convertTimestampToDate(sale.sl_date)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SaleCard;
