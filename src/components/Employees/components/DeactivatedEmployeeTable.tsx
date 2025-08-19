import { Table } from "antd";
import * as Icons from "lucide-react";
import type {
  Employee,
  EmployeeTheme,
} from "../../../types/Employees/employee";
import EmployeeInfo from "./EmployeeInfo";

interface DeactivatedEmployeeTableProps {
  employees: Employee[];
  theme: EmployeeTheme;
  onActivate?: (employeeId: number) => void;
}

const { Column } = Table;

const DeactivatedEmployeeTable = ({
  employees,
  theme,
  onActivate,
}: DeactivatedEmployeeTableProps) => {
  return (
    <>
      <style>{`
        .deactivated-table .ant-table {
          background: transparent !important;
        }
        .deactivated-table .ant-table-thead > tr > th {
          background: transparent !important;
          border-bottom: 1px solid ${theme.row.borderColor} !important;
          color: ${theme.headers.color} !important;
          font-size: 10px !important;
          font-weight: 400 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          padding: 12px 16px !important;
        }
        .deactivated-table .ant-table-tbody > tr > td {
          background: transparent !important;
          border-bottom: 1px solid ${theme.row.borderColor} !important;
          color: ${theme.employee.nameColor} !important;
          font-size: 14px !important;
          padding: 16px !important;
        }
        .deactivated-table .ant-table-tbody > tr:hover > td {
          background: ${
            theme.row.hoverBackground || "rgba(108, 121, 239, 0.08)"
          } !important;
          transition: background-color 0.2s ease !important;
        }
        .deactivated-table .ant-table-container {
          border: none !important;
        }
        .deactivated-table .ant-table-content {
          background: transparent !important;
        }
      `}</style>

      <div className="deactivated-table">
        <Table<Employee>
          dataSource={employees}
          pagination={false}
          showHeader={true}
          rowKey="e_id"
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
            title="Action"
            key="action"
            render={(_, record: Employee) => (
              <button
                className="flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => onActivate?.(record.e_id)}
                style={{
                  backgroundColor: "#01B574",
                  color: "#FFFFFF",
                  border: "none",
                }}
              >
                <Icons.UserCheck size={16} />
                <span className="text-sm font-medium">Activate</span>
              </button>
            )}
          />
        </Table>
      </div>
    </>
  );
};

export default DeactivatedEmployeeTable;
