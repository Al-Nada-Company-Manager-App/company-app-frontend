import { Table } from "antd";
import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import CustomerDetailModal from "./CustomerDetailModal";
import CustomerInfo from "./components/CustomerInfo";

interface CustomerTableProps {
  customers: Customer[];
  theme: Theme;
}

const { Column } = Table;

const CustomerTable = ({ customers, theme }: CustomerTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Customer>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="custom-table">
        <Table<Customer>
          dataSource={customers}
          showHeader={true}
          pagination={{ pageSize: 10 }}
          rowKey="c_id"
          onRow={(record) => ({
            onClick: () => {
              setSelectedRow(record);
              setIsModalVisible(true);
            },
          })}
        >
          <Column
            title="Customer"
            dataIndex="c_name"
            key="customer"
            render={(_, record: Customer) => (
              <CustomerInfo customer={record} theme={theme} />
            )}
          />
          <Column title="Address" dataIndex="c_address" key="address" />
          <Column title="City" dataIndex="c_city" key="city" />
          <Column title="Country" dataIndex="c_country" key="country" />
          <Column title="Zipcode" dataIndex="c_zipcode" key="zipcode" />
          <Column title="Fax" dataIndex="c_fax" key="fax" />
          <Column title="Phone" dataIndex="c_phone" key="phone" />
        </Table>
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
