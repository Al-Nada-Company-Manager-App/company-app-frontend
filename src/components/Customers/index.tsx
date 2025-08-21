import { useState } from "react";
import { useCustomers } from "@src/hooks/Customers/useCustomers";
import CustomerTable from "./components/CustomerTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import TableStyle from "../UI/TableStyle";
import { Button } from "antd";
interface CustomersProps {
  isDark: boolean;
}
const CustomersPage = ({ isDark }: CustomersProps) => {
  const { customers, theme, isLoading, error } = useCustomers(isDark);

  const [showAddModal, setShowAddModal] = useState(false);
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
            message="Loading employees..."
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
            title="Failed to Load Employees"
            subTitle="There was an error loading the employee data."
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
  return (
    <>
      <TableStyle theme={theme} />
      <div className="p-6">
        <div
          className="w-full rounded-2xl p-6 mb-6"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "auto",
          }}
        >
          {/* Title and Add Button Row */}
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-lg font-bold"
              style={{ color: theme.title.color }}
            >
              Customers
            </h2>
            <Button
              type="primary"
              className="ml-4 font-semibold border-none"
              style={{
                background: theme.button?.background || "#6C79F7",
                color: theme.button?.color || "#fff",
                boxShadow: theme.button?.boxShadow,
                borderRadius: theme.button?.borderRadius,
                fontWeight: theme.button?.fontWeight,
                fontSize: theme.button?.fontSize,
                padding: theme.button?.padding,
                transition: theme.button?.transition,
                border: theme.button?.border,
              }}
              onMouseOver={(e) => {
                if (theme.button) {
                  e.currentTarget.style.background =
                    theme.button.hoverBackground || "#5A67D8";
                  e.currentTarget.style.color =
                    theme.button.hoverColor || "#fff";
                }
              }}
              onMouseOut={(e) => {
                if (theme.button) {
                  e.currentTarget.style.background =
                    theme.button.background || "#6C79F7";
                  e.currentTarget.style.color = theme.button.color || "#fff";
                }
              }}
            onClick={() => setShowAddModal(true)}
            >
              Add New Customer
            </Button>
          </div>
          <CustomerTable customers={customers ?? []} theme={theme} />
        </div>
      </div>
    </>
  );
};

export default CustomersPage;
