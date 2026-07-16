import type { SidebarMenuItemProps } from "@src/types/Sidebar/sidebar";
import type { MouseEvent } from "react";
import { NavLink } from "react-router-dom";

const SidebarMenuItem = ({
  item,
  theme,
  onClick,
  getIcon,
}: SidebarMenuItemProps) => {
  const isActive = item.isActive;
  const itemTheme = isActive ? theme.item.active : theme.item.normal;
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
        onClick={(e: any) => {
          e.stopPropagation();
          if (onClick) onClick(e);
        }}
        aria-expanded={isActive} // ideally this matches the expanded state in the parent, but keeping it simple for now
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
      onClick={(e: any) => {
        // Stop propagation just in case, but let React Router handle routing
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      aria-current={isActive ? "page" : undefined}
    >
      {content}
    </NavLink>
  );
};

export default SidebarMenuItem;
