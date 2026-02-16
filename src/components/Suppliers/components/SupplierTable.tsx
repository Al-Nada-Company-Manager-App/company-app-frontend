import { Table, Grid } from "antd";
import SupplierCard from "./SupplierCard";
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
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [selectedRow, setSelectedRow] = useState<Supplier>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = getSupplierColumns(theme);

  return (
    <>
      <div className="custom-table">
        {!screens.md ? (
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
            {suppliers.length === 0 && (
              <div
                style={{
                  padding: "20px",
                  color: theme.employee.nameColor,
                  textAlign: "center",
                }}
              >
                No suppliers found
              </div>
            )}
          </div>
        ) : (
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
        )}
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
