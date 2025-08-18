import type { SidebarMenuItemProps } from "../../../types/Sidebar/sidebar";

const SidebarMenuItem = ({
  item,
  theme,
  onClick,
  getIcon,
}: SidebarMenuItemProps) => {
  const isActive = item.isActive;
  const itemTheme = isActive ? theme.item.active : theme.item.normal;

  return (
    <div
      className="flex items-center mb-1 p-2 rounded-2xl cursor-pointer transition-all duration-200 hover:opacity-80"
      style={{ background: itemTheme.background }}
      onClick={onClick}
    >
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
    </div>
  );
};

export default SidebarMenuItem;
