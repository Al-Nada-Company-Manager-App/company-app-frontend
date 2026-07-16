import { Table } from "antd";
import ResponsiveList from "@src/components/UI/ResponsiveList";
import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import * as Icons from "lucide-react";
import type { Employee } from "@src/types/Employees/employee";
import type { Theme } from "@src/types/theme";
import EmployeeInfo from "./components/EmployeeInfo";
import { PermissionGuard } from "@src/components/Auth/PermissionGuard";

interface DeactivatedEmployeeTableProps {
  employees: Employee[];
  theme: Theme;
  onActivate?: (employeeId: number) => void;
}

const { Column } = Table;

const DeactivatedEmployeeTable = ({
  employees,
  theme,
  onActivate,
}: DeactivatedEmployeeTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const paginatedEmployees = employees.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const cardsComponent = (
    <div className="flex flex-col gap-4">
      {paginatedEmployees.map((employee) => (
        <EmployeeCard
                key={employee.e_id}
                employee={employee}
                theme={theme}
                action={
                  <PermissionGuard requiredPermission="users_edit">
                    <button
                      className="flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer hover:opacity-70 transition-opacity"
                      onClick={() => onActivate?.(employee.e_id)}
                      style={{
                        backgroundColor: "#01B574",
                        color: "#FFFFFF",
                        border: "none",
                      }}
                    >
                      <Icons.UserCheck size={16} />
                      <span className="text-sm font-medium">Activate</span>
                    </button>
                  </PermissionGuard>
                }
              />
            ))}
      </div>
  );

  const tableComponent = (
    <Table<Employee>
      dataSource={paginatedEmployees}
      pagination={false}
      showHeader={true}
      rowKey="e_id"
      scroll={{ x: 800 }} // Enable horizontal scrolling
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
                <PermissionGuard requiredPermission="users_edit">
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
                </PermissionGuard>
              )}
            />
    </Table>
  );

  return (
    <div className="custom-table">
      <ResponsiveList
        className="custom-table"
        table={tableComponent}
        cards={cardsComponent}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: employees.length,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default DeactivatedEmployeeTable;
