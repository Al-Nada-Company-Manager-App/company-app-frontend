import { Modal, Form, Input, Button } from "antd";
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import CustomBtn from "@src/components/UI/customBtn";

interface ChangePasswordModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordModal = ({
  modalOpen,
  onClose,
  theme,
}: ChangePasswordModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: PasswordFormValues) => {
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For now, just simulate a successful password change
      console.log("Password changed successfully:", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      // Show success message (you can add a notification here)
      alert("Password changed successfully!");

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateConfirmPassword = ({
    getFieldValue,
  }: {
    getFieldValue: (name: string) => string;
  }) => ({
    validator(_: unknown, value: string) {
      if (!value || getFieldValue("newPassword") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The two passwords do not match!"));
    },
  });

  return (
    <Modal
      className="custom-modal"
      title={
        <div className="flex items-center gap-2">
          <LockOutlined />
          Change Password
        </div>
      }
      open={modalOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "100%", marginTop: "20px" }}
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Please enter your current password",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter current password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please enter your new password",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters long",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Please confirm your new password",
            },
            validateConfirmPassword,
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item style={{ marginTop: "30px", marginBottom: 0 }}>
          <div className="flex justify-end gap-4">
            <Button
              onClick={onClose}
              disabled={loading}
              style={{
                background: theme.modal?.cancelButtonBg,
                color: theme.modal?.cancelButtonColor,
                boxShadow: theme.button?.boxShadow,
                borderRadius: theme.button?.borderRadius,
                fontWeight: theme.button?.fontWeight,
                fontSize: theme.button?.fontSize,
                padding: theme.button?.padding,
                transition: theme.button?.transition,
                border: theme.button?.border,
              }}
            >
              Cancel
            </Button>
            <CustomBtn
              theme={theme}
              btnTitle={loading ? "Changing..." : "Change Password"}
              onClick={() => form.submit()}
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
