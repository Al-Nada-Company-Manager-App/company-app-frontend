import type { EmployeeTheme } from "@src/types/Employees/employee";

const TableStyle = ({ theme }: { theme: EmployeeTheme }) => {
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
          color: ${theme.employee.nameColor || "#222"} !important;
          border-radius: 6px !important;
          border: 1px solid ${theme.row.borderColor || "#d9d9d9"} !important;
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





      `}</style>
  );
};

export default TableStyle;
