import { Card, Avatar, Tag, Button } from "antd";
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

const EmployeeCard = ({
  employee,
  theme,
  onClick,
  action,
}: EmployeeCardProps) => {
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
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar
            size={48}
            src={getImageUrl("employees", employee.e_photo)}
            icon={<UserOutlined />}
            style={{ flexShrink: 0 }}
          />
          <div>
            <h4
              className="text-lg font-semibold m-0"
              style={{ color: theme.title?.color }}
            >
              {employee.f_name} {employee.l_name}
            </h4>
            <span
              style={{ color: theme.employee?.roleSubtextColor, opacity: 0.7 }}
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
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Tag color={employee.e_active ? "green" : "red"}>
            {employee.e_active ? "Active" : "Inactive"}
          </Tag>
          {action}
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;
