import { useDebts } from "@src/hooks/Debts/useDebts";
import { useState } from "react";
import DebtTable from "./components/DebtTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import { useSearchContext } from "@src/contexts/search";
import DebtCards from "./components/DebtCards";

interface DebtsProps {
  isDark: boolean;
}

const DebtsPage = ({ isDark }: DebtsProps) => {
  const { searchQuery } = useSearchContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { debts, theme, total, isLoading, error } = useDebts(isDark, {
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
  });

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
                {total || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <DebtCards debtsToShow={debts ?? []} theme={theme} />

        <DebtTable 
          debts={debts ?? []} 
          theme={theme} 
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={(page, size) => { setCurrentPage(page); setPageSize(size); }}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default DebtsPage;
