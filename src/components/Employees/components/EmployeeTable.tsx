import { Table } from "antd";
import type {
  Employee,
  EmployeeTheme,
} from "../../../types/Employees/employee";
import EmployeeInfo from "./EmployeeInfo";
import EmployeeRole from "./EmployeeRole";
import StatusBadge from "./StatusBadge";
import EmployeeDate from "./EmployeeDate";
import { useState } from "react";
import EmployeeDetailModal from "./EmployeeDetailModal";

interface EmployeeTableProps {
  employees: Employee[];
  theme: EmployeeTheme;
}

const { Column } = Table;

const EmployeeTable = ({ employees, theme }: EmployeeTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Employee>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
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
        .deactivated-table .ant-table-placeholder {
          background: transparent !important; /* Same as others */
          border-bottom: 1px solid ${theme.row.borderColor} !important;
        }

        .deactivated-table .ant-empty-description {
          color: ${
            theme.employee.nameColor
          } !important; /* or another theme color */
          font-size: 14px !important;
        }
        .deactivated-table .ant-empty-image svg path {
           fill: ${
             theme.employee.nameColor
           } !important; /* Or any theme color */
          opacity: 0.8; /* Optional: make it slightly softer */
        }
      `}</style>

      <div className="custom-table">
        <Table<Employee>
          dataSource={employees}
          pagination={false}
          showHeader={true}
          rowKey="e_id"
          onRow={(record) => ({
            onClick: () => {
              setSelectedRow(record);
              setIsModalVisible(true);
            },
          })}
        >
          <Column
            title="Employee"
            dataIndex="f_name"
            key="employee"
            render={(_, record: Employee) => (
              <EmployeeInfo employee={record} theme={theme} />
            )}
          />
          <Column
            title="FUNCTION"
            dataIndex="e_role"
            key="function"
            render={(_, record: Employee) => (
              <EmployeeRole employee={record} theme={theme} />
            )}
          />
          <Column
            title="STATUS"
            dataIndex="e_active"
            key="status"
            render={(active: boolean) => (
              <StatusBadge isActive={active} theme={theme} />
            )}
          />
          <Column
            title="EMPLOYED"
            dataIndex="birth_date"
            key="employed"
            render={(date: string) => (
              <EmployeeDate date={date} theme={theme} />
            )}
          />
        </Table>
      </div>
      <EmployeeDetailModal
        modalOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        employee={selectedRow}
        theme={theme}
      />
    </>
  );
};

export default EmployeeTable;
