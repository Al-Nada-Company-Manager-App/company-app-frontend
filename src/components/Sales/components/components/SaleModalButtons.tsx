import { Button } from "antd";
import CustomBtn from "@src/components/UI/customBtn";
import type { Theme } from "@src/types/theme";

interface SaleModalButtonsProps {
  theme: Theme;
  onClose: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

const SaleModalButtons = ({
  theme,
  onClose,
  onSubmit,
  isLoading,
}: SaleModalButtonsProps) => {
  return (
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
        btnTitle="Create Sale"
        onClick={onSubmit}
        loading={isLoading}
      />
    </div>
  );
};

export default SaleModalButtons;
