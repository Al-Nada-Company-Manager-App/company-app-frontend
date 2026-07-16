import { Table } from "antd";
import ResponsiveList from "@src/components/UI/ResponsiveList";
import PurchaseCard from "./PurchaseCard";
import type { Purchases } from "@src/types/Purchases/purchases";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import PurchaseDetailModal from "./PurchaseDetailModal";
import { getPurchasesColumns } from "./purchasesColumns";
interface PurchasesTableProps {
  purchases: Purchases[];
  theme: Theme;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading?: boolean;
}

const PurchasesTable = ({ purchases, theme, total, currentPage, pageSize, onPageChange, loading }: PurchasesTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Purchases>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = getPurchasesColumns(theme);

  const tableComponent = (
    <Table
      dataSource={purchases}
      loading={loading}
      columns={columns}
      showHeader={true}
      pagination={false}
      rowKey="pch_id"
      scroll={{ x: 1000 }}
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
