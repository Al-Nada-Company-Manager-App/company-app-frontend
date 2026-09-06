import type { SidebarMenuItemProps } from "@src/types/Sidebar/sidebar";
import type { MouseEvent } from "react";

import { NavLink, useLocation } from "react-router-dom";

const SidebarMenuItem = ({
  item,
  theme,
  onClick,
  getIcon,
}: SidebarMenuItemProps) => {
  const location = useLocation();
  const isActive = item.path === "/"
    ? location.pathname === "/"
    : !!item.path && (location.pathname === item.path || location.pathname.startsWith(`${item.path}/`));
  const hasActiveChild = item.children?.some((child) =>
    child.path === location.pathname || location.pathname.startsWith(`${child.path}/`),
  ) ?? false;
  const isSelected = isActive || hasActiveChild;
  const itemTheme = isSelected ? theme.item.active : theme.item.normal;
  const hasChildren = !!(item.children && item.children.length > 0);

  const content = (
    <>
      <div
        className="w-7.5 h-7.5 rounded-xl flex items-center justify-center mr-4"
        style={{
          background: itemTheme.iconBackground,
          color: itemTheme.iconColor,
        }}
      >
        {getIcon(item.icon)}
      </div>
      <span
        className="text-sm font-normal"
        style={{ color: itemTheme.textColor }}
      >
        {item.label}
      </span>
    </>
  );

  const className =
    "flex items-center mb-1 p-2 rounded-2xl cursor-pointer transition-all duration-200 hover:opacity-80 w-full text-left";

  if (hasChildren) {
    return (
      <button
        className={className}
        style={{ background: itemTheme.background }}
        onClick={(e: MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          if (onClick) onClick(e);
        }}
        aria-expanded={hasActiveChild}
        aria-controls={`submenu-${item.id}`}
      >
        {content}
      </button>
    );
  }

  return (
    <NavLink
      to={item.path || "/"}
      className={({ isActive: navActive }) =>
        `${className} ${navActive ? "active" : ""}`
      }
      style={{ background: itemTheme.background }}
      onClick={(e: MouseEvent<HTMLElement>) => {
        // Stop propagation just in case, but let React Router handle routing
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      aria-current={isSelected ? "page" : undefined}
    >
      {content}
    </NavLink>
  );
};

export default SidebarMenuItem;
