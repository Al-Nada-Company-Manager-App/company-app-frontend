import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Modal, Form, Input, Select, DatePicker, Button, Row, Col } from "antd";
import { useCreateTask, useUpdateTask } from "@src/queries/Tasks";
import { useGetAllEmployees } from "@src/queries/Employees";
import { useGetAllCustomers } from "@src/queries/Customers/customerQueries";
import { usePermission } from "@src/hooks/usePermission";
import { useAuthContext } from "@src/contexts/auth";
import type { Task } from "@src/types/Tasks/task";
import { TaskPriority, TaskStatus, TaskType } from "@src/types/Tasks/task";
import TaskCustomerSelectModal from "./TaskCustomerSelectModal";
import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";
import moment from "moment";

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
  const { hasPermission } = usePermission();
  const { user } = useAuthContext();
  
  // Queries
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [debouncedEmployeeSearch, setDebouncedEmployeeSearch] = useState("");
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [debouncedCustomerSearch, setDebouncedCustomerSearch] = useState("");
  const [selectedTaskType, setSelectedTaskType] = useState<TaskType | string>(TaskType.General);
  const [showCustomerSelect, setShowCustomerSelect] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedEmployeeSearch(employeeSearchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [employeeSearchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCustomerSearch(customerSearchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [customerSearchTerm]);

  const queryClient = useQueryClient();
  const { data: paginatedEmployees } = useGetAllEmployees(1, 10000, debouncedEmployeeSearch);
  const employees = paginatedEmployees?.data;
  
  const { data: paginatedCustomers } = useGetAllCustomers({ page: 1, limit: 10000, search: debouncedCustomerSearch });
  const customers = paginatedCustomers?.data;

  // Reset form when modal opens or task changes
  useEffect(() => {
    if (isOpen) {
      if (task) {
        setSelectedTaskType(task.t_type || TaskType.General);
        form.setFieldsValue({
          t_title: task.t_title,
          t_description: task.t_description,
          t_priority: task.t_priority,
          t_status: task.t_status,
          due_date: task.due_date ? moment(task.due_date) : null,
          assigned_to: task.assigned_to,
          t_type: task.t_type || TaskType.General,
          c_ids: task.c_ids,
        });
        if (task.customers) {
          setSelectedCustomers(task.customers as unknown as Customer[]);
          form.setFieldsValue({ c_ids: task.customers.map(c => c.c_id) });
        } else {
          setSelectedCustomers([]);
        }
      } else {
        setSelectedTaskType(TaskType.General);
        form.resetFields();
        setSelectedCustomers([]);
        form.setFieldsValue({
          t_priority: TaskPriority.Medium,
          t_status: TaskStatus.Idle,
          t_type: TaskType.General,
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
        assigned_to: hasPermission("tasks_assign") ? values.assigned_to : user?.e_id,
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
    <>
      <Modal forceRender
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

        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="t_type"
              label={<span style={{ color: modalStyles.content.color }}>Task Type</span>}
              initialValue={TaskType.General}
            >
              <Select
                style={{ width: "100%" }}
                onChange={(value) => {
                  setSelectedTaskType(value);
                  form.setFieldsValue({ t_type: value });
                }}
                dropdownStyle={{ background: theme.modal?.background }}
              >
                {Object.values(TaskType).map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {(selectedTaskType === TaskType.VisitContact) && (
            
            <Col span={12}>
              <Form.Item label={<span style={{ color: modalStyles.content.color }}>Customer</span>}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Button 
                    onClick={() => setShowCustomerSelect(true)}
                    style={{ ...modalStyles.input, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                  >
                    {selectedCustomers.length > 0 ? selectedCustomers.map(c => c.c_name).join(', ') : "Select Customers"}
                  </Button>
                  {selectedCustomers.length > 0 && (
                    <Button danger type="text" onClick={() => {
                      setSelectedCustomers([]);
                      form.setFieldsValue({ c_ids: [] });
                    }}>
                      Clear
                    </Button>
                  )}
                </div>
                {/* Hidden input to store c_id for form submission */}
                <Form.Item name="c_ids" noStyle>
                  <Input type="hidden" />
                </Form.Item>
              </Form.Item>
            </Col>

          )}
        </Row>

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
          {hasPermission("tasks_assign") && (
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
                  onSearch={setEmployeeSearchTerm}
                  filterOption={false}
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
        )}
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

      <TaskCustomerSelectModal
        isOpen={showCustomerSelect}
        onClose={() => setShowCustomerSelect(false)}
        onSelect={(customers) => {
          setSelectedCustomers(customers);
          form.setFieldsValue({ c_ids: customers.map(c => c.c_id) });
        }}
        selectedCustomerIds={selectedCustomers.map(c => c.c_id)}
        onUnvisit={async (c_id) => {
          try {
            await fetch(`http://localhost:4000/tasks/unvisit/${c_id}`, { 
              method: 'POST', 
              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
            });
            queryClient.invalidateQueries({ queryKey: ["customers"] });
          } catch (err) {}
        }}
        onClearAllVisits={async () => {
          try {
            await fetch('http://localhost:4000/tasks/clear-visits', { 
              method: 'POST', 
              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
            });
            queryClient.invalidateQueries({ queryKey: ["customers"] });
          } catch (err) {}
        }}
        customers={customers || []}
        loading={!customers}
        theme={theme}
        searchTerm={customerSearchTerm}
        setSearchTerm={setCustomerSearchTerm}
      />
    </>
  );
};

export default TaskModal;
