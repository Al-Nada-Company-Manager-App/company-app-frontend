import { useDebts } from "@src/hooks/Debts/useDebts";
import DebtTable from "./components/DebtTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import { useSearchContext } from "@src/contexts/search";

interface DebtsProps {
  isDark: boolean;
}

const DebtsPage = ({ isDark }: DebtsProps) => {
  const { debts, theme, isLoading, error } = useDebts(isDark);
  const { searchQuery } = useSearchContext();

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
            message="Loading debts..."
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
            title="Failed to Load Debts"
            subTitle="There was an error loading the debt data."
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

  // Filter debts by customer name, debt type, or bill number
  const filteredDebts = debts?.filter((debt) => {
    const customerName = debt.sales.customer?.c_name?.toLowerCase() || "";
    const debtType = debt.d_type.toLowerCase();
    const billNumber = debt.sales.sl_billnum.toString();
    const debtId = debt.d_id.toString();
    const query = searchQuery.toLowerCase();

    return (
      customerName.includes(query) ||
      debtType.includes(query) ||
      billNumber.includes(query) ||
      debtId.includes(query)
    );
  });

  const debtsToShow = searchQuery.trim() === "" ? debts : filteredDebts;

  return (
    <div className="p-6">
      <div
        className="w-full rounded-2xl p-6 mb-6"
        style={{
          background: theme.container.background,
          backdropFilter: theme.container.backdropFilter,
          minHeight: "auto",
        }}
      >
        {/* Title Row */}
        <div className="mb-6 flex items-center justify-between">
          <h2
            className="text-lg font-bold"
            style={{ color: theme.title.color }}
          >
            Debts Management
          </h2>
          <div className="flex items-center gap-4">
            <div
              className="px-4 py-2 rounded-lg"
              style={{
                background: theme.container.background,
                border: `1px solid ${theme.row?.borderColor}`,
              }}
            >
              <span
                style={{
                  color: theme.employee?.emailColor,
                  fontSize: "14px",
                  marginRight: "8px",
                }}
              >
                Total Debts:
              </span>
              <span
                style={{
                  color: theme.employee?.nameColor,
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {debtsToShow?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div
            className="p-4 rounded-lg"
            style={{
              background: theme.container.background,
              border: `1px solid ${theme.row?.borderColor}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  style={{
                    color: theme.employee?.emailColor,
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  Total Debt In
                </p>
                <p
                  style={{
                    color: "#52c41a",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "4px 0 0 0",
                  }}
                >
                  {debtsToShow
                    ?.filter((debt) => debt.d_type === "DEBT_IN")
                    .reduce((sum, debt) => sum + debt.d_amount, 0)
                    .toFixed(2) || "0.00"}
                </p>
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(82, 196, 26, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#52c41a", fontSize: "20px" }}>↗</span>
              </div>
            </div>
          </div>

          <div
            className="p-4 rounded-lg"
            style={{
              background: theme.container.background,
              border: `1px solid ${theme.row?.borderColor}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  style={{
                    color: theme.employee?.emailColor,
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  Total Debt Out
                </p>
                <p
                  style={{
                    color: "#ff4d4f",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "4px 0 0 0",
                  }}
                >
                  {debtsToShow
                    ?.filter((debt) => debt.d_type === "DEBT_OUT")
                    .reduce((sum, debt) => sum + debt.d_amount, 0)
                    .toFixed(2) || "0.00"}
                </p>
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255, 77, 79, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#ff4d4f", fontSize: "20px" }}>↘</span>
              </div>
            </div>
          </div>

          <div
            className="p-4 rounded-lg"
            style={{
              background: theme.container.background,
              border: `1px solid ${theme.row?.borderColor}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  style={{
                    color: theme.employee?.emailColor,
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  Insurance Amount
                </p>
                <p
                  style={{
                    color: "#faad14",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "4px 0 0 0",
                  }}
                >
                  {debtsToShow
                    ?.filter((debt) => debt.d_type === "INSURANCE")
                    .reduce((sum, debt) => sum + debt.d_amount, 0)
                    .toFixed(2) || "0.00"}
                </p>
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(250, 173, 20, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#faad14", fontSize: "20px" }}>🛡</span>
              </div>
            </div>
          </div>
        </div>

        <DebtTable debts={debtsToShow ?? []} theme={theme} />
      </div>
    </div>
  );
};

export default DebtsPage;
