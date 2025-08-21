import { Table } from "antd";
import * as Icons from "lucide-react";
import type { Employee, EmployeeTheme } from "@src/types/Employees/employee";
import EmployeeInfo from "./components/EmployeeInfo";

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
      <div className="custom-table">
        <Table<Employee>
          dataSource={employees}
          pagination={{ pageSize: 10 }}
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
