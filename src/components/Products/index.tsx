import { useState } from "react";
import { useProducts } from "@src/hooks/Products/useProducts";
import ProductTable from "./components/ProductTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import AddProductModal from "./components/AddProductModal";
import type { Product } from "@src/types/Products/product";
import { useSearchContext } from "@src/contexts/search";

interface ProductsProps {
  isDark: boolean;
}

const ProductsPage = ({ isDark }: ProductsProps) => {
  const { theme, isLoading, error, measuring, lab, chemicals, spares, others } =
    useProducts(isDark);
  const [showAddModal, setShowAddModal] = useState(false);
  const { searchQuery } = useSearchContext();

  const filterInStock = (products: Product[] | undefined) =>
    products?.filter((product) => product.p_status !== "Out of Stock") || [];

  const filterOutOfStock = (products: Product[] | undefined) =>
    products?.filter((product) => product.p_status === "Out of Stock") || [];

  // Filter products by search query (name, model code, serial number)
  const filterBySearch = (products: Product[] | undefined) => {
    if (!products || searchQuery.trim() === "") return products || [];

    return products.filter((product) => {
      const name = product.p_name?.toLowerCase() || "";
      const modelCode = product.model_code?.toLowerCase() || "";
      const serialNumber = product.serial_number?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();

      return (
        name.includes(query) ||
        modelCode.includes(query) ||
        serialNumber.includes(query)
      );
    });
  };

  // Apply search filter first, then stock filter
  const searchFilteredMeasuring = filterBySearch(measuring);
  const searchFilteredLab = filterBySearch(lab);
  const searchFilteredChemicals = filterBySearch(chemicals);
  const searchFilteredSpares = filterBySearch(spares);
  const searchFilteredOthers = filterBySearch(others);

  const inStockMeasuring = filterInStock(searchFilteredMeasuring);
  const inStockLab = filterInStock(searchFilteredLab);
  const inStockChemicals = filterInStock(searchFilteredChemicals);
  const inStockSpares = filterInStock(searchFilteredSpares);
  const inStockOthers = filterInStock(searchFilteredOthers);

  const outOfStockProducts = [
    ...filterOutOfStock(searchFilteredMeasuring),
    ...filterOutOfStock(searchFilteredLab),
    ...filterOutOfStock(searchFilteredChemicals),
    ...filterOutOfStock(searchFilteredSpares),
    ...filterOutOfStock(searchFilteredOthers),
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
      {inStockMeasuring.length > 0 && (
        <ProductTable
          title="Measuring & Controllers"
          products={inStockMeasuring}
          theme={theme}
        />
      )}
      {inStockLab.length > 0 && (
        <ProductTable
          title="Lab Equipments"
          products={inStockLab}
          theme={theme}
        />
      )}
      {inStockChemicals.length > 0 && (
        <ProductTable
          title="Chemicals"
          products={inStockChemicals}
          theme={theme}
          showExpireDate={true}
        />
      )}
      {inStockSpares.length > 0 && (
        <ProductTable title="Spares" products={inStockSpares} theme={theme} />
      )}
      {inStockOthers.length > 0 && (
        <ProductTable title="Others" products={inStockOthers} theme={theme} />
      )}
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
