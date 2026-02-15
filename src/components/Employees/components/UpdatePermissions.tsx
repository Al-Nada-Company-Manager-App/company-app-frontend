import { Modal, Form, Switch, Row, Col, Button, Typography, Spin } from "antd";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/theme";

import {
  useGetPermissions,
  useUpdatePermissions,
} from "@src/queries/Employees";
import { useState, useEffect } from "react";

const { Title } = Typography;

interface UpdatePermissionsModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  employeeId: number;
}

const categories = [
  {
    title: "Users",
    fields: [
      { name: "users_page", label: "Page Access" },
      { name: "users_add", label: "Add" },
      { name: "users_edit", label: "Edit" },
      { name: "users_delete", label: "Delete" },
      { name: "users_view", label: "View" },
    ],
  },
  {
    title: "Products",
    fields: [
      { name: "products_page", label: "Page Access" },
      { name: "products_add", label: "Add" },
      { name: "products_edit", label: "Edit" },
      { name: "products_delete", label: "Delete" },
      { name: "products_view", label: "View" },
    ],
  },
  {
    title: "Repaire",
    fields: [
      { name: "repaire_page", label: "Page Access" },
      { name: "repaire_add", label: "Add" },
      { name: "repaire_edit", label: "Edit" },
      { name: "repaire_delete", label: "Delete" },
      { name: "repaire_view", label: "View" },
      { name: "repaire_adddum", label: "Add Dum" },
    ],
  },
  {
    title: "Sales",
    fields: [
      { name: "sales_page", label: "Page Access" },
      { name: "sales_add", label: "Add" },
      { name: "sales_edit", label: "Edit" },
      { name: "sales_delete", label: "Delete" },
      { name: "sales_view", label: "View" },
    ],
  },
  {
    title: "Price",
    fields: [
      { name: "price_page", label: "Page Access" },
      { name: "price_add", label: "Add" },
      { name: "price_edit", label: "Edit" },
      { name: "price_delete", label: "Delete" },
      { name: "price_view", label: "View" },
    ],
  },
  {
    title: "Debts",
    fields: [
      { name: "debts_page", label: "Page Access" },
      { name: "debts_add", label: "Add" },
      { name: "debts_edit", label: "Edit" },
      { name: "debts_delete", label: "Delete" },
      { name: "debts_view", label: "View" },
    ],
  },
  {
    title: "Purchase",
    fields: [
      { name: "purchase_page", label: "Page Access" },
      { name: "purchase_add", label: "Add" },
      { name: "purchase_edit", label: "Edit" },
      { name: "purchase_delete", label: "Delete" },
      { name: "purchase_view", label: "View" },
    ],
  },
  {
    title: "Customer",
    fields: [
      { name: "customer_page", label: "Page Access" },
      { name: "customer_add", label: "Add" },
      { name: "customer_edit", label: "Edit" },
      { name: "customer_delete", label: "Delete" },
      { name: "customer_view", label: "View" },
    ],
  },
  {
    title: "Supplier",
    fields: [
      { name: "supplier_page", label: "Page Access" },
      { name: "supplier_add", label: "Add" },
      { name: "supplier_edit", label: "Edit" },
      { name: "supplier_delete", label: "Delete" },
      { name: "supplier_view", label: "View" },
    ],
  },
  {
    title: "Tasks",
    fields: [
      { name: "tasks_page", label: "Page Access" },
      { name: "tasks_add", label: "Add" },
      { name: "tasks_edit", label: "Edit" },
      { name: "tasks_delete", label: "Delete" },
      { name: "tasks_view", label: "View" },
      { name: "tasks_view_all", label: "View All" },
    ],
  },
];

const UpdatePermissionsModal = ({
  modalOpen,
  onClose,
  theme,
  employeeId,
}: UpdatePermissionsModalProps) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const [isDirty, setIsDirty] = useState(false);

  const { data: permissions, isLoading } = useGetPermissions(employeeId, {
    enabled: modalOpen && !!employeeId,
  });

  const updatePermissions = useUpdatePermissions(isDark);

  useEffect(() => {
    if (modalOpen && permissions) {
      form.setFieldsValue(permissions);
      setIsDirty(false);
    }
  }, [modalOpen, permissions, form]);

  const onFinish = async () => {
    const values = form.getFieldsValue();
    await updatePermissions.mutateAsync({ id: employeeId, ...values });
    onClose();
  };

  const handleValuesChange = () => {
    setIsDirty(true);
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Update Permissions"
        open={modalOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={1200}
      >
        {isLoading ? (
          <Spin tip="Loading permissions..." />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onValuesChange={handleValuesChange}
          >
            <Row gutter={[12, 12]}>
              {categories.map((cat) => (
                <Col span={8} key={cat.title}>
                  <div
                    style={{
                      border: `1px solid ${theme.row?.borderColor}`,
                      padding: "10px",
                      borderRadius: "8px",
                      background: theme.modal?.background,
                    }}
                  >
                    <Title
                      level={4}
                      style={{
                        color: theme.modal?.color,
                        marginBottom: "5px",
                        fontSize: "16px",
                      }}
                    >
                      {cat.title}
                    </Title>
                    <Row gutter={[8, 8]}>
                      {cat.fields.map((field) => (
                        <Col span={8} key={field.name}>
                          <Form.Item
                            name={field.name}
                            label={field.label}
                            valuePropName="checked"
                            style={{ marginBottom: "2px", padding: 0 }}
                          >
                            <Switch size="default" />
                          </Form.Item>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Col>
              ))}
            </Row>
            <Form.Item>
              <div className="flex justify-end gap-4 mt-4">
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
                {isDirty && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    style={{
                      background: theme.button?.background,
                      color: theme.button?.color,
                    }}
                  >
                    Update
                  </Button>
                )}
              </div>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdatePermissionsModal;
