import { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Button, Row, Col } from "antd";
import { useCreateTask, useUpdateTask } from "@src/queries/Tasks";
import { useGetAllEmployees } from "@src/queries/Employees";
import type { Task } from "@src/types/Tasks/task";
import { TaskPriority, TaskStatus } from "@src/types/Tasks/task";
import type { Theme } from "@src/types/theme";
import moment from "moment";
import { useAuthContext } from "@src/contexts/auth";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null; // If provided, we are editing
  theme: Theme;
}

const { Option } = Select;
const { TextArea } = Input;

const TaskModal = ({ isOpen, onClose, task, theme }: TaskModalProps) => {
  const [form] = Form.useForm();
  // const { user } = useAuthContext(); // Removed unused user variable

  // Queries
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const { data: employees } = useGetAllEmployees();

  // Reset form when modal opens or task changes
  useEffect(() => {
    if (isOpen) {
      if (task) {
        form.setFieldsValue({
          t_title: task.t_title,
          t_description: task.t_description,
          t_priority: task.t_priority,
          t_status: task.t_status,
          due_date: task.due_date ? moment(task.due_date) : null,
          assigned_to: task.assigned_to,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          t_priority: TaskPriority.Medium,
          t_status: TaskStatus.Idle,
        });
      }
    }
  }, [isOpen, task, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const taskData = {
        ...values,
        due_date: values.due_date ? values.due_date.format("YYYY-MM-DD") : null,
      };

      if (task) {
        await updateTaskMutation.mutateAsync({ id: task.t_id, data: taskData });
      } else {
        await createTaskMutation.mutateAsync(taskData);
      }
      onClose();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const modalStyles = {
    content: {
      background: theme.modal?.background || "#fff",
      color: theme.modal?.color || "#000",
    },
    header: {
      marginBottom: 20,
      borderBottom: `1px solid ${theme.row?.borderColor || "#eee"}`,
      paddingBottom: 10,
    },
    input: {
      background: "transparent",
      color: theme.modal?.color || "#000",
      borderColor: theme.row?.borderColor || "#d9d9d9",
    },
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      className="custom-modal"
      style={{ top: 20 }}
      styles={{ content: { background: modalStyles.content.background } }}
    >
      <div style={modalStyles.header}>
        <h2 style={{ margin: 0, color: modalStyles.content.color }}>
          {task ? "Edit Task" : "Create New Task"}
        </h2>
      </div>

      <Form form={form} layout="vertical">
        <Form.Item
          name="t_title"
          label={
            <span style={{ color: modalStyles.content.color }}>Title</span>
          }
          rules={[{ required: true, message: "Please enter task title" }]}
        >
          <Input placeholder="Task Title" style={modalStyles.input} />
        </Form.Item>

        <Form.Item
          name="t_description"
          label={
            <span style={{ color: modalStyles.content.color }}>
              Description
            </span>
          }
        >
          <TextArea
            rows={4}
            placeholder="Task Description"
            style={{ ...modalStyles.input, resize: "none" }}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="t_priority"
              label={
                <span style={{ color: modalStyles.content.color }}>
                  Priority
                </span>
              }
              initialValue={TaskPriority.Medium}
            >
              <Select
                style={{ width: "100%" }}
                dropdownStyle={{ background: theme.modal?.background }}
              >
                {Object.values(TaskPriority).map((priority) => (
                  <Option key={priority} value={priority}>
                    <span
                      style={{
                        color:
                          priority === "High" || priority === "Critical"
                            ? "red"
                            : "inherit",
                      }}
                    >
                      {priority}
                    </span>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="t_status"
              label={
                <span style={{ color: modalStyles.content.color }}>Status</span>
              }
              initialValue={TaskStatus.Idle}
            >
              <Select
                style={{ width: "100%" }}
                disabled={!task}
                dropdownStyle={{ background: theme.modal?.background }}
              >
                {Object.values(TaskStatus).map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="due_date"
              label={
                <span style={{ color: modalStyles.content.color }}>
                  Due Date
                </span>
              }
            >
              <DatePicker style={{ width: "100%", ...modalStyles.input }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="assigned_to"
              label={
                <span style={{ color: modalStyles.content.color }}>
                  Assign To
                </span>
              }
            >
              <Select
                placeholder="Select Employee"
                showSearch
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                dropdownStyle={{ background: theme.modal?.background }}
              >
                {employees?.map((emp) => (
                  <Option key={emp.e_id} value={emp.e_id}>
                    {emp.f_name} {emp.l_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Button
            onClick={onClose}
            style={{
              background: theme.modal?.cancelButtonBg,
              color: theme.modal?.cancelButtonColor,
              border: theme.modal?.cancelButtonBorder,
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={
              createTaskMutation.isPending || updateTaskMutation.isPending
            }
            style={{
              background: theme.button?.background,
              color: theme.button?.color,
            }}
          >
            {task ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TaskModal;
