import React from "react";
import type { Theme } from "@src/types/theme";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  color: string;
  icon: React.ReactNode;
  theme: Theme;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  color,
  icon,
  theme,
}) => {
  return (
    <div
      className="p-4 rounded-lg"
      style={{
        background: theme.container.background,
        border: `1px solid ${theme.row?.borderColor}`,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            style={{
              color: theme.employee?.emailColor,
              fontSize: "14px",
              margin: 0,
            }}
          >
            {title}
          </p>
          <p
            style={{
              color,
              fontSize: "18px",
              fontWeight: "600",
              margin: "4px 0 0 0",
            }}
          >
            {value}
          </p>
        </div>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: `${color}1A`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color, fontSize: "20px" }}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
