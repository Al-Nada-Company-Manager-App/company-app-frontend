import { X } from "lucide-react";
import { lightTheme, darkTheme } from "@src/hooks/dark&lightthemes";
import type { Notification } from "@src/types/Notifications/notifications";
import { useDeleteNotification } from "@src/queries/Notifications/notificationQueries";

interface NotificationBoxProps {
  notifications: Notification[];
  onClose: () => void;
  isDark?: boolean;
}

const NotificationBox = ({
  notifications,
  onClose,
  isDark = false,
}: NotificationBoxProps) => {
  const currentTheme = isDark ? darkTheme : lightTheme;
  const deleteNotificationMutation = useDeleteNotification();

  const handleDeleteNotification = (notificationId: number) => {
    deleteNotificationMutation.mutate(notificationId);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""}`;
    } else {
      return "Just now";
    }
  };

  const getNotificationName = (notification: Notification) => {
    if (notification.employee) {
      return `${notification.employee.f_name} ${notification.employee.l_name}`;
    }
    if (notification.sales?.customer?.c_name) {
      return notification.sales.customer.c_name;
    }
    if (notification.purchase?.supplier?.s_name) {
      return notification.purchase.supplier.s_name;
    }
    return "System";
  };

  const getNotificationImage = (notification: Notification) => {
    if (notification.employee?.e_photo) {
      return notification.employee.e_photo;
    }
    if (notification.sales?.customer?.c_photo) {
      return notification.sales.customer.c_photo;
    }
    if (notification.purchase?.supplier?.s_photo) {
      return notification.purchase.supplier.s_photo;
    }
    return "/Images/employees/placeholder.jpg";
  };

  const getLeftBorderColor = (notification: Notification) => {
    // You can customize this based on notification type
    switch (notification.n_type) {
      case "stock":
        return "#ED1316"; // Red for stock alerts
      case "sales":
        return "#00A1DF"; // Blue for sales
      case "purchase":
        return "#01B574"; // Green for purchases
      default:
        return currentTheme.notification?.item.leftBorderColor || "#ED1316";
    }
  };

  return (
    <div
      className="w-[512px] max-h-[400px] rounded-lg overflow-hidden shadow-lg"
      style={{
        backgroundColor: currentTheme.notification?.container.background,
        border: `1px solid ${currentTheme.notification?.container.border}`,
        boxShadow: currentTheme.notification?.container.shadow,
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 border-b"
        style={{
          backgroundColor: currentTheme.notification?.header.background,
          borderBottomColor: currentTheme.notification?.header.borderBottom,
          color: currentTheme.notification?.header.textColor,
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[260px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div
            className="p-8 text-center"
            style={{ color: currentTheme.notification?.item.messageColor }}
          >
            No notifications available
          </div>
        ) : (
          notifications.slice(0, 5).map((notification) => (
            <div
              key={notification.n_id}
              className="relative px-4 py-3 border-b hover:bg-opacity-50 transition-colors cursor-pointer group"
              style={{
                backgroundColor: currentTheme.notification?.item.background,
                borderBottomColor: currentTheme.notification?.item.borderBottom,
                borderLeft: `6px solid ${getLeftBorderColor(notification)}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  currentTheme.notification?.item.hoverBackground || "";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  currentTheme.notification?.item.background || "";
              }}
            >
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNotification(notification.n_id);
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                style={{
                  color: currentTheme.notification?.item.deleteButtonColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    currentTheme.notification?.item.deleteButtonHoverColor ||
                    "";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    currentTheme.notification?.item.deleteButtonColor || "";
                }}
              >
                <X size={14} />
              </button>

              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={getNotificationImage(notification)}
                    alt={getNotificationName(notification)}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/Images/employees/placeholder.jpg";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className="font-medium text-base truncate pr-6"
                      style={{
                        color: currentTheme.notification?.item.nameColor,
                      }}
                    >
                      {getNotificationName(notification)}
                    </h4>
                    <span
                      className="text-sm whitespace-nowrap"
                      style={{
                        color: currentTheme.notification?.item.timeColor,
                      }}
                    >
                      {formatTimeAgo(notification.n_date)}
                    </span>
                  </div>
                  <p
                    className="text-sm mt-1 leading-relaxed pr-6"
                    style={{
                      color: currentTheme.notification?.item.messageColor,
                    }}
                  >
                    {notification.n_message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div
          className="px-4 py-3 text-center border-t"
          style={{
            backgroundColor: currentTheme.notification?.footer.background,
            borderTopColor: currentTheme.notification?.header.borderBottom,
          }}
        >
          <button
            className="text-base font-semibold hover:underline transition-colors"
            style={{
              color: currentTheme.notification?.footer.linkColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color =
                currentTheme.notification?.footer.linkHoverColor || "";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color =
                currentTheme.notification?.footer.linkColor || "";
            }}
            onClick={() => {
              // Handle view all notifications
              console.log("View all notifications");
            }}
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationBox;
