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
}

const SalesTable = ({ sales, theme }: SalesTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Sales>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const columns = getSalesColumns(theme);
  
  const paginatedSales = sales.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const tableComponent = (
    <Table
      columns={columns}
      dataSource={paginatedSales}
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
      {paginatedSales.map((sale) => (
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
      {paginatedSales.length === 0 && (
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
            total: sales.length,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
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
