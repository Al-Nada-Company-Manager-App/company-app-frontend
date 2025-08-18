import * as Icons from "lucide-react";
import type {
  BreadcrumbTheme,
  UserMenuItem,
} from "../../../types/Breadcrumb/breadcrumb";

interface UserMenuProps {
  theme: BreadcrumbTheme;
  items: UserMenuItem[];
  onItemClick?: (itemId: string) => void;
  isDark: boolean;
}

const UserMenu = ({ theme, onItemClick, isDark }: UserMenuProps) => {
  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Sign In */}
      <div
        className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
        onClick={() => handleItemClick("profile")}
      >
        <Icons.User size={20} color={theme.userMenu.iconColor} />
        <span className="text-x" style={{ color: theme.userMenu.textColor }}>
          Sign In
        </span>
      </div>

      {/* Settings */}
      <div
        className="cursor-pointer hover:opacity-70 transition-opacity"
        onClick={() => handleItemClick("settings")}
      >
        <Icons.Settings size={20} color={theme.userMenu.iconColor} />
      </div>

      {/* Notifications */}
      <div
        className="cursor-pointer hover:opacity-70 transition-opacity"
        onClick={() => handleItemClick("notifications")}
      >
        <Icons.Bell size={20} color={theme.userMenu.iconColor} />
      </div>

      {/* Theme Toggle */}
      <div
        className="cursor-pointer hover:opacity-70 transition-opacity"
        onClick={() => handleItemClick("theme")}
      >
        {isDark ? (
          <Icons.Sun size={20} color={theme.userMenu.iconColor} />
        ) : (
          <Icons.Moon size={20} color={theme.userMenu.iconColor} />
        )}
      </div>
    </div>
  );
};

export default UserMenu;
