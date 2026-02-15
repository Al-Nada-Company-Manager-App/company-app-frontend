import { TaskStatus } from "@src/types/Tasks/task";
import type { Task } from "@src/types/Tasks/task";
import type { Theme } from "@src/types/theme";
import TaskCard from "./TaskCard";
import { Badge } from "antd";

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDropTask: (taskId: number, newStatus: TaskStatus) => void;
  theme: Theme;
  isDark: boolean;
}

const TaskColumn = ({
  status,
  tasks,
  onEdit,
  onDropTask,
  theme,
  isDark,
}: TaskColumnProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      onDropTask(parseInt(taskId), status);
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.Idle:
        return "default";
      case TaskStatus.InProgress:
        return "processing";
      case TaskStatus.Done:
        return "success";
      default:
        return "default";
    }
  };

  const columnStyle = {
    background: theme.container?.background || (isDark ? "#1e293b" : "#f0f2f5"),
    padding: 16,
    borderRadius: 8,
    minHeight: 500,
    maxHeight: "calc(100vh - 200px)", // Limit height
    overflowY: "auto" as const, // Enable vertical scrolling
    border: `1px solid ${theme.row?.borderColor || "#eee"}`,
    transition: "background 0.3s",
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop} style={columnStyle}>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{ margin: 0, color: theme.title?.color, fontWeight: "bold" }}
        >
          {status}
        </h3>
        <Badge
          count={tasks.length}
          showZero
          color={
            getStatusColor(status as TaskStatus) === "default"
              ? "#999"
              : getStatusColor(status as TaskStatus) === "processing"
                ? "#1890ff"
                : "#52c41a"
          }
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.t_id}
            task={task}
            onEdit={onEdit}
            theme={theme}
            isDark={isDark}
          />
        ))}
        {tasks.length === 0 && (
          <div
            style={{
              color: theme.modal?.color,
              opacity: 0.5,
              textAlign: "center",
              padding: "20px 0",
              border: `1px dashed ${theme.row?.borderColor}`,
              borderRadius: 4,
            }}
          >
            No tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
