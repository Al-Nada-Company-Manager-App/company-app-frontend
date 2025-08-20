
import type { EmployeeTheme } from "../../types/Employees/employee";

const ModalStyle = ({ theme }: { theme: EmployeeTheme }) => {
  return (
    <style>{`
         .custom-employee-modal .ant-modal-content {
            background: ${theme?.modal?.background} !important;
            color: ${theme?.modal?.color} !important;
            border-radius: 18px !important;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
            border: none !important;
            padding: 0 !important;
            backdrop-filter: blur(30px) !important; // or use theme.backdropFilter
            -webkit-backdrop-filter: blur(30px) !important;
        }
        .custom-employee-modal .ant-modal-header {
          background: transparent !important;
          border-bottom: 1px solid ${
            theme?.row?.borderColor || "#eee"
          } !important;
          border-radius: 18px 18px 0 0 !important;
          padding: 24px 32px 12px 32px !important;
        }
        .custom-employee-modal .ant-modal-title {
          color: ${theme?.modal?.color || "#222"} !important;
          font-size: 22px !important;
          font-weight: 700 !important;
          letter-spacing: 0.03em !important;
        }
        .custom-employee-modal .ant-modal-close {
          top: 24px !important;
          right: 32px !important;
        }
        .custom-employee-modal .ant-modal-close-x {
          color: ${theme?.modal?.color || "#222"} !important;
          font-size: 20px !important;
        }
        .custom-employee-modal .ant-modal-body {
          padding: 32px !important;
        }
        .custom-employee-modal .ant-descriptions-bordered .ant-descriptions-item-label {
          background: transparent !important;
          color: ${theme?.modal?.color || "#444"} !important;
          font-weight: 600 !important;
          font-size: 14px !important;
        }
        .custom-employee-modal .ant-descriptions-bordered .ant-descriptions-item-content {
          background: transparent !important;
          color: ${theme?.employee?.nameColor || "#222"} !important;
          font-size: 15px !important;
        }
      `}</style>
  );
};

export default ModalStyle;