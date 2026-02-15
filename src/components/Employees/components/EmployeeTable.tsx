import { Table, Grid } from "antd";
import EmployeeCard from "./EmployeeCard";
import type { Employee } from "../../../types/Employees/employee";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import EmployeeDetailModal from "./EmployeeDetailModal";
import { getEmployeeColumns } from "./employeeColumns";

interface EmployeeTableProps {
  employees: Employee[];
  theme: Theme;
}

import { useAuthContext } from "@src/contexts/auth";

const EmployeeTable = ({ employees, theme }: EmployeeTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Employee>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useAuthContext();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const columns = getEmployeeColumns(theme);

  return (
    <>
      <div className="custom-table">
        {!screens.md ? (
          <div className="flex flex-col gap-4">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee.e_id}
                employee={employee}
                theme={theme}
                onClick={() => {
                  if (user?.e_id === employee.e_id) return;
                  setSelectedRow(employee);
                  setIsModalVisible(true);
                }}
              />
            ))}
          </div>
        ) : (
          <Table<Employee>
            dataSource={employees}
            showHeader={true}
            pagination={{ pageSize: 10 }}
            rowKey="e_id"
            columns={columns}
            scroll={{ x: 1000 }} // Enable horizontal scrolling
            showSorterTooltip={{ target: "sorter-icon" }}
            onRow={(record) => ({
              onClick: () => {
                if (user?.e_id === record.e_id) return;
                setSelectedRow(record);
                setIsModalVisible(true);
              },
            })}
          />
        )}
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
