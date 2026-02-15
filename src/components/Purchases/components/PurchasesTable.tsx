import { Table, Grid } from "antd";
import PurchaseCard from "./PurchaseCard";
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
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [selectedRow, setSelectedRow] = useState<Purchases>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="custom-table">
        {!screens.md ? (
          <div className="flex flex-col gap-4">
            {purchases.map((purchase) => (
              <PurchaseCard
                key={purchase.pch_id}
                purchase={purchase}
                theme={theme}
                onClick={() => {
                  setSelectedRow(purchase);
                  setIsModalVisible(true);
                }}
              />
            ))}
          </div>
        ) : (
          <Table
            dataSource={purchases}
            columns={getPurchasesColumns(theme)}
            showHeader={true}
            pagination={{ pageSize: 10 }}
            rowKey="pch_id"
            scroll={{ x: 1000 }}
            onRow={(record) => ({
              onClick: () => {
                setSelectedRow(record);
                setIsModalVisible(true);
              },
            })}
          />
        )}
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
