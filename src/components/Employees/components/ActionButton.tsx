import type { EmployeeTheme } from "../../../types/Employees/employee";

interface ActionButtonProps {
  theme: EmployeeTheme;
  onEdit?: () => void;
}

const ActionButton = ({ theme, onEdit }: ActionButtonProps) => {
  return (
    <div
      style={{ color: theme.employee.editColor, cursor: "pointer" }}
      onClick={onEdit}
    >
      Edit
    </div>
  );
};

export default ActionButton;
