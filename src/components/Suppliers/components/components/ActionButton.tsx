import React from "react";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const ActionButton= ({
  children,
  onClick,
  className,
}: ActionButtonProps) => (
  <button className={`btn ${className || ""}`} onClick={onClick}>
    {children}
  </button>
);

export default ActionButton;
