import { Table } from "antd";
import type { Supplier } from "@src/types/Suppliers/supplier";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
// import SupplierDetailModal from "./SupplierDetailModal";
import SupplierInfo from "./components/SupplierInfo";

interface SupplierTableProps {
  suppliers: Supplier[];
  theme: Theme;
}

const { Column } = Table;

const SupplierTable = ({ suppliers, theme }: SupplierTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Supplier>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="custom-table">
        <Table<Supplier>
          dataSource={suppliers}
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
            title="Employee"
            dataIndex="c_name"
            key="supplier"
            render={(_, record: Supplier) => (
              <SupplierInfo supplier={record} theme={theme} />
            )}
          />
          <Column title="Address" dataIndex="s_address" key="address" />
          <Column title="City" dataIndex="s_city" key="city" />
          <Column title="Country" dataIndex="s_country" key="country" />
          <Column title="Zipcode" dataIndex="s_zipcode" key="zipcode" />
          <Column title="Fax" dataIndex="s_fax" key="fax" />
          <Column title="Phone" dataIndex="s_phone" key="phone" />
        </Table>
      </div>
      {/* <SupplierDetailModal
        modalOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        supplier={selectedRow}
        theme={theme}
      /> */}
    </>
  );
};

export default SupplierTable;
