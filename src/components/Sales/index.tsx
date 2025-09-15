import { useState } from "react";
import { useSales } from "@src/hooks/Sales/useSales";
import SalesTable from "./components/SalesTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import AddSaleModal from "./components/AddSaleModal";
import { useSearchContext } from "@src/contexts/search";

interface SalesPageProps {
  isDark: boolean;
}

const SalesPage = ({ isDark }: SalesPageProps) => {
  const { sales, theme, isLoading, error } = useSales(isDark);
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

  // Filter sales by customer name, customer email, or bill number
  const filteredSales = sales?.filter((sale) => {
    const customerName = sale.customer?.c_name?.toLowerCase() || "";
    const customerEmail = sale.customer?.c_email?.toLowerCase() || "";
    const billNumber = sale.sl_billnum?.toString().toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    return (
      customerName.includes(query) ||
      customerEmail.includes(query) ||
      billNumber.includes(query)
    );
  });

  const salesToShow = searchQuery.trim() === "" ? sales : filteredSales;

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
              Sales
            </h2>
            <CustomBtn
              theme={theme}
              btnTitle="Add New Sale"
              onClick={() => setShowAddModal(true)}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
          </div>
          <SalesTable sales={salesToShow ?? []} theme={theme} />
        </div>
      </div>
      <AddSaleModal
        modalOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        theme={theme}
      />
    </>
  );
};

export default SalesPage;
