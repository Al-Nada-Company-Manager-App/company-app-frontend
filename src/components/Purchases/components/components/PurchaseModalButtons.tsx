import { Button, Space } from "antd";

interface PurchaseModalButtonsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
  submitText?: string;
}

const PurchaseModalButtons = ({
  onCancel,
  isSubmitting = false,
  submitText = "Create Purchase",
}: PurchaseModalButtonsProps) => {
  return (
    <div style={{ textAlign: "right", marginTop: 16 }}>
      <Space>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {submitText}
        </Button>
      </Space>
    </div>
  );
};

export default PurchaseModalButtons;
