import { Table } from "antd";
import { Loading, ErrorDisplay } from "@src/components/UI";
import type { Theme } from "@src/types/theme";
import { useGetSupplierPurchases } from "@src/queries/Suppliers";
import { useThemeContext } from "@src/contexts/useThemeContext";
import SupplierDate from "./SupplierDate";
import type { SupplierPurchases } from "@src/types/Suppliers/supplier";

interface SupplierSalesTableProps {
  supplierId: number;
  theme: Theme;
}

const { Column } = Table;
type PurchasesResponse = { purchasesHistory: SupplierPurchases[] };

const SupplierPurchasesTable = ({ supplierId, theme }: SupplierSalesTableProps) => {
  const { isDark } = useThemeContext();
  const {
    data: supplierPurchasesData,
    isLoading,
    error,
  } = useGetSupplierPurchases(supplierId);
  console.log("Purchases data:", supplierPurchasesData);

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
            message="Loading purchases..."
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
            title="Failed to Load Purchases"
            subTitle="There was an error loading the purchases data."
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

  const purchasesHistory = Array.isArray(supplierPurchasesData)
    ? supplierPurchasesData
    : supplierPurchasesData && (supplierPurchasesData as PurchasesResponse).purchasesHistory
    ? (supplierPurchasesData as PurchasesResponse).purchasesHistory
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
          dataSource={purchasesHistory}
          showHeader={true}
          pagination={{ pageSize: 10 }}
          rowKey="pch_id"
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
                <span>No Purchases data available</span>
                <span style={{ fontSize: "14px", opacity: 0.7 }}>
                  Try checking another supplier or refreshing the data.
                </span>
              </div>
            ),
          }}
        >
          <Column title="ID" dataIndex="pch_id" key="id" />
          <Column
            title="Date"
            dataIndex="pch_date"
            key="date"
            render={(_, record) => (
              <SupplierDate date={record.pch_date} theme={theme} />
            )}
          />
          <Column
            title="Total"
            dataIndex="pch_total"
            key="total"
            render={(value: number) =>
              value != null ? value.toFixed(2) : "0.00"
            }
          />
          <Column title="Tax" dataIndex="pch_tax" key="tax" />
          <Column
            title="Cost"
            dataIndex="pch_cost"
            key="cost"
            render={(value: number) =>
              value != null ? value.toFixed(2) : "0.00"
            }
          />
          <Column title="Bill Number" dataIndex="pch_billnum" key="billnum" />
          <Column title="Currency" dataIndex="pch_currency" key="currency" />
          <Column title="expense" dataIndex="pch_expense" key="expense" />
          <Column title="Custom cost" dataIndex="pch_customcost" key="customcost" />
          <Column title="Custom number" dataIndex="pch_customnum" key="customnum" />
        </Table>
      </div>
    </div>
  );
};

export default SupplierPurchasesTable;
