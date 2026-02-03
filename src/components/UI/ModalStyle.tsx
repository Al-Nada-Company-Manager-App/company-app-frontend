import type { Theme } from "@src/types/theme";

const ModalStyle = ({ theme }: { theme: Theme }) => {
  return (
    <style>{`
      .custom-modal .ant-modal-content {
        background: ${theme?.modal?.background} !important;
        color: ${theme?.modal?.color} !important;
        border-radius: 18px !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
        border: none !important;
        padding: 0 !important;
        backdrop-filter: blur(30px) !important;
        -webkit-backdrop-filter: blur(30px) !important;
      }
      
      /* Regular Modal Header Styles */
      .custom-modal .ant-modal-header {
        background: transparent !important;
        border-bottom: 1px solid ${
          theme?.row?.borderColor || "#eee"
        } !important;
        border-radius: 18px 18px 0 0 !important;
        padding: 24px 32px 12px 32px !important;
      }
      .custom-modal .ant-modal-title {
        color: ${theme?.modal?.color || "#222"} !important;
        font-size: 22px !important;
        font-weight: 700 !important;
        letter-spacing: 0.03em !important;
      }
      .custom-modal .ant-modal-close {
        top: 24px !important;
        right: 32px !important;
      }
      .custom-modal .ant-modal-close-x {
        color: ${theme?.modal?.color || "#222"} !important;
        font-size: 20px !important;
      }
      
      /* Modal Body */
      .custom-modal .ant-modal-body {
        padding: 32px !important;
      }
      
      /* Confirm Dialog Specific Styles */
      .custom-modal .ant-modal-confirm-body {
        padding: 10px !important;
        display: flex !important;
        align-items: flex-start !important;
      }
      
      /* Confirm Dialog Icon */
      .custom-modal .ant-modal-confirm-body .ant-modal-confirm-body-wrapper .anticon {
        color: ${theme?.modal?.iconColor || "#faad14"} !important;
        font-size: 22px !important;
        margin-right: 16px !important;
        margin-top: 2px !important;
      }
      
      /* Confirm Dialog Title */
      .custom-modal .ant-modal-confirm-title {
        color: ${theme?.modal?.color || "#222"} !important;
        font-size: 20px !important;
        font-weight: 600 !important;
        margin-bottom: 8px !important;
        line-height: 1.4 !important;
      }
      
      /* Confirm Dialog Content/Description */
      .custom-modal .ant-modal-confirm-content {
        color: ${
          theme?.modal?.contentColor || theme?.modal?.color || "#666"
        } !important;
        font-size: 15px !important;
        line-height: 1.5 !important;
        margin-top: 8px !important;
      }
      
      /* Confirm Dialog Footer */
      .custom-modal .ant-modal-confirm-btns {
        margin-top: 10px !important;
        text-align: right !important;
      }
      
      /* Confirm Dialog Buttons */
      .custom-modal .ant-modal-confirm-btns .ant-btn {
        margin-left: 8px !important;
        border-radius: 8px !important;
        font-weight: 500 !important;
        padding: 8px 16px !important;
        height: auto !important;
      }
      
      /* Cancel Button */
      .custom-modal .ant-modal-confirm-btns .ant-btn-default {
        background: ${theme?.modal?.cancelButtonBg || "transparent"} !important;
        color: ${
          theme?.modal?.cancelButtonColor || theme?.modal?.color || "#666"
        } !important;
        border: 1px solid ${
          theme?.modal?.cancelButtonBorder ||
          theme?.row?.borderColor ||
          "#d9d9d9"
        } !important;
      }
      
      .custom-modal .ant-modal-confirm-btns .ant-btn-default:hover {
        background: ${
          theme?.modal?.cancelButtonHoverBg || "#f5f5f5"
        } !important;
        color: ${
          theme?.modal?.cancelButtonHoverColor || theme?.modal?.color || "#333"
        } !important;
        border-color: ${
          theme?.modal?.cancelButtonHoverBorder || "#b7eb8f"
        } !important;
      }
      
      /* Confirm Button (Primary) */
      .custom-modal .ant-modal-confirm-btns .ant-btn-primary {
        background: ${theme?.modal?.confirmButtonBg || "#1890ff"} !important;
        color: ${theme?.modal?.confirmButtonColor || "#fff"} !important;
        border: 1px solid ${
          theme?.modal?.confirmButtonBg || "#1890ff"
        } !important;
      }
      
      .custom-modal .ant-modal-confirm-btns .ant-btn-primary:hover {
        background: ${
          theme?.modal?.confirmButtonHoverBg || "#40a9ff"
        } !important;
        color: ${theme?.modal?.confirmButtonHoverColor || "#fff"} !important;
        border-color: ${
          theme?.modal?.confirmButtonHoverBg || "#40a9ff"
        } !important;
      }
      
      /* Description styles for regular modals */
      .custom-modal .ant-descriptions-bordered .ant-descriptions-item-label {
        background: transparent !important;
        color: ${theme?.modal?.color || "#444"} !important;
        font-weight: 600 !important;
        font-size: 14px !important;
      }
      .custom-modal .ant-descriptions-bordered .ant-descriptions-item-content {
        background: transparent !important;
        color: ${theme?.employee?.nameColor || "#222"} !important;
        font-size: 15px !important;
      }

      /* Form Styles */
      .custom-modal .ant-form-item {
        margin-bottom: 16px !important;
        background: ${theme?.modal?.background || "#fff"} !important;
        color: ${theme?.modal?.color || "#222"} !important;
        border-radius: 8px !important;
        padding: 4px 0 !important;
      }
      
      .custom-modal .ant-form-item-label > label {
        color: ${theme?.modal?.color || "#222"} !important;
        font-weight: 500 !important;
        font-size: 14px !important;
      }
      
      /* Input Fields */
      .custom-modal .ant-input,
      .custom-modal .ant-select-selector,
      .custom-modal .ant-picker {
        border-radius: 8px !important;
        border: 1px solid ${theme?.row?.borderColor || "#d9d9d9"} !important;
        background: ${theme?.modal?.background || "#fff"} !important;
        color: ${theme?.modal?.color || "#222"} !important;
        font-size: 14px !important;
        padding: 8px 12px !important;
        transition: all 0.2s ease !important;
      }
      
      .custom-modal .ant-input:hover,
      .custom-modal .ant-select-selector:hover,
      .custom-modal .ant-picker:hover {
        border-color: ${theme?.button?.background || "#6C79F7"} !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
      }
      
      .custom-modal .ant-input:focus,
      .custom-modal .ant-select-focused .ant-select-selector,
      .custom-modal .ant-picker-focused {
        border-color: ${theme?.button?.hoverBackground || "#5A67D8"} !important;
        box-shadow: 0 0 0 2px rgba(108,121,239,0.2) !important;
      }

      /* Password Input Wrapper */
      .custom-modal .ant-input-affix-wrapper {
        border-radius: 8px !important;
        border: 1px solid ${theme?.row?.borderColor || "#d9d9d9"} !important;
        background: ${theme?.modal?.background || "#fff"} !important;
        color: ${theme?.modal?.color || "#222"} !important;
        font-size: 14px !important;
        padding: 8px 12px !important;
        transition: all 0.2s ease !important;
      }

      .custom-modal .ant-input-affix-wrapper:hover {
        border-color: ${theme?.button?.background || "#6C79F7"} !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
      }

      .custom-modal .ant-input-affix-wrapper-focused {
        border-color: ${theme?.button?.hoverBackground || "#5A67D8"} !important;
        box-shadow: 0 0 0 2px rgba(108,121,239,0.2) !important;
      }

      /* Password Input Field Inside Wrapper */
      .custom-modal .ant-input-affix-wrapper .ant-input {
        border: none !important;
        background: transparent !important;
        color: ${theme?.modal?.color || "#222"} !important;
        padding: 0 !important;
        box-shadow: none !important;
      }

      .custom-modal .ant-input-affix-wrapper .ant-input:focus {
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
      }

      /* Password Input Prefix (Lock Icon) */
      .custom-modal .ant-input-prefix {
        color: ${theme?.employee?.emailColor || "#A0AEC0"} !important;
        font-size: 14px !important;
        margin-right: 8px !important;
      }

      .custom-modal .ant-input-prefix .anticon {
        color: ${theme?.employee?.emailColor || "#A0AEC0"} !important;
      }

      /* Password Input Suffix (Eye Icon) */
      .custom-modal .ant-input-suffix {
        color: ${theme?.employee?.emailColor || "#A0AEC0"} !important;
        font-size: 14px !important;
        margin-left: 8px !important;
      }

      .custom-modal .ant-input-suffix .anticon {
        color: ${theme?.employee?.emailColor || "#A0AEC0"} !important;
        cursor: pointer !important;
        transition: color 0.2s ease !important;
      }

      .custom-modal .ant-input-suffix .anticon:hover {
        color: ${theme?.button?.background || "#6C79F7"} !important;
      }

      /* Password Icon Specific */
      .custom-modal .ant-input-password-icon {
        color: ${theme?.employee?.emailColor || "#A0AEC0"} !important;
        cursor: pointer !important;
        transition: color 0.2s ease !important;
      }

      .custom-modal .ant-input-password-icon:hover {
        color: ${theme?.button?.background || "#6C79F7"} !important;
      }

      /* Form Item Control */
      .custom-modal .ant-form-item-control {
        line-height: 1.5715 !important;
      }

      .custom-modal .ant-form-item-control-input {
        position: relative !important;
        display: flex !important;
        align-items: center !important;
        min-height: 40px !important;
      }

      .custom-modal .ant-form-item-control-input-content {
        flex: auto !important;
        max-width: 100% !important;
      }

      /* Outlined Input Styles */
      .custom-modal .ant-input-outlined,
      .custom-modal .ant-input-affix-wrapper.ant-input-outlined {
        background: ${theme?.modal?.background || "#fff"} !important;
        border: 1px solid ${theme?.row?.borderColor || "#d9d9d9"} !important;
        border-radius: 8px !important;
      }

      .custom-modal .ant-input-outlined:hover,
      .custom-modal .ant-input-affix-wrapper.ant-input-outlined:hover {
        border-color: ${theme?.button?.background || "#6C79F7"} !important;
      }

      .custom-modal .ant-input-outlined:focus,
      .custom-modal .ant-input-affix-wrapper.ant-input-outlined:focus-within {
        border-color: ${theme?.button?.hoverBackground || "#5A67D8"} !important;
        box-shadow: 0 0 0 2px rgba(108,121,239,0.2) !important;
      }
      
      /* Input Number (Salary) Specific Styles */
      .custom-modal .ant-input-affix-wrapper {
          border-radius: 8px !important;
          border: 1px solid ${theme?.row?.borderColor || "#d9d9d9"} !important;
          padding: 8px 12px !important;
            }
      .custom-modal .ant-input-number {
          border-radius: 8px !important;
          border: 1px solid ${theme?.row?.borderColor || "#d9d9d9"} !important;
        }
      .custom-modal .ant-input-number-input {
        background: ${theme?.modal?.background || "#fff"} !important;
        color: ${theme?.modal?.color} !important;
        font-size: 14px !important;
      }
      .custom-modal .ant-input-prefix {
        color: ${
          theme?.modal?.color || "#222"
        } !important; /* Use modal color for $ prefix */
        font-size: 14px !important;
        margin-right: 8px !important;
      }
      .custom-modal .ant-input-number:hover,
      .custom-modal .ant-input-affix-wrapper:hover {
        border-color: ${theme?.button?.background || "#6C79F7"} !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
          }
      .custom-modal .ant-input-number:focus,
      .custom-modal .ant-input-affix-wrapper:focus {
        border-color: ${theme?.button?.hoverBackground || "#5A67D8"} !important;
        box-shadow: 0 0 0 2px rgba(108,121,239,0.2) !important;
          }
      
      /* Placeholder Styles */
      .custom-modal .ant-input::placeholder,
      .custom-modal .ant-input-number-input::placeholder,
      .custom-modal .ant-picker-input > input::placeholder {
        color: ${theme?.employee?.emailColor || "#A0AEC0"} !important;
        font-size: 14px !important;
      }
      
      /* Select Dropdown */
      .custom-modal .ant-select-dropdown {
        background: ${theme?.modal?.background || "#fff"} !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
        border: 1px solid ${theme?.row?.borderColor || "#d9d9d9"} !important;
      }
      
      .custom-modal .ant-select-item {
        color: ${theme?.modal?.color || "#222"} !important;
        font-size: 14px !important;
        padding: 8px 12px !important;
        transition: all 0.2s ease !important;
      }
      
      .custom-modal .ant-select-item-option-active {
        background: ${
          theme?.row?.hoverBackground || "rgba(108,121,239,0.08)"
        } !important;
      }
      
      .custom-modal .ant-select-item-option-selected {
        background: ${theme?.button?.background || "#6C79F7"} !important;
        color: ${theme?.button?.color || "#fff"} !important;
        font-weight: 500 !important;
      }
      
      /* Date Picker Dropdown */
      .custom-modal .ant-picker-dropdown {
        background: ${theme?.modal?.background || "#fff"} !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
        border: 1px solid ${theme?.row?.borderColor || "#d9d9d9"} !important;
      }
      
      .custom-modal .ant-picker-panel-container {
        background: ${theme?.modal?.background || "#fff"} !important;
      }
      
      .custom-modal .ant-picker-header {
        border-bottom: 1px solid ${
          theme?.row?.borderColor || "#d9d9d9"
        } !important;
        color: ${theme?.modal?.color || "#222"} !important;
      }
      
      .custom-modal .ant-picker-header button {
        color: ${theme?.employee?.emailColor || "#A0AEC0"} !important;
      }
      
      .custom-modal .ant-picker-header button:hover {
        color: ${theme?.button?.background || "#6C79F7"} !important;
      }
      
      .custom-modal .ant-picker-cell {
        color: ${theme?.modal?.color || "#222"} !important;
      }
      
      .custom-modal .ant-picker-cell:hover:not(.ant-picker-cell-disabled) {
        background: ${
          theme?.row?.hoverBackground || "rgba(108,121,239,0.08)"
        } !important;
      }
      
      .custom-modal .ant-picker-cell-in-view.ant-picker-cell-selected {
        background: ${theme?.button?.background || "#6C79F7"} !important;
        color: ${theme?.button?.color || "#fff"} !important;
      }
      
      .custom-modal .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before {
        border-color: ${theme?.button?.background || "#6C79F7"} !important;
      }
      

      
      /* Upload Button */
      .custom-modal .ant-upload .ant-btn {
        border-radius: 8px !important;
        border: 1px solid ${theme?.row?.borderColor || "#d9d9d9"} !important;
        color: ${theme?.modal?.color || "#222"} !important;
        background: ${theme?.modal?.background || "#fff"} !important;
        padding: 8px 16px !important;
        font-size: 14px !important;
        transition: all 0.2s ease !important;
      }
      
      .custom-modal .ant-upload .ant-btn:hover {
        border-color: ${theme?.button?.background || "#6C79F7"} !important;
        color: ${theme?.button?.color || "#fff"} !important;
        background: ${theme?.button?.background || "#6C79F7"} !important;
      }
      
      /* Form Buttons */
      .custom-modal .ant-form-item .ant-btn {
        border-radius: 8px !important;
        padding: 8px 24px !important;
        font-weight: 500 !important;
        font-size: 14px !important;
        height: auto !important;
      }
      
      .custom-modal .ant-form-item .ant-btn-default {
        background: ${theme?.modal?.cancelButtonBg || "transparent"} !important;
        color: ${theme?.modal?.cancelButtonColor || "#666"} !important;
        border: 1px solid ${
          theme?.modal?.cancelButtonBorder || "#d9d9d9"
        } !important;
      }
      
      .custom-modal .ant-form-item .ant-btn-default:hover {
        background: ${
          theme?.modal?.cancelButtonHoverBg || "#f5f5f5"
        } !important;
        color: ${theme?.modal?.cancelButtonHoverColor || "#333"} !important;
        border-color: ${
          theme?.modal?.cancelButtonHoverBorder || "#b7eb8f"
        } !important;
      }
      
      .custom-modal .ant-form-item .ant-btn-primary {
        background: ${theme?.button?.background || "#6C79F7"} !important;
        color: ${theme?.button?.color || "#fff"} !important;
        border: none !important;
      }
      
      .custom-modal .ant-form-item .ant-btn-primary:hover {
        background: ${theme?.button?.hoverBackground || "#5A67D8"} !important;
        color: ${theme?.button?.hoverColor || "#fff"} !important;
      }
      
      /* Error Messages */
      .custom-modal .ant-form-item-explain-error {
        color: ${theme?.modal?.iconColor || "#ff4d4f"} !important;
        font-size: 12px !important;
        margin-top: 4px !important;
      }
      /* Switch */
      .custom-modal .ant-switch-checked {
        background: ${"#01B574"} !important;
      }

      /* Card inside Modal */
      .custom-modal .ant-card {
        background: ${theme?.modal?.background || "#fff"} !important;
        border: 1px solid ${theme?.row?.borderColor || "#d9d9d9"} !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
      }
      .custom-modal .ant-card-head {
        border-bottom: 1px solid ${
          theme?.row?.borderColor || "#eee"
        } !important;
        background: transparent !important;
        border-radius: 12px 12px 0 0 !important;
        padding: 16px 24px !important;
      }
      .custom-modal .ant-card-head-title {
        color: ${theme?.modal?.color || "#222"} !important;
        font-size: 16px !important;
        font
        weight: 600 !important;
      }
      .custom-modal .ant-card-body {
        padding: 16px 24px !important;
      }
      .custom-modal .ant-card-bordered {
        border: 1px solid ${theme?.row?.borderColor || "#d9d9d9"} !important;
      }
      .custom-modal .ant-card-hoverable:hover {
        box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
      }
      .custom-modal .ant-divider-inner-text{
        color: ${theme?.modal?.color || "#222"} !important;
      }
     
        /* Input Number Fields */
      .custom-modal .ant-input-number {
        border-radius: 8px !important;
        border: 1px solid var(--modal-border, ${
          theme?.row?.borderColor || "#d9d9d9"
        }) !important;
        background: ${theme?.modal?.background || "#fff"} !important;
        color: ${theme?.modal?.color || "#222"} !important;
        font-size: 14px !important;
        padding: 4px 12px !important;
        transition: all 0.2s ease !important;
      }
      
      .custom-modal .ant-input-number:hover {
        border-color: ${theme?.button?.background || "#6C79F7"} !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
      }
      
      .custom-modal .ant-input-number-focused {
        border-color: ${theme?.button?.hoverBackground || "#5A67D8"} !important;
        box-shadow: 0 0 0 2px rgba(108,121,239,0.2) !important;
      }
      
      .custom-modal .ant-input-number-input {
        background: transparent !important;
        color: ${theme?.modal?.color || "#222"} !important;
        font-size: 14px !important;
      }
        
      /* Checkbox Styles */
      .custom-modal .ant-checkbox-wrapper {
        color: ${theme?.modal?.color || "#222"} !important;
      }
      .custom-modal .ant-checkbox-inner {
        background-color: ${theme?.modal?.background || "#fff"} !important;
        border-color: ${theme?.row?.borderColor || "#d9d9d9"} !important;
      }
      .custom-modal .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${theme?.button?.background || "#1890ff"} !important;
        border-color: ${theme?.button?.background || "#1890ff"} !important;
      }
        
    `}</style>
  );
};

export default ModalStyle;
