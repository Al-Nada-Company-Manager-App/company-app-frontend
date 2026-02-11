import { fetchWithAuth } from "@src/utils/apiClient";
import { API_BASE_URL } from "@src/config/api";
import type { Notification } from "@src/types/Notifications/notifications";

const NOTIFICATIONS_URL = `${API_BASE_URL}/notifications`;

// Notification API functions
export const notificationApi = {
  // Get all notifications
  getAllNotifications: async (): Promise<Notification[]> => {
    const response = await fetchWithAuth(`${NOTIFICATIONS_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }
    return response.json();
  },

  //create new notification
  createNotification: async (
    notificationData: Omit<
      Notification,
      "n_id" | "stock" | "employee" | "sales" | "purchase" | "debts"
    >,
  ): Promise<Notification> => {
    const response = await fetchWithAuth(`${NOTIFICATIONS_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationData),
    });
    if (!response.ok) {
      throw new Error("Failed to create notification");
    }
    return response.json();
  },

  //delete notification
  deleteNotification: async (id: number): Promise<void> => {
    const response = await fetchWithAuth(`${NOTIFICATIONS_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete notification with ID: ${id}`);
    }
  },
};
