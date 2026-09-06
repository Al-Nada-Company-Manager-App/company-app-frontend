import { useSidebar } from "@src/hooks/Sidebar/useSidebar";
import type { SidebarProps } from "@src/types/Sidebar/sidebar";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarMenuItem from "./SidebarMenuItem";

const NavigationMenu = ({
  isDark,
  onItemClick,
}: SidebarProps) => {
  const { items, theme } = useSidebar(isDark);
  const location = useLocation();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const activeParent = items.find((item) =>
      item.children?.some((child) => child.path === location.pathname),
    );
    setExpanded(activeParent?.id ?? null);
  }, [items, location.pathname]);

  const handleItemClick = (itemId: string) => {

    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as LucideIcon;
    return IconComponent ? <IconComponent size={15} /> : null;
  };

  return (
    <div className="px-8 pt-2">
      {items.map((item) => (
        <div key={item.id}>
          <SidebarMenuItem
            item={item}
            theme={theme}
            onClick={(e: MouseEvent<HTMLElement>) => {
              e.stopPropagation();
              if (item.children) {
                toggleExpand(item.id);
              } else {
                handleItemClick(item.id);
              }
            }}
            getIcon={getIcon}
          />
          {item.children && expanded === item.id && (
            <div className="ml-8 mt-1">
              {item.children.map((child) => (
                <SidebarMenuItem
                  key={child.id}
                  item={child}
                  theme={theme}
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.stopPropagation();
                    handleItemClick(child.id);
                  }}
                  getIcon={getIcon}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavigationMenu;
