import { Card, Avatar, Tag } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import type { Employee } from "@src/types/Employees/employee";
import type { Theme } from "@src/types/theme";
import { getImageUrl } from "@src/config/api";

interface EmployeeCardProps {
  employee: Employee;
  theme: Theme;
  onClick?: () => void;
  action?: React.ReactNode;
}

const EmployeeCard = ({ employee, theme, onClick, action }: EmployeeCardProps) => {
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
          <Avatar
            size={56}
            src={employee.e_photo ? getImageUrl("employees", employee.e_photo) : undefined}
            icon={<UserOutlined />}
            style={{
              flexShrink: 0,
              backgroundColor: theme.avatar?.background || "#1890ff",
              border: `2px solid ${theme.row?.borderColor || "transparent"}`
            }}
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4
                className="text-lg font-semibold m-0"
                style={{ color: theme.title?.color }}
              >
                {employee.f_name} {employee.l_name}
              </h4>
              <Tag color={employee.e_active ? "green" : "red"}>
                {employee.e_active ? "Active" : "Inactive"}
              </Tag>
            </div>
            
            <span
              style={{ color: theme.employee?.roleSubtextColor, opacity: 0.7, display: "block" }}
            >
              {employee.e_role}
            </span>
            
            <div className="mt-2 flex flex-col gap-1">
              {employee.e_phone && (
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.employee?.roleSubtextColor }}
                >
                  <PhoneOutlined /> {employee.e_phone}
                </span>
              )}
              {employee.e_email && (
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.employee?.roleSubtextColor }}
                >
                  <MailOutlined /> {employee.e_email}
                </span>
              )}
            </div>
            {action && (
              <div className="mt-4 flex justify-end">
                {action}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;
