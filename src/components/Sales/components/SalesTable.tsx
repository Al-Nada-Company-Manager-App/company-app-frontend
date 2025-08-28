import { Table } from "antd";
import type { Sales } from "@src/types/Sales/sales";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import CustomerInfo from "./components/CustomerInfo";
import SaleDetailModal from "./SaleDetailModal";
import SaleDate from "./components/SaleDate";
import StatusBadge from "@src/components/UI/StatusBadge";

interface SalesTableProps {
  sales: Sales[];
  theme: Theme;
}

const { Column } = Table;

const SalesTable = ({ sales, theme }: SalesTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Sales>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="custom-table">
        <Table
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
        >
          <Column
            title="Customer"
            dataIndex={["customer", "c_name"]}
            key="customer"
            render={(_, record) =>
              record.customer ? (
                <CustomerInfo customer={record.customer} theme={theme} />
              ) : (
                <span
                  style={{
                    color: theme.employee.nameColor,
                    fontStyle: "italic",
                  }}
                >
                  Deleted Customer
                </span>
              )
            }
          />
          <Column
            title="Total"
            dataIndex="sl_total"
            key="total"
            render={(value: number) => value?.toFixed(2)}
          />
          <Column title="Discount" dataIndex="sl_discount" key="discount" />
          <Column title="Tax" dataIndex="sl_tax" key="tax" />
          <Column
            title="Date"
            dataIndex="sl_date"
            key="date"
            render={(date: string) => <SaleDate date={date} theme={theme} />}
          />
          <Column
            title="Status"
            dataIndex="sl_status"
            key="status"
            render={(status: string) => <StatusBadge status={status} />}
          />{" "}
          <Column title="Type" dataIndex="sl_type" key="type" />
          <Column
            title="In Amount"
            dataIndex="sl_inamount"
            key="inamount"
            render={(value: number) => value?.toFixed(2)}
          />
          <Column
            title="Cost"
            dataIndex="sl_cost"
            key="cost"
            render={(value: number) => value?.toFixed(2)}
          />
          <Column title="Bill Number" dataIndex="sl_billnum" key="billnum" />
          <Column
            title="Payed"
            dataIndex="sl_payed"
            key="payed"
            render={(value: number) => value?.toFixed(2)}
          />
          <Column title="Currency" dataIndex="sl_currency" key="currency" />
        </Table>
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
