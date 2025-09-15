import { useEffect, useState } from "react";
import { Modal, Select, InputNumber, Button, Form } from "antd";
import { useSpareParts } from "@src/queries/SpareParts";
import { useUpdateRepair } from "@src/queries/Repairs";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/theme";
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
      return;
    }

    // Merge existing spare parts quantities
    const currentSpareParts =
      repair.repair_process?.reduce((acc, sp) => {
        acc[sp.sp_id] = (acc[sp.sp_id] || 0) + sp.sp_quantity;
        return acc;
      }, {} as Record<number, number>) || {};

    // Add or increment the selected spare part
    currentSpareParts[selectedSpId] =
      (currentSpareParts[selectedSpId] || 0) + quantity;

    // Convert back to array format for UpdateRepairInput
    const spare_parts = Object.entries(currentSpareParts).map(
      ([sp_id, sp_quantity]) => ({
        sp_id: +sp_id,
        sp_quantity,
      })
    );

    try {
      await updateRepair.mutateAsync({
        id: repair.rep_id,
        data: {
          p_id: repair.stock.p_id,
          remarks: repair.remarks,
          p_status: repair.stock.p_status,
          rep_date: repair.rep_date,
          spare_parts,
        },
      });

      onClose();
    } catch (error) {
      console.error("Failed to add spare part", error);
    }
  };

  // Filter spare parts to only show those with p_quantity > 0
  const filteredSpareParts = spareParts.filter((sp) => sp.p_quantity > 0);

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
        <Form.Item label="Select Spare Part" required>
          <Select
            placeholder="Select Spare Part"
            value={selectedSpId ?? undefined}
            onChange={(val) => setSelectedSpId(val)}
          >
            {filteredSpareParts.map((sp) => (
              <Select.Option key={sp.p_id} value={sp.p_id}>
                {sp.p_name} (Available: {sp.p_quantity})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Quantity" required>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(val) => setQuantity(val ?? 1)}
            style={{ width: "100%" }}
          />
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

export default AddSparepartsModal;
