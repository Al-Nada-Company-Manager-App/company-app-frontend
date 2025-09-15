import { useState } from "react";
import { useProducts } from "@src/hooks/Products/useProducts";
import ProductTable from "./components/ProductTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import AddProductModal from "./components/AddProductModal";
import type { Product } from "@src/types/Products/product";

interface ProductsProps {
  isDark: boolean;
}

const ProductsPage = ({ isDark }: ProductsProps) => {
  const { theme, isLoading, error, measuring, lab, chemicals, spares, others } =
    useProducts(isDark);
  const [showAddModal, setShowAddModal] = useState(false);

  const filterInStock = (products: Product[] | undefined) =>
    products?.filter((product) => product.p_status !== "Out of Stock") || [];

  const filterOutOfStock = (products: Product[] | undefined) =>
    products?.filter((product) => product.p_status === "Out of Stock") || [];

  const inStockMeasuring = filterInStock(measuring);
  const inStockLab = filterInStock(lab);
  const inStockChemicals = filterInStock(chemicals);
  const inStockSpares = filterInStock(spares);
  const inStockOthers = filterInStock(others);

  const outOfStockProducts = [
    ...filterOutOfStock(measuring),
    ...filterOutOfStock(lab),
    ...filterOutOfStock(chemicals),
    ...filterOutOfStock(spares),
    ...filterOutOfStock(others),
  ];

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
      {outOfStockProducts.length > 0 && (
        <ProductTable
          title="Out of Stock Products"
          products={outOfStockProducts}
          theme={theme}
          showCategory={true}
        />
      )}
      <ProductTable
        title="Measuring & Controllers"
        products={inStockMeasuring}
        theme={theme}
      />
      <ProductTable
        title="Lab Equipments"
        products={inStockLab}
        theme={theme}
      />
      <ProductTable
        title="Chemicals"
        products={inStockChemicals}
        theme={theme}
        showExpireDate={true}
      />
      <ProductTable title="Spares" products={inStockSpares} theme={theme} />
      <ProductTable title="Others" products={inStockOthers} theme={theme} />
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
