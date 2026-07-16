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
}



const EmployeeTable = ({ employees, theme }: EmployeeTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Employee>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const columns = getEmployeeColumns(theme);
  const paginatedEmployees = employees.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const tableComponent = (
    <Table<Employee>
      dataSource={paginatedEmployees}
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
      {paginatedEmployees.map((employee) => (
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
            total: employees.length,
            onChange: (page) => setCurrentPage(page),
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
