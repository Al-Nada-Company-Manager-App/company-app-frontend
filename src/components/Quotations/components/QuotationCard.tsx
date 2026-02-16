import { Card, Avatar } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
  DollarOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import type { Quotation } from "@src/types/Quotations/quotation";
import type { Theme } from "@src/types/theme";
import moment from "moment";

interface QuotationCardProps {
  quotation: Quotation;
  theme: Theme;
  onClick?: () => void;
}

const QuotationCard = ({ quotation, theme, onClick }: QuotationCardProps) => {
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
            />
            <div className="flex flex-col">
              <span style={{ color: theme.title?.color, fontWeight: "bold" }}>
                {quotation.q_customer_name || "Unknown Customer"}
              </span>
              <span
                style={{
                  color: theme.employee?.roleSubtextColor,
                  fontSize: "12px",
                }}
              >
                #{quotation.q_id}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span
              style={{
                color: theme.title?.color,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              ${quotation.q_total_amount}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm mt-2">
          <div
            className="flex items-center gap-2"
            style={{ color: theme.employee?.roleSubtextColor }}
          >
            <NumberOutlined />
            <span>Ref: {quotation.q_ref_code}</span>
          </div>
          {quotation.q_valid_until && (
            <div
              className="flex items-center gap-2"
              style={{ color: theme.employee?.roleSubtextColor }}
            >
              <CalendarOutlined />
              <span>
                Valid Until:{" "}
                {moment(quotation.q_valid_until).format("YYYY-MM-DD")}
              </span>
            </div>
          )}
          {quotation.quotation_items && (
            <div
              className="flex items-center gap-2"
              style={{ color: theme.employee?.roleSubtextColor }}
            >
              <FileTextOutlined />
              <span>Items: {quotation.quotation_items.length}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default QuotationCard;
