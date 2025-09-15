import { Table } from "antd";
import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import CustomerDetailModal from "./CustomerDetailModal";
import { getCustomerColumns } from "./customerColumns";

interface CustomerTableProps {
  customers: Customer[];
  theme: Theme;
}

const CustomerTable = ({ customers, theme }: CustomerTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Customer>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = getCustomerColumns(theme);

  return (
    <>
        <Table<Customer>
          className="custom-table"
          dataSource={customers}
          showHeader={true}
          pagination={{ pageSize: 10 }}
          rowKey="c_id"
          columns={columns}
          showSorterTooltip={{ target: "sorter-icon" }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedRow(record);
              setIsModalVisible(true);
            },
          })}
        />
      <CustomerDetailModal
        modalOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        customer={selectedRow}
        theme={theme}
      />
    </>
  );
};

export default CustomerTable;
