import {
  Card,
  Tag,
  Avatar,
  Tooltip,
  Button,
  Dropdown,
  type MenuProps,
  Modal,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { Task } from "@src/types/Tasks/task";
import { TaskPriority } from "@src/types/Tasks/task";
import type { Theme } from "@src/types/theme";
import moment from "moment";
import { useDeleteTask } from "@src/queries/Tasks";
import { API_BASE_URL } from "@src/config/api";
import { usePermission } from "@src/hooks/usePermission";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  theme: Theme;
  isDark: boolean;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case TaskPriority.Critical:
      return "red";
    case TaskPriority.High:
      return "orange";
    case TaskPriority.Medium:
      return "blue";
    case TaskPriority.Low:
      return "green";
    default:
      return "default";
  }
};

const TaskCard = ({ task, onEdit, theme, isDark }: TaskCardProps) => {
  const deleteTaskMutation = useDeleteTask();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "edit") {
      onEdit(task);
    } else if (e.key === "delete") {
      Modal.confirm({
        title: "Are you sure delete this task?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          deleteTaskMutation.mutate(task.t_id);
        },
      });
    }
  };

  const { hasPermission } = usePermission();

  const menuItems: MenuProps["items"] = [];

  if (hasPermission("tasks_edit")) {
    menuItems.push({
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
    });
  }

  if (hasPermission("tasks_delete")) {
    menuItems.push({
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
    });
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.t_id.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const cardStyle = {
    marginBottom: 16,
    cursor: "grab",
    background: isDark ? "#1e293b" : "#fff", // Use a simpler logic for now or specific theme prop
    borderColor: theme.row?.borderColor,
  };

  // const { confirm } = Modal; // This line is redundant if Modal is imported at the top
  // const { Modal } = require("antd"); // Removed incorrect re-declaration

  const imageUrl = task.assignee?.e_photo
    ? `${API_BASE_URL.replace("/api", "")}/images/${task.assignee.e_photo}`
    : null;

  return (
    <div draggable onDragStart={handleDragStart} style={{ opacity: 1 }}>
      <Card
        size="small"
        style={cardStyle}
        hoverable
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: theme.modal?.color,
            }}
          >
            <span style={{ fontWeight: "bold" }}>{task.t_title}</span>
            <Dropdown
              menu={{ items: menuItems, onClick: handleMenuClick }}
              trigger={["click"]}
            >
              <Button
                type="text"
                icon={<MoreOutlined style={{ color: theme.modal?.color }} />}
                size="small"
              />
            </Dropdown>
          </div>
        }
      >
        <div style={{ color: theme.modal?.color, marginBottom: 10 }}>
          {task.t_description && (
            <p
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                marginBottom: 10,
                fontSize: "0.9em",
                opacity: 0.8,
              }}
            >
              {task.t_description}
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Tag color={getPriorityColor(task.t_priority as string)}>
            {task.t_priority}
          </Tag>

          <div style={{ display: "flex", gap: 5 }}>
            {task.assigned_to && (
              <Tooltip
                title={`Assigned to: ${task.assignee?.f_name || "Unknown"}`}
              >
                <Avatar size="small" src={imageUrl} icon={<UserOutlined />} />
              </Tooltip>
            )}
          </div>
        </div>

        {task.due_date && (
          <div
            style={{
              marginTop: 8,
              fontSize: "0.8em",
              color: theme.modal?.color,
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <CalendarOutlined />
            {moment(task.due_date).format("MMM Do")}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TaskCard;
