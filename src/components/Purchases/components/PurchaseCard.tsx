import { Card, Avatar } from "antd";
import {
  DollarOutlined,
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { Purchases } from "@src/types/Purchases/purchases";
import type { Theme } from "@src/types/theme";
import moment from "moment";
import { getImageUrl } from "@src/config/api";

interface PurchaseCardProps {
  purchase: Purchases;
  theme: Theme;
  onClick?: () => void;
}

const PurchaseCard = ({ purchase, theme, onClick }: PurchaseCardProps) => {
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
              src={getImageUrl("suppliers", purchase.supplier?.s_photo)}
              icon={<UserOutlined />}
              style={{ backgroundColor: theme.avatar?.background || "#1890ff" }}
            />
            <div className="flex flex-col">
              <span style={{ color: theme.title?.color, fontWeight: "bold" }}>
                {purchase.supplier?.s_name || "Unknown Supplier"}
              </span>
              <span
                style={{
                  color: theme.employee?.roleSubtextColor,
                  fontSize: "12px",
                }}
              >
                #{purchase.pch_id}
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
              ${purchase.pch_cost}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm mt-2">
          <div
            className="flex items-center gap-2"
            style={{ color: theme.employee?.roleSubtextColor }}
          >
            <FileTextOutlined />
            <span>Bill #{purchase.pch_billnum}</span>
          </div>
          <div
            className="flex items-center gap-2"
            style={{ color: theme.employee?.roleSubtextColor }}
          >
            <CalendarOutlined />
            <span>{moment(purchase.pch_date).format("YYYY-MM-DD")}</span>
          </div>
          {purchase.products && (
            <div
              className="flex items-center gap-2"
              style={{ color: theme.employee?.roleSubtextColor }}
            >
              <span>Items: {purchase.products.length}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PurchaseCard;
