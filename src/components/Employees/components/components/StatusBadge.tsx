import type { Theme } from "@src/types/theme";

interface StatusBadgeProps {
  theme: Theme;
}

const StatusBadge = ({theme }: StatusBadgeProps) => {
  return (
    <div>
        <div
          className="px-2 py-1 rounded-lg text-center text-xs"
          style={{
            background: theme.status.online.background,
            color: theme.status.online.color,
            width: "75px",
            fontSize: "14px",
          }}
        >
          Activated
        </div>
    </div>
  );
};

export default StatusBadge;
