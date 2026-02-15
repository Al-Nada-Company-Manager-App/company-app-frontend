import { Table, Grid } from "antd";
import CustomerCard from "./CustomerCard";
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
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [selectedRow, setSelectedRow] = useState<Customer>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = getCustomerColumns(theme);

  return (
    <>
      <div className="custom-table">
        {!screens.md ? (
          <div className="flex flex-col gap-4">
            {customers.map((customer) => (
              <CustomerCard
                key={customer.c_id}
                customer={customer}
                theme={theme}
                onClick={() => {
                  setSelectedRow(customer);
                  setIsModalVisible(true);
                }}
              />
            ))}
          </div>
        ) : (
          <Table<Customer>
            className="custom-table"
            dataSource={customers}
            showHeader={true}
            pagination={{ pageSize: 10 }}
            rowKey="c_id"
            columns={columns}
            scroll={{ x: 1000 }} // Horizontal scroll for desktop too if allowed
            showSorterTooltip={{ target: "sorter-icon" }}
            onRow={(record) => ({
              onClick: () => {
                setSelectedRow(record);
                setIsModalVisible(true);
              },
            })}
          />
        )}
      </div>
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
