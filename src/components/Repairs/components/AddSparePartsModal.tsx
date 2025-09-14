import { useEffect, useState } from "react";
import { Modal, Select, InputNumber, Button, Form } from "antd";
import { useSpareParts } from "@src/queries/SpareParts";
import { useUpdateRepair } from "@src/queries/Repairs";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/useThemeContext";
import type { Repair } from "@src/types/Repairs/repair";
import CustomBtn from "@src/components/UI/customBtn";

interface AddSparepartsModalProps {
  modalOpen: boolean;
  onClose: () => void;
  repair: Repair;
  theme: Theme;
}

const AddSparepartsModal = ({
  modalOpen,
  onClose,
  repair,
  theme,
}: AddSparepartsModalProps) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const { data: spareParts = [] } = useSpareParts();
  const updateRepair = useUpdateRepair(isDark);

  const [selectedSpId, setSelectedSpId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!modalOpen) {
      form.resetFields();
      setSelectedSpId(null);
      setQuantity(1);
    }
  }, [modalOpen, form]);

  const onFinish = async () => {
    if (!selectedSpId || quantity < 1) return;

    const selectedPart = spareParts.find((sp) => sp.p_id === selectedSpId);
    if (!selectedPart) return;

    if (selectedPart.p_quantity < quantity) {
      // handle with themed message (e.g., Not enough stock available)
      return;
    }

    try {
      await updateRepair.mutateAsync({
        id: repair.rep_id,
        data: {
          p_id: repair.stock.p_id,
          remarks: repair.remarks,
          p_status: repair.stock.p_status,
          rep_date: repair.rep_date,
          spare_parts: [
            ...(repair.repair_process?.map((sp) => ({
              sp_id: sp.sp_id, // use repair_process sp_id
              sp_quantity: sp.sp_quantity, // already the used quantity
            })) || []),
            { sp_id: selectedSpId, sp_quantity: quantity }, // new part
          ],
        },
      });

      onClose();
    } catch (error) {
      console.error("Failed to add spare part", error);
    }
  };


  return (
    <Modal
      title="Add Spare Part"
      centered
      open={modalOpen}
      onCancel={onClose}
      footer={null}
      className="custom-modal"
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-2"
      >
        {/* Spare Part Selector */}
        <Form.Item label="Select Spare Part" required>
          <Select
            placeholder="Select Spare Part"
            value={selectedSpId ?? undefined}
            onChange={(val) => setSelectedSpId(val)}
          >
            {spareParts.map((sp) => (
              <Select.Option key={sp.p_id} value={sp.p_id}>
                {sp.p_name} (Available: {sp.p_quantity})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Quantity Input */}
        <Form.Item label="Quantity" required>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(val) => setQuantity(val ?? 1)}
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Buttons */}
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

export default AddSparepartsModal;
