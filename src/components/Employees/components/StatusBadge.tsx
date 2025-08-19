import type { EmployeeTheme } from "../../../types/Employees/employee";

interface StatusBadgeProps {
  isActive: boolean;
  theme: EmployeeTheme;
}

const StatusBadge = ({ isActive, theme }: StatusBadgeProps) => {
  return (
    <div>
      {isActive ? (
        <div
          className="px-2 py-1 rounded-lg text-center text-xs"
          style={{
            background: theme.status.online.background,
            color: theme.status.online.color,
            width: "75px",
            fontSize: "10px",
          }}
        >
          Activated
        </div>
      ) : (
        <div
          className="px-2 py-1 rounded-lg text-center text-xs border"
          style={{
            background: theme.status.offline.background,
            borderColor: theme.status.offline.borderColor,
            color: theme.status.offline.color,
            width: "75px",
            fontSize: "10px",
          }}
        >
          Deactivated
        </div>
      )}
    </div>
  );
};

export default StatusBadge;
