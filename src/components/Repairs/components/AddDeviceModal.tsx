import React from "react";
import { Modal, Form, Input, Select, Row, Col, Button } from "antd";
import type { Theme } from "@src/types/theme";
import CustomBtn from "@src/components/UI/customBtn";
import { useAddDevice } from "@src/queries/Devices";
import type { CreateDeviceInput } from "@src/types/Devices/device";

interface AddDeviceModalProps {
  open: boolean;
  onClose: () => void;
  theme: Theme;
}


const AddDeviceModal: React.FC<AddDeviceModalProps> = ({
  open,
  onClose,
  theme,
}) => {
  const [form] = Form.useForm<CreateDeviceInput>();
  const createDevice = useAddDevice();

  const onFinish = async (values: CreateDeviceInput) => {
      await createDevice.mutateAsync(values);
      form.resetFields();
      onClose();
  };

  return (
    <Modal
      centered
      title="Add New Device"
      open={open}
      onCancel={onClose}
      footer={null}
      className="custom-modal"
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-2"
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Product Name"
              name="p_name"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Status"
              name="p_status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select>
                <Select.Option value="Completed">Completed</Select.Option>
                <Select.Option value="Repairing">Repairing</Select.Option>
                <Select.Option value="Pending">Pending</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Serial Number"
              name="serial_number"
              rules={[
                { required: true, message: "Please enter serial number" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <div className="flex justify-end gap-4">
            <Button
              onClick={onClose}
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
              btnTitle="Add"
              onClick={() => form.submit()}
              loading={createDevice.isPending}
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDeviceModal;
