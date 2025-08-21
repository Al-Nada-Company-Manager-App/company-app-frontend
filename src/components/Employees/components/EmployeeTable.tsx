import { Table } from "antd";
import type {
  Employee,
} from "../../../types/Employees/employee";
import type { Theme } from "@src/types/theme";
import EmployeeInfo from "./components/EmployeeInfo";
import EmployeeRole from "./components/EmployeeRole";
import StatusBadge from "./components/StatusBadge";
import EmployeeDate from "./components/EmployeeDate";
import { useState } from "react";
import EmployeeDetailModal from "./EmployeeDetailModal";

interface EmployeeTableProps {
  employees: Employee[];
  theme: Theme;
}

const { Column } = Table;

const EmployeeTable = ({ employees, theme }: EmployeeTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Employee>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="custom-table">
        <Table<Employee>
          dataSource={employees}
          showHeader={true}
          pagination={{ pageSize: 10 }}
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
            render={() => <StatusBadge theme={theme} />}
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
