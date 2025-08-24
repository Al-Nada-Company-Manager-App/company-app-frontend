import { Table } from "antd";
import { Loading, ErrorDisplay } from "@src/components/UI";
import type { Theme } from "@src/types/theme";
import { useGetCustomerSales } from "@src/queries/Customers";
import { useThemeContext } from "@src/contexts/useThemeContext";
import StatusBadge from "@src/components/UI/StatusBadge";
import CustomerDate from "./CustomerDate";
import type { CustomerSales } from "@src/types/Customers/customer";

interface CustomerSalesTableProps {
  customerId: number;
  theme: Theme;
}

const { Column } = Table;
type SalesResponse = { salesHistory: CustomerSales[] };

const CustomerSalesTable = ({ customerId, theme }: CustomerSalesTableProps) => {
  const { isDark } = useThemeContext();
  const { data: salesData, isLoading, error } = useGetCustomerSales(customerId);

  if (isLoading) {
    return (
      <div className="p-6">
        <div
          className="w-full rounded-2xl"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "400px",
          }}
        >
          <Loading
            size="large"
            message="Loading sales..."
            textStyle={{ color: theme.title.color }}
            containerStyle={{
              background: "transparent",
              minHeight: "400px",
            }}
            isDark={isDark}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div
          className="w-full rounded-2xl"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "400px",
          }}
        >
          <ErrorDisplay
            status="error"
            title="Failed to Load Sales"
            subTitle="There was an error loading the sales data."
            message={error.message}
            onRetry={() => window.location.reload()}
            showRetryButton={true}
            showHomeButton={false}
            isDark={isDark}
            style={{
              background: "transparent",
              minHeight: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </div>
      </div>
    );
  }

  const salesHistory = Array.isArray(salesData)
    ? salesData
    : salesData && (salesData as SalesResponse).salesHistory
    ? (salesData as SalesResponse).salesHistory
    : [];

  return (
    <div className="custom-table p-6 ">
      <div
        className="w-full rounded-2xl"
        style={{
          background: theme.container.background,
          backdropFilter: theme.container.backdropFilter,
          minWidth: "1100px",
          minHeight: "400px",
        }}
      >
        <Table
          dataSource={salesHistory}
          showHeader={true}
          pagination={{ pageSize: 10 }}
          rowKey="sl_id"
          style={{ minHeight: "300px" }}
          locale={{
            emptyText: (
              <div
                style={{
                  minHeight: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isDark ? "#ffffff" : "#000000",
                  fontSize: "16px",
                  gap: "8px",
                }}
              >
                <span>No sales data available</span>
                <span style={{ fontSize: "14px", opacity: 0.7 }}>
                  Try checking another customer or refreshing the data.
                </span>
              </div>
            ),
          }}
        >
          <Column title="ID" dataIndex="sl_id" key="id" />
          <Column
            title="Date"
            dataIndex="sl_date"
            key="date"
            render={(_, record) => (
              <CustomerDate date={record.sl_date} theme={theme} />
            )}
          />
          <Column
            title="Total"
            dataIndex="sl_total"
            key="total"
            render={(value: number) =>
              value != null ? value.toFixed(2) : "0.00"
            }
          />
          <Column title="Discount" dataIndex="sl_discount" key="discount" />
          <Column title="Tax" dataIndex="sl_tax" key="tax" />
          <Column
            title="Status"
            dataIndex="sl_status"
            key="status"
            render={(status) => <StatusBadge status={status} />}
          />
          <Column title="Type" dataIndex="sl_type" key="type" />
          <Column
            title="In Amount"
            dataIndex="sl_inamount"
            key="inamount"
            render={(value: number) =>
              value != null ? value.toFixed(2) : "0.00"
            }
          />
          <Column
            title="Cost"
            dataIndex="sl_cost"
            key="cost"
            render={(value: number) =>
              value != null ? value.toFixed(2) : "0.00"
            }
          />
          <Column title="Bill Number" dataIndex="sl_billnum" key="billnum" />
          <Column
            title="Payed"
            dataIndex="sl_payed"
            key="payed"
            render={(value: number) =>
              value != null ? value.toFixed(2) : "0.00"
            }
          />
          <Column title="Currency" dataIndex="sl_currency" key="currency" />
        </Table>
      </div>
    </div>
  );
};

export default CustomerSalesTable;
