import { Table } from "antd";
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

  const columns = getEmployeeColumns(theme);

  return (
    <>
      <div className="custom-table">
        <Table<Employee>
          dataSource={employees}
          showHeader={true}
          pagination={{ pageSize: 10 }}
          rowKey="e_id"
          columns={columns}
          showSorterTooltip={{ target: "sorter-icon" }}
          onRow={(record) => ({
            onClick: () => {
              if (user?.e_id === record.e_id) return;
              setSelectedRow(record);
              setIsModalVisible(true);
            },
          })}
        />
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
