import { Card } from "antd";
import { ShoppingOutlined, CalendarOutlined } from "@ant-design/icons";
import type { Purchases } from "@src/types/Purchases/purchases";
import type { Theme } from "@src/types/theme";
import { convertTimestampToDate } from "@src/utils/ConvertDate";

interface PurchaseCardProps {
  purchase: Purchases;
  theme: Theme;
  onClick?: () => void;
}

const PurchaseCard = ({ purchase, theme, onClick }: PurchaseCardProps) => {
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
            <ShoppingOutlined />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4
                className="text-lg font-semibold m-0"
                style={{ color: theme.title?.color }}
              >
                #{purchase.pch_id} - {purchase.supplier?.s_name || "Unknown Supplier"}
              </h4>
            </div>
            
            <span
              style={{ color: theme.employee?.roleSubtextColor, opacity: 0.7, display: "block", fontSize: "13px" }}
            >
              Bill No: {purchase.pch_billnum}
            </span>
            
            <div className="mt-2 flex flex-col gap-1">
              <span
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#faad14" }}
              >
                Total: {purchase.pch_currency} {purchase.pch_total?.toFixed(2)}
              </span>
              
              <span
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.employee?.roleSubtextColor }}
              >
                <CalendarOutlined /> {convertTimestampToDate(purchase.pch_date)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PurchaseCard;
