import { useState } from "react";
import { Row, Col, Button, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useGetAllTasks, useUpdateTaskStatus } from "@src/queries/Tasks";
import { TaskStatus } from "@src/types/Tasks/task";
import type { Task } from "@src/types/Tasks/task";
import { useThemeContext } from "@src/contexts/theme";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import moment from "moment";

import { usePermission } from "@src/hooks/usePermission";
import { useAuthContext } from "@src/contexts/auth";

const TaskBoard = () => {
  const { theme, isDark } = useThemeContext();
  const { data: tasks, isLoading, isError } = useGetAllTasks();
  const updateStatusMutation = useUpdateTaskStatus(isDark);
  const { hasPermission } = usePermission();
  const { user } = useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDropTask = (taskId: number, newStatus: TaskStatus) => {
    updateStatusMutation.mutate({ id: taskId, status: newStatus });
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: "center", color: "red", padding: 50 }}>
        Failed to load tasks.
      </div>
    );
  }

  // Helper to check if a date is in the current week
  const isThisWeek = (dateString: string) => {
    const date = moment(dateString);
    return date.isSame(moment(), "week");
  };

  // Filter tasks based on permissions
  const filteredTasks =
    tasks?.filter((t) => {
      if (hasPermission("tasks_view_all")) return true;
      return t.assigned_to === user?.e_id; // Only show own tasks
    }) || [];

  const tasksByStatus = {
    [TaskStatus.Idle]: filteredTasks.filter(
      (t) => t.t_status === TaskStatus.Idle,
    ),
    [TaskStatus.InProgress]: filteredTasks.filter(
      (t) => t.t_status === TaskStatus.InProgress,
    ),
    [TaskStatus.Done]: filteredTasks.filter(
      (t) => t.t_status === TaskStatus.Done && isThisWeek(t.updated_at),
    ),
  };

  return (
    <div style={{ padding: 0 }}>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: theme.title?.color, margin: 0 }}>Task Manager</h2>
        {hasPermission("tasks_add") && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateTask}
            style={{
              background: theme.button?.background,
              color: theme.button?.color,
              borderRadius: theme.button?.borderRadius,
            }}
          >
            Add Task
          </Button>
        )}
      </div>

      <Row gutter={[16, 16]}>
        {Object.values(TaskStatus).map((status) => (
          <Col key={status} xs={24} md={8}>
            <TaskColumn
              status={status}
              tasks={tasksByStatus[status]}
              onEdit={handleEditTask}
              onDropTask={handleDropTask}
              theme={theme}
              isDark={isDark}
            />
          </Col>
        ))}
      </Row>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={editingTask}
        theme={theme}
      />
    </div>
  );
};

export default TaskBoard;
