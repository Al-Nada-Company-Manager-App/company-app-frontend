import { Card, Tag } from "antd";
import { BankOutlined, CalendarOutlined } from "@ant-design/icons";
import type { Debt } from "@src/types/Debts/debt";
import type { Theme } from "@src/types/theme";
import moment from "moment";

interface DebtCardProps {
  debt: Debt;
  theme: Theme;
  onClick?: () => void;
}

const DebtCard = ({ debt, theme, onClick }: DebtCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "DEBT_IN":
        return "green";
      case "DEBT_OUT":
        return "red";
      case "INSURANCE":
        return "orange";
      default:
        return "default";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "DEBT_IN":
        return "Debt In";
      case "DEBT_OUT":
        return "Debt Out";
      case "INSURANCE":
        return "Insurance";
      default:
        return type;
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
            <BankOutlined />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4
                className="text-lg font-semibold m-0"
                style={{ color: theme.title?.color }}
              >
                #{debt.d_id} - {debt.sales?.customer?.c_name || "Unknown Customer"}
              </h4>
              <Tag color={getTypeColor(debt.d_type)}>
                {getTypeLabel(debt.d_type)}
              </Tag>
            </div>
            
            <span
              style={{ color: theme.employee?.roleSubtextColor, opacity: 0.7, display: "block", fontSize: "13px" }}
            >
              Sale ID: #{debt.sales?.sl_id}
            </span>
            
            <div className="mt-2 flex flex-col gap-1">
              <span
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: debt.d_type === "DEBT_IN" ? "#52c41a" : debt.d_type === "DEBT_OUT" ? "#ff4d4f" : "#faad14" }}
              >
                {debt.d_type === "DEBT_IN" ? "+" : debt.d_type === "DEBT_OUT" ? "-" : "🛡"}
                {debt.d_currency} {debt.d_amount?.toFixed(2)}
              </span>
              
              <span
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.employee?.roleSubtextColor }}
              >
                <CalendarOutlined /> {moment(debt.d_date).format("MMMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DebtCard;
