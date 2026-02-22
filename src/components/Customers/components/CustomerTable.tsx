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
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const CustomerTable = ({
  customers,
  theme,
  total,
  currentPage,
  pageSize,
  onPageChange,
  loading,
}: CustomerTableProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = getCustomerColumns(theme);

  const handleRowClick = (customerId: number) => {
    setSelectedCustomerId(customerId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCustomerId(null);
  };

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
                onClick={() => handleRowClick(customer.c_id)}
              />
            ))}
          </div>
        ) : (
          <Table<Customer>
            className="custom-table"
            dataSource={customers}
            showHeader={true}
            loading={loading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              onChange: onPageChange,
              showSizeChanger: false,
            }}
            rowKey="c_id"
            columns={columns}
            scroll={{ x: 1000 }}
            showSorterTooltip={{ target: "sorter-icon" }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record.c_id),
            })}
          />
        )}
      </div>
      <CustomerDetailModal
        modalOpen={isModalVisible}
        onClose={handleModalClose}
        customerId={selectedCustomerId}
        theme={theme}
      />
    </>
  );
};

export default CustomerTable;
