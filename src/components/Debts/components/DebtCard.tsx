import { Card, Tag } from "antd";
import {
  DollarOutlined,
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { Debt } from "@src/types/Debts/debt";
import type { Theme } from "@src/types/theme";
import moment from "moment";

interface DebtCardProps {
  debt: Debt;
  theme: Theme;
  onClick?: () => void;
}

const DebtCard = ({ debt, theme, onClick }: DebtCardProps) => {
  const isDebtOut = debt.d_type === "DEBT_OUT";
  const color = isDebtOut ? "green" : "red";
  const typeLabel = isDebtOut ? "Receivable" : "Payable";

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
          <div className="flex flex-col">
            <span
              style={{
                color: theme.title?.color,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {isDebtOut ? "+" : "-"}${debt.d_amount}
            </span>
            <span
              style={{
                color: theme.employee?.roleSubtextColor,
                fontSize: "12px",
              }}
            >
              #{debt.d_id}
            </span>
          </div>
          <Tag color={color}>{typeLabel}</Tag>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          {debt.sales.customer && (
            <div
              className="flex items-center gap-2"
              style={{ color: theme.employee?.roleSubtextColor }}
            >
              <UserOutlined />
              <span>{debt.sales.customer.c_name}</span>
            </div>
          )}
          <div
            className="flex items-center gap-2"
            style={{ color: theme.employee?.roleSubtextColor }}
          >
            <FileTextOutlined />
            <span>Bill #{debt.sales.sl_billnum}</span>
          </div>
          <div
            className="flex items-center gap-2"
            style={{ color: theme.employee?.roleSubtextColor }}
          >
            <CalendarOutlined />
            <span>{moment(debt.d_date).format("YYYY-MM-DD")}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DebtCard;
