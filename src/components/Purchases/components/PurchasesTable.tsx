import { Table } from "antd";
import type { Purchases } from "@src/types/Purchases/purchases";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import PurchaseDetailModal from "./PurchaseDetailModal";
import { getPurchasesColumns } from "./purchasesColumns";
interface PurchasesTableProps {
  purchases: Purchases[];
  theme: Theme;
}


const PurchasesTable = ({ purchases, theme }: PurchasesTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Purchases>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="custom-table">
        <Table
          dataSource={purchases}
          columns={getPurchasesColumns(theme)}
          showHeader={true}
          pagination={{ pageSize: 10 }}
          rowKey="pch_id"
          onRow={(record) => ({
            onClick: () => {
              setSelectedRow(record);
              setIsModalVisible(true);
            },
          })}
        />
      </div>
      <PurchaseDetailModal
        key={selectedRow?.pch_id}
        modalOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        purchase={selectedRow}
        theme={theme}
      />
    </>
  );
};

export default PurchasesTable;
