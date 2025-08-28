import { useState } from "react";
import { useSales } from "@src/hooks/Sales/useSales";
import SalesTable from "./components/SalesTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import TableStyle from "../UI/TableStyle";
import CustomBtn from "../UI/customBtn";
import AddSaleModal from "./components/AddSaleModal";


interface SalesPageProps {
  isDark: boolean;
}

const SalesPage = ({ isDark }: SalesPageProps) => {
  const { sales, theme, isLoading, error } = useSales(isDark);
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
              Sales
            </h2>
            <CustomBtn
              theme={theme}
              btnTitle="Add New Sale"
              onClick={() => setShowAddModal(true)}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
          </div>
          <SalesTable sales={sales ?? []} theme={theme} />
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
