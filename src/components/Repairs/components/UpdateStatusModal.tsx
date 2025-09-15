import { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Row, Col, Button } from "antd";
import CustomBtn from "@src/components/UI/customBtn";
import type { Theme } from "@src/types/theme";
import { useUpdateRepair } from "@src/queries/Repairs";
import type { Repair, UpdateRepairInput } from "@src/types/Repairs/repair";
import { useThemeContext } from "@src/contexts/theme";
import dayjs from "dayjs";

interface UpdateStatusModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  repair?: Repair;
}

const UpdateStatusModal = ({
  modalOpen,
  onClose,
  repair,
  theme,
}: UpdateStatusModalProps) => {
  const [form] = Form.useForm();
  const { isDark } = useThemeContext();
  const [selectedDeviceStatus, setSelectedDeviceStatus] = useState<
    string | null
  >(null);

  const updateRepair = useUpdateRepair(isDark);

  useEffect(() => {
    if (repair) {
      form.setFieldsValue({
        p_status: repair.stock?.p_status,
        remarks: repair.remarks,
        rep_date: repair.rep_date ? dayjs(repair.rep_date) : null,
      });
    }
  }, [repair, form]);

  const onFinish = async (values: UpdateRepairInput) => {
    console.log("Form Values:", values);
    console.log("Repair Object:", repair);
    if (!repair?.stock?.p_id || !repair?.rep_id) {
      console.error("Repair ID or Stock ID is missing");
      return;
    }

    const payload: UpdateRepairInput = {
      p_id: repair.stock.p_id,
      p_status: values.p_status,
      remarks: values.remarks,
      rep_date: values.rep_date
        ? dayjs(values.rep_date).format("YYYY-MM-DD")
        : undefined,
    };

    try {
      await updateRepair.mutateAsync(
        { id: repair.rep_id, data: payload },
        {
          onSuccess: () => {
            // ✅ Reset form & close modal
            form.resetFields();
            onClose();
          },
        }
      );
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <Modal
      title="Edit Status & Remarks"
      open={modalOpen}
      onCancel={onClose}
      footer={null}
      centered
      className="custom-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-2"
      >
        <Form.Item
          label="Status"
          name="p_status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select
            onChange={(val) => setSelectedDeviceStatus(val)}
            placeholder="Select status"
          >
            <Select.Option value="Completed">Completed</Select.Option>
            <Select.Option value="Repairing">Repairing</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
          </Select>
        </Form.Item>

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

        <Form.Item name="remarks" label="Repair Remarks">
          <Input.TextArea placeholder="Enter remarks about the repair" />
        </Form.Item>

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

export default UpdateStatusModal;
