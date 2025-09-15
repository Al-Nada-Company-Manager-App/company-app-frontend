import { Table } from "antd";
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

  const columns = getSalesColumns(theme);

  return (
    <>
      <div className="custom-table">
        <Table
          columns={columns}
          dataSource={sales}
          showHeader={true}
          pagination={{ pageSize: 10 }}
          rowKey="sl_id"
          onRow={(record) => ({
            onClick: () => {
              setSelectedRow(record);
              setIsModalVisible(true);
            },
          })}
          showSorterTooltip={{ target: "sorter-icon" }}
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
