import { fetchWithAuth } from "@src/utils/apiClient";
import type { Notification } from "@src/types/Notifications/notifications";

const API_BASE_URL = "http://localhost:4000/notifications";

// Notification API functions
export const notificationApi = {
  // Get all notifications
  getAllNotifications: async (): Promise<Notification[]> => {
    const response = await fetchWithAuth(`${API_BASE_URL}`);
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
    const response = await fetchWithAuth(`${API_BASE_URL}`, {
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
    const response = await fetchWithAuth(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete notification with ID: ${id}`);
    }
  },
};
