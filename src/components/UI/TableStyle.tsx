import type { Theme } from "@src/types/theme";

const TableStyle = ({ theme }: { theme: Theme }) => {
  return (
    <style>{`
        .custom-table .ant-table {
          background: transparent !important;
        }
        .custom-table .ant-table-thead > tr > th {
          background: transparent !important;
          border-bottom: 1px solid ${theme.row.borderColor} !important;
          color: ${theme.headers.color} !important;
          font-size: 10px !important;
          font-weight: 400 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          padding: 12px 16px !important;
        }
        .custom-table .ant-table-tbody > tr > td {
          background: transparent !important;
          border-bottom: 1px solid ${theme.row.borderColor} !important;
          color: ${theme.employee.nameColor} !important;
          font-size: 14px !important;
          padding: 16px !important;
        }
        .custom-table .ant-table-tbody > tr:hover > td {
          background: ${
            theme.row.hoverBackground || "rgba(108, 121, 239, 0.08)"
          } !important;
          transition: background-color 0.2s ease !important;
        }
        .custom-table .ant-table-container {
          border: none !important;
        }
        .custom-table .ant-table-content {
          background: transparent !important;
        }
        .custom-table .ant-table-placeholder {
          background: transparent !important; /* Same as others */
          border-bottom: 1px solid ${theme.row.borderColor} !important;
        }

        .custom-table .ant-empty-description {
          color: ${
            theme.employee.nameColor
          } !important; /* or another theme color */
          font-size: 14px !important;
        }
        .custom-table .ant-empty-image svg path {
           fill: ${
             theme.employee.nameColor
           } !important; /* Or any theme color */
          opacity: 0.8; /* Optional: make it slightly softer */
        }

        .custom-table .ant-pagination {
          background: transparent !important;
          color: ${theme.employee.nameColor || "#222"} !important;
        }
        .custom-table .ant-pagination-item {
          background: transparent !important;
          color: ${theme.employee.nameColor || "#FFF"} !important;
          border-radius: 6px !important;
          border: 1px solid ${theme.row.borderColor || "#d9d9d9"} !important;
        }
        .custom-table .ant-pagination-item  a {
          background: transparent !important;
          color: ${theme.employee.nameColor || "#FFF"} !important;
        }
        .custom-table .ant-pagination-item-active {
          color: ${theme.button.color || "#fff"} !important;
          border-color: ${theme.button.background || "#6C79F7"} !important;
        }
        
        .custom-table .ant-pagination-prev,
        .custom-table .ant-pagination-next {
          background: transparent !important;
          color: ${theme.employee.nameColor || "#222"} !important;
        }
        .custom-table .ant-pagination-item-link {
          color: ${theme.employee.nameColor || "#222"} !important;
          border-radius: 6px !important;
        }
        .custom-table .ant-pagination-disabled .ant-pagination-item-link {
          color: #A0AEC0 !important;
          background: transparent !important;
        }
        
       .custom-table .ant-table-thead > tr > th {
          background: transparent !important;
          color: ${theme.title.color || "#000"} !important;
        }

        .custom-table .ant-select-selector{
           display: none !important;
        }

        .custom-table .ant-table-column-sorter-inner{
          color: ${theme.employee.nameColor || "#222"} !important;
        }

        .custom-table .ant-table-column-sorter-up.active,
        .custom-table .ant-table-column-sorter-down.active {
          color: ${theme.button.background || "#6C79F7"} !important;
        }

        .custom-table .ant-table-column-sorter-up,
        .custom-table .ant-table-column-sorter-down {
          color: ${theme.employee.nameColor || "#222"} !important;
        }
        
        .custom-table .ant-table-filter-column {
          color: ${theme.employee.nameColor || "#222"} !important;
        }

        .custom-table .ant-table-column-title {
          color: ${
            theme.headers.color || theme.title.color || "#000"
          } !important;
          font-size: 10px !important;
          font-weight: 400 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }

        .custom-table .ant-dropdown-trigger {
          color: ${theme.employee.nameColor || "#222"} !important;
        }

        .custom-table .ant-table-filter-trigger {
          background: transparent !important;
          border: none !important;
          color: ${theme.employee.nameColor || "#222"} !important;
          opacity: 0.7 !important;
          transition: opacity 0.2s ease !important;
        }

        .custom-table .ant-table-filter-trigger:hover {
          opacity: 1 !important;
          color: ${theme.button?.background || "#6C79F7"} !important;
        }

        .custom-table .ant-table-filter-trigger.active {
          color: ${theme.button?.background || "#6C79F7"} !important;
          opacity: 1 !important;
        }

        .custom-table .anticon-filter {
          color: inherit !important;
        }

        .custom-table .anticon-filter svg {
          color: inherit !important;
          fill: currentColor !important;
        }
          
        .custom-table .ant-table-filter-trigger-container {
          color: ${theme.employee.nameColor || "#222"} !important;
        }
        
        .custom-table .ant-table-filter-dropdown {
          background: ${theme.modal?.background || "#fff"} !important;
          color: ${theme.employee.nameColor || "#222"} !important;
          border: 1px solid ${theme.row.borderColor || "#E2E8F0"} !important;
        }
        
        .custom-table .ant-table-filter-dropdown .ant-input {
          background: ${theme.modal?.background || "#fff"} !important;
          color: ${theme.employee.nameColor || "#222"} !important;
          border: 1px solid ${theme.row.borderColor || "#E2E8F0"} !important;
        }
        
        .custom-table .ant-table-filter-dropdown .ant-input::placeholder {
          color: ${theme.employee.nameColor || "#222"} !important;
          opacity: 0.6 !important;
        }
        
        .custom-table .ant-table-filter-dropdown .ant-btn-primary {
          background: ${theme.button?.background || "#6C79F7"} !important;
          color: ${theme.button?.color || "#fff"} !important;
          border: none !important;
        }
        
        .custom-table .ant-table-filter-dropdown .ant-btn {
          background: ${theme.modal?.background || "#fff"} !important;
          color: ${theme.employee.nameColor || "#222"} !important;
          border: 1px solid ${theme.row.borderColor || "#E2E8F0"} !important;
        }
        
        .custom-table .ant-table-filter-dropdown .ant-btn:hover {
          border-color: ${theme.button?.background || "#6C79F7"} !important;
          color: ${theme.button?.background || "#6C79F7"} !important;
        }





      `}</style>
  );
};

export default TableStyle;
