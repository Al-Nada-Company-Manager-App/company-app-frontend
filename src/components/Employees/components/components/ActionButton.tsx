import type { Theme } from "@src/types/theme";
interface ActionButtonProps {
  theme: Theme;
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
