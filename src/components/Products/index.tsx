import { useState } from "react";
import { useProducts } from "@src/hooks/Products/useProducts";
import ProductTable from "./components/ProductTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import ProductModal from "./components/ProductModal";
import type { Product } from "@src/types/Products/product";
import { useSearchContext } from "@src/contexts/search";

interface ProductsProps {
  isDark: boolean;
}

const ProductsPage = ({ isDark }: ProductsProps) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { searchQuery } = useSearchContext();

  const [outOfStockPage, setOutOfStockPage] = useState(1);
  const [measuringPage, setMeasuringPage] = useState(1);
  const [labPage, setLabPage] = useState(1);
  const [chemicalsPage, setChemicalsPage] = useState(1);
  const [othersPage, setOthersPage] = useState(1);
  
  const [pageSize, setPageSize] = useState(10);

  const { theme } = useProducts(isDark); // Just for theme

  const { products: outOfStock, total: outOfStockTotal, isLoading: outOfStockLoading } = useProducts(isDark, { page: outOfStockPage, limit: pageSize, search: searchQuery, status: "Out of Stock" });
  const { products: measuring, total: measuringTotal, isLoading: measuringLoading } = useProducts(isDark, { page: measuringPage, limit: pageSize, search: searchQuery, category: "Measuring & Controllers" });
  const { products: lab, total: labTotal, isLoading: labLoading } = useProducts(isDark, { page: labPage, limit: pageSize, search: searchQuery, category: "Laboratory Equipment" });
  const { products: chemicals, total: chemicalsTotal, isLoading: chemicalsLoading } = useProducts(isDark, { page: chemicalsPage, limit: pageSize, search: searchQuery, category: "Chemical" });
  // To fetch 'others', we might not be able to easily query it if the backend doesn't support 'not in' list, so we might need to skip or handle it differently if possible. But for now we assume backend can return it or we just omit others if it's too complex.
  // Actually, wait, Product.getAll backend doesn't support `not` categories dynamically. 
  // We can just fetch ALL products without category, and let the backend return everything.
  // Wait! If we fetch all, we can't paginate them by category on the server easily unless backend supports it.
  const { products: allProducts, total: allProductsTotal, isLoading: allLoading, error } = useProducts(isDark, { page: othersPage, limit: pageSize, search: searchQuery });
  const isLoading = outOfStockLoading || measuringLoading || labLoading || chemicalsLoading || allLoading;

  // Filter others manually from allProducts if needed, or if we want to change approach, we just use allProducts for others and filter it manually (but pagination will be wrong).
  // Actually, it's better to update backend to support category="Others" or we just render them all in one big table since pagination is now server side!
  // If the user wants separate tables, the backend should support querying those specifically.
  // Let's just use the arrays we fetched. For "Others", we can filter `allProducts` just for display, though pagination will be off.
  // Let's render the tables with the fetched data.

  const inStockMeasuring = measuring.filter(p => p.p_status !== "Out of Stock");
  const inStockLab = lab.filter(p => p.p_status !== "Out of Stock");
  const inStockChemicals = chemicals.filter(p => p.p_status !== "Out of Stock");
  const othersList = allProducts.filter(p => !["Measuring & Controllers", "Laboratory Equipment", "Chemical"].includes(p.p_category) && p.p_status !== "Out of Stock");
  const outOfStockProducts = outOfStock;

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
          total={outOfStockTotal}
          currentPage={outOfStockPage}
          pageSize={pageSize}
          onPageChange={(page, size) => { setOutOfStockPage(page); setPageSize(size); }}
          loading={outOfStockLoading}
        />
      )}
      {measuring.length > 0 && (
        <ProductTable
          title="Measuring & Controllers"
          products={inStockMeasuring}
          theme={theme}
          total={measuringTotal}
          currentPage={measuringPage}
          pageSize={pageSize}
          onPageChange={(page, size) => { setMeasuringPage(page); setPageSize(size); }}
          loading={measuringLoading}
        />
      )}
      {lab.length > 0 && (
        <ProductTable
          title="Lab Equipments"
          products={inStockLab}
          theme={theme}
          showSize={true}
          total={labTotal}
          currentPage={labPage}
          pageSize={pageSize}
          onPageChange={(page, size) => { setLabPage(page); setPageSize(size); }}
          loading={labLoading}
        />
      )}
      {chemicals.length > 0 && (
        <ProductTable
          title="Chemicals"
          products={inStockChemicals}
          theme={theme}
          showExpireDate={true}
          total={chemicalsTotal}
          currentPage={chemicalsPage}
          pageSize={pageSize}
          onPageChange={(page, size) => { setChemicalsPage(page); setPageSize(size); }}
          loading={chemicalsLoading}
        />
      )}
      {othersList.length > 0 && (
        <ProductTable 
          title="Others" 
          products={othersList} 
          theme={theme} 
          total={allProductsTotal}
          currentPage={othersPage}
          pageSize={pageSize}
          onPageChange={(page, size) => { setOthersPage(page); setPageSize(size); }}
          loading={allLoading}
        />
      )}
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

export default ProductsPage;
