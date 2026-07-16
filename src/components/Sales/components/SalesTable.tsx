import { Table } from "antd";
import ResponsiveList from "@src/components/UI/ResponsiveList";
import SaleCard from "./SaleCard";
import type { Sales } from "@src/types/Sales/sales";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import SaleDetailModal from "./SaleDetailModal";
import { getSalesColumns } from "./salesColumns";

interface SalesTableProps {
  sales: Sales[];
  theme: Theme;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading?: boolean;
}

const SalesTable = ({ sales, theme, total, currentPage, pageSize, onPageChange, loading }: SalesTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Sales>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = getSalesColumns(theme);
  
  const tableComponent = (
    <Table
      columns={columns}
      dataSource={sales}
      loading={loading}
      showHeader={true}
      pagination={false}
      rowKey="sl_id"
      onRow={(record) => ({
        onClick: () => {
          setSelectedRow(record);
          setIsModalVisible(true);
        },
      })}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );

  const cardsComponent = (
    <div className="flex flex-col gap-4">
      {sales.map((sale) => (
        <SaleCard
          key={sale.sl_id}
          sale={sale}
          theme={theme}
          onClick={() => {
            setSelectedRow(sale);
            setIsModalVisible(true);
          }}
        />
      ))}
      {sales.length === 0 && (
        <div
          style={{
            padding: "20px",
            color: theme.employee.nameColor,
            textAlign: "center",
          }}
        >
          No sales found
        </div>
      )}
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
      <SaleDetailModal
        modalOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        sale={selectedRow}
        theme={theme}
      />
    </>
  );
};

export default SalesTable;
