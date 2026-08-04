import { Card } from "antd";
import { FileTextOutlined, CalendarOutlined } from "@ant-design/icons";
import type { Theme } from "@src/types/theme";
import { convertTimestampToDate } from "@src/utils/ConvertDate";

interface DeliveryCardProps {
  delivery: any;
  theme: Theme;
  onClick?: () => void;
  onEdit?: (id: number) => void;
  onPreview?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const DeliveryCard = ({ delivery, theme, onClick, onEdit, onPreview, onDelete }: DeliveryCardProps) => {
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
      styles={{ body: { padding: "20px" } }}
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
            <FileTextOutlined />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4
                className="text-lg font-semibold m-0"
                style={{ color: theme.title?.color }}
              >
                #{delivery.dn_number} - {delivery.customer?.c_name || "Unknown Customer"}
              </h4>
            </div>
            
            <div className="mt-2 flex flex-col gap-1">
              <span
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.employee?.roleSubtextColor }}
              >
                <CalendarOutlined /> {convertTimestampToDate(delivery.dn_created_at)}
              </span>
            </div>
            
            {(onEdit || onPreview || onDelete) && (
              <div className="mt-4 flex gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
                {onPreview && (
                  <button
                    className="px-3 py-1 text-sm font-medium rounded-md"
                    style={{ backgroundColor: "#1890ff", color: "white", border: "none" }}
                    onClick={() => onPreview(delivery.dn_id)}
                  >
                    Preview
                  </button>
                )}
                {onEdit && (
                  <button
                    className="px-3 py-1 text-sm font-medium rounded-md"
                    style={{ backgroundColor: "#faad14", color: "white", border: "none" }}
                    onClick={() => onEdit(delivery.dn_id)}
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    className="px-3 py-1 text-sm font-medium rounded-md"
                    style={{ backgroundColor: "#ff4d4f", color: "white", border: "none" }}
                    onClick={() => onDelete(delivery.dn_id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DeliveryCard;
