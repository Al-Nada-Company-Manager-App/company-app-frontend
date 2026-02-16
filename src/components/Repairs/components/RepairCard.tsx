import { Card, Tag } from "antd";
import {
  ToolOutlined,
  CalendarOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import type { Repair } from "@src/types/Repairs/repair";
import type { Theme } from "@src/types/theme";
import { convertTimestampToDate } from "@src/utils/ConvertDate";

interface RepairCardProps {
  repair: Repair;
  theme: Theme;
  onClick?: () => void;
}

const RepairCard = ({ repair, theme, onClick }: RepairCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Repairing":
        return "blue";
      case "Pending":
        return "orange";
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
          <div className="flex flex-col">
            <span style={{ color: theme.title?.color, fontWeight: "bold" }}>
              {repair.stock?.p_name || "Unknown Product"}
            </span>
            <span
              style={{
                color: theme.employee?.roleSubtextColor,
                fontSize: "12px",
              }}
            >
              Repair ID: #{repair.rep_id}
            </span>
          </div>
          <Tag color={getStatusColor(repair.stock?.p_status)}>
            {repair.stock?.p_status}
          </Tag>
        </div>

        <div className="flex flex-col gap-1 text-sm mt-2">
          <div
            className="flex items-center gap-2"
            style={{ color: theme.employee?.roleSubtextColor }}
          >
            <BarcodeOutlined />
            <span>SN: {repair.stock?.serial_number}</span>
          </div>
          <div
            className="flex items-center gap-2"
            style={{ color: theme.employee?.roleSubtextColor }}
          >
            <CalendarOutlined />
            <span>Date: {convertTimestampToDate(repair.rep_date)}</span>
          </div>
          {repair.remarks && (
            <div
              className="flex items-center gap-2"
              style={{ color: theme.employee?.roleSubtextColor }}
            >
              <ToolOutlined />
              <span className="truncate max-w-[200px]">{repair.remarks}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RepairCard;
