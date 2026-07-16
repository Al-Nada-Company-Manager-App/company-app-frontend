import { Table } from "antd";
import ResponsiveList from "@src/components/UI/ResponsiveList";
import EmployeeCard from "./EmployeeCard";
import type { Employee } from "../../../types/Employees/employee";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import EmployeeDetailModal from "./EmployeeDetailModal";
import { getEmployeeColumns } from "./employeeColumns";

interface EmployeeTableProps {
  employees: Employee[];
  theme: Theme;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
}



const EmployeeTable = ({ employees, theme, total, currentPage, pageSize, onPageChange }: EmployeeTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Employee>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = getEmployeeColumns(theme);

  const tableComponent = (
    <Table<Employee>
      dataSource={employees}
      showHeader={true}
      pagination={false}
      rowKey="e_id"
      columns={columns}
      scroll={{ x: 1000 }} // Enable horizontal scrolling
      showSorterTooltip={{ target: "sorter-icon" }}
      onRow={(record) => ({
        onClick: () => {
          setSelectedRow(record);
          setIsModalVisible(true);
        },
      })}
    />
  );

  const cardsComponent = (
    <div className="flex flex-col gap-4">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.e_id}
          employee={employee}
          theme={theme}
          onClick={() => {
            setSelectedRow(employee);
            setIsModalVisible(true);
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="custom-table">
        <ResponsiveList
          className="custom-table"
          table={tableComponent}
          cards={cardsComponent}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            onChange: onPageChange,
            showSizeChanger: false,
          }}
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
