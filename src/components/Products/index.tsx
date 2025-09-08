import { useState } from "react";
import { useProducts } from "@src/hooks/Products/useProducts";
import ProductTable from "./components/ProductTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import AddProductModal from "./components/AddProductModal";

interface ProductsProps {
  isDark: boolean;
}

const ProductsPage = ({ isDark }: ProductsProps) => {
  const { theme, isLoading, error, measuring, lab, chemicals, spares, others } =
    useProducts(isDark);
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
        title="Measuring & Controllers"
        products={measuring || []}
        theme={theme}
      />
      <ProductTable title="Lab Equipments" products={lab || []} theme={theme} />
      <ProductTable
        title="Chemicals"
        products={chemicals || []}
        theme={theme}
      />
      <ProductTable title="Spares" products={spares || []} theme={theme} />
      <ProductTable title="Others" products={others || []} theme={theme} />
      {showAddModal && (
        <AddProductModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          theme={theme}
        />
      )}
    </>
  );
};

export default ProductsPage;
