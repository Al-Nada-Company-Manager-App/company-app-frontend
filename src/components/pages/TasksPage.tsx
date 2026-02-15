import { useState } from "react";
import { Tabs } from "antd";
import TaskBoard from "@src/components/Tasks/TaskBoard";
import TaskHistory from "@src/components/Tasks/TaskHistory";
import { AppstoreOutlined, CalendarOutlined } from "@ant-design/icons";
import { useThemeContext } from "@src/contexts/theme";

const TasksPage = () => {
  const { theme } = useThemeContext();
  const [activeTab, setActiveTab] = useState("board");

  const items = [
    {
      key: "board",
      label: (
        <span>
          <AppstoreOutlined />
          Board
        </span>
      ),
      children: <TaskBoard />,
    },
    {
      key: "history",
      label: (
        <span>
          <CalendarOutlined />
          History
        </span>
      ),
      children: <TaskHistory />,
    },
  ];

  return (
    <div className="p-4" style={{ height: "100%" }}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        type="card"
        style={{
          color: theme.title?.color,
        }}
      />
    </div>
  );
};

export default TasksPage;
