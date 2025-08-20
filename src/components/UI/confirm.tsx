import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import ModalStyle from "./ModalStyle";
import type {EmployeeTheme} from "../../types/Employees/employee";

interface ConfirmProps {
  type?: "default" | "primary" | "dashed" | "link" | "text";
  isdanger?: boolean;
  btnTitle?: string;
  onOk?: () => void;
  onCancel?: () => void;
  className?: string;
  theme: EmployeeTheme;
}
const Confirm = ({ type, isdanger, btnTitle ,onOk,onCancel, className , theme}: ConfirmProps) => {
  const [modal, contextHolder] = Modal.useModal();

  const showConfirm = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to perform this action?",
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
      <ModalStyle theme={theme} />
      {contextHolder}
      <Button type = {type || "primary"} 
        danger={isdanger}
        className={className || "px-6 py-2"}
        onClick={showConfirm}>
        {btnTitle || "Confirm"}
      </Button>
    </>
  );
};

    export default Confirm;