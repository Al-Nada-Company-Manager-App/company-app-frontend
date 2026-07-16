import { Table } from "antd";
import ResponsiveList from "@src/components/UI/ResponsiveList";
import SupplierCard from "./SupplierCard";
import type { Supplier } from "@src/types/Suppliers/supplier";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import SupplierDetailModal from "./SupplierDetailModal";
import { getSupplierColumns } from "./supplierColumns";

interface SupplierTableProps {
  suppliers: Supplier[];
  theme: Theme;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
}

const SupplierTable = ({ suppliers, theme, total, currentPage, pageSize, onPageChange }: SupplierTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Supplier>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = getSupplierColumns(theme);

  const tableComponent = (
    <Table<Supplier>
      className="custom-table"
      dataSource={suppliers}
      showHeader={true}
      pagination={false}
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
  );

  const cardsComponent = (
    <div className="flex flex-col gap-4">
      {suppliers.map((supplier) => (
        <SupplierCard
          key={supplier.s_id}
          supplier={supplier}
          theme={theme}
          onClick={() => {
            setSelectedRow(supplier);
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
            showSizeChanger: true,
          }}
        />
      </div>
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
