import React from "react";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  className,
}) => (
  <button className={`btn ${className || ""}`} onClick={onClick}>
    {children}
  </button>
);

export default ActionButton;
