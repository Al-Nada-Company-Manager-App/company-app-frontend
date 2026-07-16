import { Card, Tag } from "antd";
import { DesktopOutlined, BarcodeOutlined } from "@ant-design/icons";
import type { Device } from "@src/types/Devices/device";
import type { Theme } from "@src/types/theme";

interface DeviceCardProps {
  device: Device;
  theme: Theme;
}

const DeviceCard = ({ device, theme }: DeviceCardProps) => {
  return (
    <Card
      className={`rounded-2xl transition-all duration-300 shadow-sm overflow-hidden`}
      style={{
        marginBottom: 16,
        background: theme.container?.background,
        borderColor: theme.row?.borderColor,
        borderWidth: "1px",
        borderStyle: "solid",
      }}
      bodyStyle={{ padding: "20px" }}
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
            <DesktopOutlined />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4
                className="text-lg font-semibold m-0"
                style={{ color: theme.title?.color }}
              >
                {device.p_name}
              </h4>
              <Tag color={device.p_status === "Completed" ? "green" : device.p_status === "Repairing" ? "orange" : "red"}>
                {device.p_status || "Unknown"}
              </Tag>
            </div>
            
            <div className="mt-2 flex flex-col gap-1">
              {device.serial_number && (
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.employee?.roleSubtextColor }}
                >
                  <BarcodeOutlined /> {device.serial_number}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DeviceCard;
