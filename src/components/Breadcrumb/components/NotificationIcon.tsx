import { Bell } from "lucide-react";
import { useState } from "react";
import type { BreadcrumbTheme } from "@src/types/Breadcrumb/breadcrumb";
import NotificationBox from "./NotificationBox";
import { useGetAllNotifications } from "@src/queries/Notifications/notificationQueries";

interface NotificationIconProps {
  theme: BreadcrumbTheme;
  onItemClick?: (itemId: string) => void;
  isDark?: boolean;
}

const NotificationIcon = ({
  theme,
  onItemClick,
  isDark = false,
}: NotificationIconProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: notifications = [] } = useGetAllNotifications();

  // Count unread notifications
  const unreadCount = notifications.filter(
    (notification) => notification.n_status === "Pending"
  ).length;

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onItemClick) {
      onItemClick("notifications");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer hover:opacity-70 transition-opacity relative"
        onClick={handleClick}
      >
        <Bell size={20} color={theme.notification.iconColor} />
        {unreadCount > 0 && (
          <div
            className="absolute -top-2 -right-2 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs font-semibold"
            style={{
              backgroundColor: theme.notification.badgeBackground,
              color: theme.notification.badgeTextColor,
            }}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </div>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={handleClose} />
          {/* Notification Box */}
          <div className="absolute top-8 right-0 z-50">
            <NotificationBox
              notifications={notifications}
              onClose={handleClose}
              isDark={isDark}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationIcon;
