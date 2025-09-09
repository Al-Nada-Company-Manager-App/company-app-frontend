import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import ModalStyle from "./ModalStyle";
import type { Theme } from "@src/types/theme";

interface ConfirmProps {
  type?: "default" | "primary" | "dashed" | "link" | "text";
  isdanger?: boolean;
  btnTitle?: string;
  onOk?: () => void;
  onCancel?: () => void;
  className?: string;
  theme: Theme;
}
const Confirm = ({
  type,
  isdanger,
  btnTitle,
  onOk,
  onCancel,
  className,
  theme,
}: ConfirmProps) => {
  const [modal, contextHolder] = Modal.useModal();

  const showConfirm = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to perform this action?",
      className: "custom-modal",
      okText: "Confirm",
      cancelText: "Cancel",
      centered: true,
      onOk: () => {
        if (onOk) {
          onOk();
        }
      },
      onCancel: () => {
        if (onCancel) {
          onCancel();
        }
      },
    });
  };

  return (
    <>
      {contextHolder}
      <Button
        type={type || "primary"}
        danger={isdanger}
        className={className || "px-6 py-2"}
        style={{
          color: theme.button?.color || "#fff",
          boxShadow: theme.button?.boxShadow,
          borderRadius: theme.button?.borderRadius,
          fontWeight: theme.button?.fontWeight,
          fontSize: theme.button?.fontSize,
          padding: theme.button?.padding,
          transition: theme.button?.transition,
          border: theme.button?.border,
        }}
        onClick={showConfirm}
      >
        {btnTitle || "Confirm"}
      </Button>
    </>
  );
};

export default Confirm;
