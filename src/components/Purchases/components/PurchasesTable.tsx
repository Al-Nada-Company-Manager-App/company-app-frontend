import { Table } from "antd";
import type { Purchases } from "@src/types/Purchases/purchases";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import SupplierInfo from "./components/SupplierInfo";
import PurchaseDetailModal from "./PurchaseDetailModal";
import PurchaseDate from "./components/PurchaseDate";

interface PurchasesTableProps {
  purchases: Purchases[];
  theme: Theme;
}

const { Column } = Table;

const PurchasesTable = ({ purchases, theme }: PurchasesTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Purchases>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="custom-table">
        <Table
          dataSource={purchases}
          showHeader={true}
          pagination={{ pageSize: 10 }}
          rowKey="pch_id"
          onRow={(record) => ({
            onClick: () => {
              setSelectedRow(record);
              setIsModalVisible(true);
            },
          })}
        >
          <Column
            title="Supplier"
            dataIndex={["supplier", "s_name"]}
            key="supplier"
            render={(_, record) =>
              record.supplier ? (
                <SupplierInfo supplier={record.supplier} theme={theme} />
              ) : (
                <span
                  style={{
                    color: theme.employee.nameColor,
                    fontStyle: "italic",
                  }}
                >
                  Deleted Supplier
                </span>
              )
            }
          />
          <Column
            title="Total"
            dataIndex="pch_total"
            key="total"
            render={(value: number) => value?.toFixed(2)}
          />
          <Column
            title="Tax"
            dataIndex="pch_tax"
            key="tax"
            render={(value: number) => value?.toFixed(2)}
          />
          <Column
            title="Cost"
            dataIndex="pch_cost"
            key="cost"
            render={(value: number) => value?.toFixed(2)}
          />
          <Column
            title="Date"
            dataIndex="pch_date"
            key="date"
            render={(date: string) => (
              <PurchaseDate date={date} theme={theme} />
            )}
          />
          <Column title="Bill Number" dataIndex="pch_billnum" key="billnum" />
          <Column title="Currency" dataIndex="pch_currency" key="currency" />
          <Column
            title="Expense"
            dataIndex="pch_expense"
            key="expense"
            render={(value: number) => value?.toFixed(2)}
          />
          <Column
            title="Customs Cost"
            dataIndex="pch_customscost"
            key="customscost"
            render={(value: number) => value?.toFixed(2)}
          />
          <Column
            title="Customs Number"
            dataIndex="pch_customsnum"
            key="customsnum"
          />
        </Table>
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
