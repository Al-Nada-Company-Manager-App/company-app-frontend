import * as Icons from "lucide-react";
import type {
  BreadcrumbTheme,
  UserMenuItem,
} from "@src/types/Breadcrumb/breadcrumb";
import NotificationIcon from "./NotificationIcon";
import SettingsDropdown from "./SettingsDropdown";

interface UserMenuProps {
  theme: BreadcrumbTheme;
  items: UserMenuItem[];
  onItemClick?: (itemId: string) => void;
  isDark: boolean;
}

const UserMenu = ({ theme, items, onItemClick, isDark }: UserMenuProps) => {
  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  const profileItem = items.find((item) => item.isProfile);
  const menuItems = items.filter((item) => !item.isProfile);

  return (
    <div className="flex items-center gap-4">
      {/* User Profile */}
      {profileItem && (
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity px-2 py-1 rounded-lg"
          onClick={() => handleItemClick(profileItem.id)}
          style={{
            backgroundColor: theme.userProfile.containerBackground,
            border: `1px solid ${theme.userProfile.containerBorder}`,
          }}
        >
          <img
            src={profileItem.image}
            alt={profileItem.label}
            className="w-8 h-8 rounded-full object-cover"
            style={{ border: `2px solid ${theme.userProfile.imageBorder}` }}
          />
          <span
            className="text-sm font-medium"
            style={{ color: theme.userProfile.nameColor }}
          >
            {profileItem.label}
          </span>
        </div>
      )}

      {menuItems.map((item) => {
        const IconComponent = Icons[
          item.icon as keyof typeof Icons
        ] as React.ComponentType<{ size?: number; color?: string }>;

        // Special handling for theme toggle
        if (item.id === "theme") {
          return (
            <div
              key={item.id}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => handleItemClick(item.id)}
            >
              {isDark ? (
                <Icons.Sun size={20} color={theme.userMenu.iconColor} />
              ) : (
                <Icons.Moon size={20} color={theme.userMenu.iconColor} />
              )}
            </div>
          );
        }

        // Special handling for notifications
        if (item.id === "notifications") {
          return (
            <NotificationIcon
              key={item.id}
              theme={theme}
              onItemClick={onItemClick}
              isDark={isDark}
            />
          );
        }

        // Special handling for settings dropdown
        if (item.id === "settings") {
          return (
            <SettingsDropdown
              key={item.id}
              theme={theme}
              isDark={isDark}
              onItemClick={onItemClick}
            />
          );
        }

        return (
          <div
            key={item.id}
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => handleItemClick(item.id)}
          >
            <IconComponent size={20} color={theme.userMenu.iconColor} />
          </div>
        );
      })}
    </div>
  );
};

export default UserMenu;
