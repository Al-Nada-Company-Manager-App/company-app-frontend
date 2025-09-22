import { useDebts } from "@src/hooks/Debts/useDebts";
import DebtTable from "./components/DebtTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import { useSearchContext } from "@src/contexts/search";
import DebtCards from "./components/DebtCards";

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
        <DebtCards debtsToShow={debtsToShow ?? []} theme={theme} />

        <DebtTable debts={debtsToShow ?? []} theme={theme} />
      </div>
    </div>
  );
};

export default DebtsPage;
