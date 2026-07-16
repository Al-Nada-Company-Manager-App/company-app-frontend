import { useState } from "react";
import { usePurchases } from "@src/hooks/Purchases/usePurchases";
import PurchasesTable from "./components/PurchasesTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import PurchaseModal from "./components/PurchaseModal";
import { useSearchContext } from "@src/contexts/search";

interface PurchasesPageProps {
  isDark: boolean;
}

const PurchasesPage = ({ isDark }: PurchasesPageProps) => {
  const { searchQuery } = useSearchContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { purchases, theme, total, isLoading, error } = usePurchases(isDark, {
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



  return (
    <>
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
              Purchases
            </h2>
            <CustomBtn
              theme={theme}
              btnTitle="Add New Purchase"
              onClick={() => setShowAddModal(true)}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
          </div>
          <PurchasesTable 
            purchases={purchases ?? []} 
            theme={theme} 
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={(page, size) => { setCurrentPage(page); setPageSize(size); }}
            loading={isLoading}
          />
        </div>
      </div>
      <PurchaseModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        theme={theme}
      />
    </>
  );
};

export default PurchasesPage;
