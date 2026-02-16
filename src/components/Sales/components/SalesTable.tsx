import { Table, Grid } from "antd";
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
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [selectedRow, setSelectedRow] = useState<Sales>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = getSalesColumns(theme);

  return (
    <>
      <div className="custom-table">
        {!screens.md ? (
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
        ) : (
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
        )}
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
