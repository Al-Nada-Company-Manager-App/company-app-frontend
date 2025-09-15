import { useState } from "react";
import { usePurchases } from "@src/hooks/Purchases/usePurchases";
import PurchasesTable from "./components/PurchasesTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import AddPurchaseModal from "./components/AddPurchaseModal";
import { useSearchContext } from "@src/contexts/search";

interface PurchasesPageProps {
  isDark: boolean;
}

const PurchasesPage = ({ isDark }: PurchasesPageProps) => {
  const { purchases, theme, isLoading, error } = usePurchases(isDark);
  const { searchQuery } = useSearchContext();
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

  // Filter purchases by supplier name, supplier email, or bill number
  const filteredPurchases = purchases?.filter((purchase) => {
    const supplierName = purchase.supplier?.s_name?.toLowerCase() || "";
    const supplierEmail = purchase.supplier?.s_email?.toLowerCase() || "";
    const billNumber = purchase.pch_billnum?.toString().toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    return (
      supplierName.includes(query) ||
      supplierEmail.includes(query) ||
      billNumber.includes(query)
    );
  });

  const purchasesToShow =
    searchQuery.trim() === "" ? purchases : filteredPurchases;

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
          <PurchasesTable purchases={purchasesToShow ?? []} theme={theme} />
        </div>
      </div>
      <AddPurchaseModal
        modalOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        theme={theme}
      />
    </>
  );
};

export default PurchasesPage;
