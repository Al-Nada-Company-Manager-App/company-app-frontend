import type { Employee } from "../Employees/employee";

export const TaskStatus = {
  Idle: "Idle",
  InProgress: "In Progress",
  Done: "Done",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskPriority = {
  Low: "Low",
  Medium: "Medium",
  High: "High",
  Critical: "Critical",
} as const;

export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

export interface Task {
  t_id: number;
  t_title: string;
  t_description?: string;
  t_status: TaskStatus | string;
  t_priority: TaskPriority | string;
  created_at: string;
  updated_at: string;
  due_date?: string;
  assigned_to?: number;
  created_by: number;
  assignee?: Employee;
  creator?: Employee;
}
