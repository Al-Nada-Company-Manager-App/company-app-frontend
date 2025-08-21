import React from "react";

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={`badge ${
      status === "active" ? "badge-success" : "badge-danger"
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
