import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Button,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CustomBtn from "@src/components/UI/customBtn";
import { useThemeContext } from "@src/contexts/theme";
import type { Theme } from "@src/types/theme";
import { useGetAllDevices } from "@src/queries/Devices";
import { useSpareParts } from "@src/queries/SpareParts";
import { useCreateRepair } from "@src/queries/Repairs";
import type {SparePart, SelectedSparePart} from "@src/types/SpareParts/sparePart";
import type { Device } from "@src/types/Devices/device";
import type { CreateRepairInput } from "@src/types/Repairs/repair";

const { Option } = Select;

interface AddRepairModalProps {
  open: boolean;
  onClose: () => void;
  theme: Theme;
}

const AddRepairModal: React.FC<AddRepairModalProps> = ({
  open,
  onClose,
  theme,
}) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const [selectedSpareParts, setSelectedSpareParts] = useState<SelectedSparePart[]>([]);
  const [selectedDeviceStatus, setSelectedDeviceStatus] = useState<string | null>(null);

  // queries
  const { data: devices = [] } = useGetAllDevices();
  const { data: spareParts = [] } = useSpareParts();
  const createRepair = useCreateRepair(isDark);

  const onAddSparePart = () => {
    setSelectedSpareParts([
      ...selectedSpareParts,
      { sp_id: null, sp_quantity: 0 },
    ]);
  };

  const handleSpareChange = (
    index: number,
    field: keyof SelectedSparePart,
    value: number | null
  ) => {
    const updated = [...selectedSpareParts];
    updated[index][field] = value as never;
    setSelectedSpareParts(updated);
  };

  const handleDeviceChange = (deviceId: number) => {
    const selectedDevice = devices.find(
      (device: Device) => device.p_id === deviceId
    );
    if (selectedDevice) {
      setSelectedDeviceStatus(selectedDevice.p_status);
    }
  };

const onFinish = async (values: {
  p_id: number;
  remarks: string;
  rep_date?: string;
}) => {
  const payload: CreateRepairInput = {
    p_id: values.p_id,
    remarks: values.remarks || "",
    rep_date:
      selectedDeviceStatus === "Completed" && values.rep_date
        ? values.rep_date
        : "",
    spare_parts: selectedSpareParts
      .filter((part) => part.sp_id && part.sp_quantity > 0)
      .map((part) => ({
        sp_id: part.sp_id!,
        sp_quantity: part.sp_quantity,
      })),
  };

    await createRepair.mutateAsync(payload);
    form.resetFields();
    setSelectedSpareParts([]);
    setSelectedDeviceStatus(null);
    onClose();
  
};


  return (
    <Modal
      centered
      title="Add New Repair Process"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      className="custom-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-2"
      >
        <Row gutter={[16, 16]}>
          {/* Device Selection */}
          <Col span={12}>
            <Form.Item
              name="p_id"
              label="Device Under Maintenance"
              rules={[{ required: true, message: "Please select a device!" }]}
            >
              <Select
                placeholder="Select a device"
                onChange={handleDeviceChange}
              >
                {devices.map((device: Device) => (
                  <Option key={device.p_id} value={device.p_id}>
                    {device.p_name} - {device.serial_number}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Remarks */}
          <Col span={12}>
            <Form.Item name="remarks" label="Repair Remarks">
              <Input.TextArea placeholder="Enter remarks about the repair" />
            </Form.Item>
          </Col>
        </Row>

        {/* Conditionally show Repair Date */}
        {selectedDeviceStatus === "Completed" && (
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="rep_date"
                label="Repair Date"
                rules={[
                  { required: true, message: "Please select a repair date!" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        )}

        {/* Spare Parts Section */}
        <div>
          <h4 className="mb-2">Spare Parts</h4>
          {selectedSpareParts.map((part, index) => (
            <Row gutter={[16, 16]} key={index} style={{ marginBottom: "10px" }}>
              <Col span={16}>
                <Select
                  placeholder="Select Spare Part"
                  style={{ width: "100%" }}
                  onChange={(value) => handleSpareChange(index, "sp_id", value)}
                  value={part.sp_id ?? undefined}
                >
                  {spareParts.map((sp: SparePart) => (
                    <Option key={sp.p_id} value={sp.p_id}>
                      {sp.p_name} (Available: {sp.p_quantity})
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <InputNumber
                  min={1}
                  placeholder="Quantity"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    handleSpareChange(index, "sp_quantity", value ?? 0)
                  }
                  value={part.sp_quantity}
                />
              </Col>
            </Row>
          ))}

          <Button
            type="dashed"
            onClick={onAddSparePart}
            block
            icon={<PlusOutlined />}
          >
            Add Spare Part
          </Button>
        </div>

        {/* Actions */}
        <Form.Item>
          <div className="flex justify-end gap-4 mt-6">
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
              btnTitle="Submit"
              onClick={() => form.submit()}
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRepairModal;
