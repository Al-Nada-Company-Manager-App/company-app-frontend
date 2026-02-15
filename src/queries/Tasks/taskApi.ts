import type { Task } from "@src/types/Tasks/task";
import { fetchWithAuth } from "@src/utils/apiClient";
import { API_BASE_URL } from "@src/config/api";

const TASKS_URL = `${API_BASE_URL}/tasks`;

export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await fetchWithAuth(`${TASKS_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  },

  createTask: async (taskData: Partial<Task>): Promise<Task> => {
    const response = await fetchWithAuth(`${TASKS_URL}/add`, {
      method: "POST",
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    const data = await response.json();
    return data.task;
  },

  updateTask: async ({
    id,
    data,
  }: {
    id: number;
    data: Partial<Task>;
  }): Promise<Task> => {
    const response = await fetchWithAuth(`${TASKS_URL}/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update task with ID: ${id}`);
    }
    const resData = await response.json();
    return resData.task;
  },

  updateTaskStatus: async ({
    id,
    status,
  }: {
    id: number;
    status: string;
  }): Promise<Task> => {
    const response = await fetchWithAuth(`${TASKS_URL}/status/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update status for task with ID: ${id}`);
    }
    const data = await response.json();
    return data.task;
  },

  deleteTask: async (id: number): Promise<void> => {
    const response = await fetchWithAuth(`${TASKS_URL}/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete task with ID: ${id}`);
    }
  },
};
