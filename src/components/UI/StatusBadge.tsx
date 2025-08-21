import React from "react";

const getBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "badge-pending";
    case "completed":
      return "badge-completed";
    case "active":
      return "badge-success";
    case "inactive":
      return "badge-danger";
    default:
      return "badge-default";
  }
};

const getBadgeStyle = (status: string): React.CSSProperties => {
  switch (status.toLowerCase()) {
    case "pending":
      return {
        background: "#ffe58f",
        color: "#7c6500",
        borderRadius: "8px",
        padding: "4px 12px",
        fontWeight: 600,
        fontSize: "0.95em",
      };
    case "completed":
      return {
        background: "#b7eb8f",
        color: "#255c0a",
        borderRadius: "8px",
        padding: "4px 12px",
        fontWeight: 600,
        fontSize: "0.95em",
      };
    case "active":
      return {
        background: "#e6fffb",
        color: "#0a4747",
        borderRadius: "8px",
        padding: "4px 12px",
        fontWeight: 600,
        fontSize: "0.95em",
      };
    case "inactive":
      return {
        background: "#ffccc7",
        color: "#7a1a1a",
        borderRadius: "8px",
        padding: "4px 12px",
        fontWeight: 600,
        fontSize: "0.95em",
      };
    default:
      return {
        background: "#f0f0f0",
        color: "#595959",
        borderRadius: "8px",
        padding: "4px 12px",
        fontWeight: 600,
        fontSize: "0.95em",
      };
  }
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span className={getBadgeClass(status)} style={getBadgeStyle(status)}>
    {status}
  </span>
);

export default StatusBadge;
