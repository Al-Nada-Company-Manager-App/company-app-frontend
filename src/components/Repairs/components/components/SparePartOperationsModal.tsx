import { useState, useEffect } from "react";
import { Modal, Form, InputNumber, Button, Space } from "antd";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/theme";
import { useUpdateRepair } from "@src/queries/Repairs";
import type {
  Repair,
  RepairProcess,
  UpdateRepairInput,
} from "@src/types/Repairs/repair";
import ConfirmBtn from "@src/components/UI/confirm";
import { useThemedMessage } from "@src/hooks/useThemedMessage";

interface SparePartOperationsModalProps {
  modalOpen: boolean;
  onClose: () => void;
  repair: Repair;
  selectedSparePart: RepairProcess;
  theme: Theme;
}

const SparePartOperationsModal = ({
  modalOpen,
  onClose,
  repair,
  selectedSparePart,
  theme,
}: SparePartOperationsModalProps) => {
  const { isDark } = useThemeContext();
  const { showSuccessMessage, showErrorMessage } = useThemedMessage(isDark);
  const updateRepair = useUpdateRepair(isDark);
  const [form] = Form.useForm();
  const [showEditQuantity, setShowEditQuantity] = useState(false);
  const [quantity, setQuantity] = useState(selectedSparePart?.sp_quantity);

  useEffect(() => {
    if (modalOpen) {
      setQuantity(selectedSparePart?.sp_quantity);
      setShowEditQuantity(false);
    }
  }, [modalOpen, selectedSparePart]);

  const handleUpdateQuantity = async () => {
    if (quantity < 1) {
      showErrorMessage("Quantity must be at least 1.");
      return;
    }

    const updatedSpareParts = repair.repair_process.map((sp) =>
      sp.sp_id === selectedSparePart.sp_id
        ? { sp_id: sp.sp_id, sp_quantity: quantity }
        : { sp_id: sp.sp_id, sp_quantity: sp.sp_quantity }
    );

    const payload: UpdateRepairInput = {
      p_id: repair.stock.p_id,
      remarks: repair.remarks,
      p_status: repair.stock.p_status,
      rep_date: repair.rep_date,
      spare_parts: updatedSpareParts,
    };

    try {
      await updateRepair.mutateAsync({
        id: repair.rep_id,
        data: payload,
      });
      showSuccessMessage("Spare part quantity updated successfully!");
      onClose();
    } catch {
      showErrorMessage("Failed to update spare part quantity.");
    }
  };

  const handleDelete = async () => {
    const updatedSpareParts = repair.repair_process
      .filter((sp) => sp.sp_id !== selectedSparePart.sp_id)
      .map((sp) => ({ sp_id: sp.sp_id, sp_quantity: sp.sp_quantity }));

    const payload: UpdateRepairInput = {
      p_id: repair?.stock.p_id,
      remarks: repair?.remarks,
      p_status: repair?.stock.p_status,
      rep_date: repair?.rep_date,
      spare_parts: updatedSpareParts,
    };

    try {
      await updateRepair.mutateAsync({
        id: repair.rep_id,
        data: payload,
      });
      showSuccessMessage("Spare part deleted successfully!");
      onClose();
    } catch {
      showErrorMessage("Failed to delete spare part.");
    }
  };

  return (
    <Modal
      title="Spare Part Operations"
      centered
      open={modalOpen}
      onCancel={onClose}
      footer={null}
      className="custom-modal"
      width={600}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button
          style={{ width: "100%" }}
          type="primary"
          onClick={() => setShowEditQuantity(true)}
          iconPosition="start"
        >
          Edit Spare Part Quantity
        </Button>

        {showEditQuantity && (
          <Form form={form} layout="vertical">
            <Form.Item label="Quantity" required>
              <InputNumber
                min={1}
                value={quantity}
                onChange={(val) => setQuantity(val ?? 1)}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Button
              type="primary"
              onClick={handleUpdateQuantity}
              style={{ width: "100%" }}
            >
              Save
            </Button>
          </Form>
        )}

        <ConfirmBtn
          type="primary"
          isdanger={true}
          btnTitle="Delete Spare Part"
          onOk={() => handleDelete()}
          onCancel={() => {
            console.log("Delete cancelled");
          }}
          className="w-full"
          theme={theme}
        />
      </Space>
    </Modal>
  );
};

export default SparePartOperationsModal;
