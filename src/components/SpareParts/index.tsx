import { useState } from "react";
import { useProducts } from "@src/hooks/Products/useProducts";
import ProductTable from "../Products/components/ProductTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import ProductModal from "../Products/components/ProductModal";
import type { Product } from "@src/types/Products/product";
import { useSearchContext } from "@src/contexts/search";

interface SparePartsProps {
  isDark: boolean;
}

const SparePartsPage = ({ isDark }: SparePartsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchQuery } = useSearchContext();
  const { theme, isLoading, error, products: spares, total } = useProducts(isDark, { category: "Spare Part", page: currentPage, limit: pageSize, search: searchQuery });
  const [showAddModal, setShowAddModal] = useState(false);

  const searchFilteredSpares = spares || [];

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
            message="Loading products..."
            textStyle={{ color: theme.title.color }}
            containerStyle={{ background: "transparent", minHeight: "400px" }}
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
            title="Failed to Load Products"
            subTitle="There was an error loading the product data."
            message={error.message}
            onRetry={() => window.location.reload()}
            showRetryButton
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
      <div className="flex justify-end p-6">
        <CustomBtn
          theme={theme}
          btnTitle="Add New Product"
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 font-semibold border-none"
        />
      </div>
      <ProductTable
        title="Spares"
        products={searchFilteredSpares}
        theme={theme}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(page, size) => { setCurrentPage(page); setPageSize(size); }}
      />
      {showAddModal && (
        <ProductModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          theme={theme}
        />
      )}
    </>
  );
};

export default SparePartsPage;
