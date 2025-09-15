import { Table } from "antd";
import type { Supplier } from "@src/types/Suppliers/supplier";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import SupplierDetailModal from "./SupplierDetailModal";
import { getSupplierColumns } from "./supplierColumns";

interface SupplierTableProps {
  suppliers: Supplier[];
  theme: Theme;
}

const SupplierTable = ({ suppliers, theme }: SupplierTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Supplier>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = getSupplierColumns(theme);

  return (
    <>
        <Table<Supplier>
          className="custom-table"
          dataSource={suppliers}
          showHeader={true}
          pagination={{ pageSize: 10 }}
          rowKey="s_id"
          columns={columns}
          showSorterTooltip={{ target: "sorter-icon" }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedRow(record);
              setIsModalVisible(true);
            },
          })}
        />
      <SupplierDetailModal
        modalOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        supplier={selectedRow}
        theme={theme}
      />
    </>
  );
};

export default SupplierTable;
