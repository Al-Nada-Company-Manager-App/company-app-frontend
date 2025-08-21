import { useSidebar } from "@src/hooks/Sidebar/useSidebar";
import type { SidebarProps } from "@src/types/Sidebar/sidebar";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import SidebarMenuItem from "./SidebarMenuItem";

const NavigationMenu = ({
  isDark,
  currentPath = "/",
  onItemClick,
}: SidebarProps) => {
  const { items, theme } = useSidebar(isDark, currentPath);

  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as LucideIcon;
    return IconComponent ? <IconComponent size={15} /> : null;
  };

  return (
    <div className="px-8 mt-16">
      {items.map((item) => (
        <SidebarMenuItem
          key={item.id}
          item={item}
          theme={theme}
          onClick={() => handleItemClick(item.id)}
          getIcon={getIcon}
        />
      ))}
    </div>
  );
};

export default NavigationMenu;
