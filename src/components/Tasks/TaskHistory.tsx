import { useState } from "react";
import { Calendar, Badge, Select, Row, Col, Spin, Card, Modal } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useGetAllTasks } from "@src/queries/Tasks";
import { useGetAllEmployees } from "@src/queries/Employees";
import { useAuthContext } from "@src/contexts/auth";
import { TaskStatus } from "@src/types/Tasks/task";
import type { Task } from "@src/types/Tasks/task";
import { useThemeContext } from "@src/contexts/theme";

const TaskHistory = () => {
  const { theme, isDark } = useThemeContext();
  const { user } = useAuthContext();
  const { data: tasks, isLoading: isLoadingTasks } = useGetAllTasks();
  const { data: employees, isLoading: isLoadingEmployees } =
    useGetAllEmployees();
  // Using a custom hook or just checking user role/permissions roughly here
  // Ideally, we'd use useGetPermissions but we need it for the *current* user.
  // Assuming the user object has role or we have a way to check.
  // For now, let's assume if user.e_role is Manager or something they can filter.
  // Or better, checking the `tasks_view_all` permission if available in context or query.

  // Actually, useGetAllTasks *already* filters tasks based on permissions @see Task.getAll in backend.
  // So if the user is a normal user, they only get their own tasks.
  // If they are an admin/manager with view_all, they get all tasks.
  // The filtering UI is only relevant if they have access to multiple people's tasks.

  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTasks, setModalTasks] = useState<Task[]>([]);

  // Filter tasks based on selected employee (if any)
  const filteredTasks = selectedEmployee
    ? tasks?.filter((t) => t.assigned_to === selectedEmployee)
    : tasks;

  const getListData = (value: Dayjs) => {
    return (
      filteredTasks?.filter((task) => {
        // We want to show tasks that were either created on this day, OR due on this day, OR completed on this day?
        // User asked for "tasks i did in each day". This implies tasks that were *completed* (Done) on that day.
        // Let's stick to "Done" tasks and use updated_at (which we assume is completion time for done tasks).
        if (task.t_status === TaskStatus.Done) {
          return dayjs(task.updated_at).isSame(value, "day");
        }
        return false;
      }) || []
    );
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events" style={{ listStyle: "none", padding: 0 }}>
        {listData.map((item) => (
          <li key={item.t_id}>
            <Badge
              status="success"
              text={item.t_title}
              style={{ color: theme.modal?.color }}
            />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (newValue: Dayjs) => {
    setSelectedDate(newValue);
    const dailyTasks = getListData(newValue);
    if (dailyTasks.length > 0) {
      setModalTasks(dailyTasks);
      setIsModalOpen(true);
    }
  };

  const containerStyle = {
    background: theme.container?.background || (isDark ? "#1e293b" : "#fff"),
    padding: 20,
    borderRadius: 8,
    color: theme.modal?.color,
  };

  if (isLoadingTasks || isLoadingEmployees) return <Spin />;

  // Determine if we should show the filter
  // Simple check: do we have tasks assigned to more than one person?
  // Or just always show it if the user list is populated and we have tasks.
  const uniqueAssignees = Array.from(
    new Set(tasks?.map((t) => t.assigned_to).filter(Boolean)),
  );
  const showFilter =
    uniqueAssignees.length > 1 ||
    user?.e_role === "Manager" ||
    user?.e_role === "Admin";

  return (
    <div style={containerStyle}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <h2 style={{ color: theme.title?.color, margin: 0 }}>Task History</h2>
        </Col>
        <Col>
          {showFilter && (
            <Select
              allowClear
              placeholder="Filter by Employee"
              style={{ width: 200 }}
              onChange={setSelectedEmployee}
              dropdownStyle={{ background: theme.modal?.background }}
              options={employees?.map((emp) => ({
                label: `${emp.f_name} ${emp.l_name}`,
                value: emp.e_id,
              }))}
            />
          )}
        </Col>
      </Row>

      <div
        style={{
          background: isDark ? "#141414" : "#fff",
          padding: 20,
          borderRadius: 8,
        }}
      >
        <Calendar cellRender={dateCellRender} onSelect={onSelect} fullscreen />
      </div>

      <Modal
        title={`Tasks Completed on ${selectedDate.format("MMMM D, YYYY")}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {modalTasks.map((task) => (
            <Card key={task.t_id} size="small" title={task.t_title}>
              <p>{task.t_description}</p>
              <p>
                <strong>Priority:</strong> {task.t_priority}
              </p>
              <p>
                <strong>Assigned To:</strong> {task.assignee?.f_name}{" "}
                {task.assignee?.l_name}
              </p>
            </Card>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default TaskHistory;
