import { Table } from "antd";
import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";
import { getProductColumns } from "./productColumns";
import ResponsiveList from "@src/components/UI/ResponsiveList";
import ProductCard from "./ProductCard";

interface ProductTableProps {
  title: string;
  products: Product[];
  theme: Theme;
  showExpireDate?: boolean;
  showCategory?: boolean;
  showSize?: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading?: boolean;
}

const ProductTable = ({
  title,
  products,
  theme,
  showExpireDate = false,
  showCategory = false,
  showSize = false,
  total,
  currentPage,
  pageSize,
  onPageChange,
  loading,
}: ProductTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Product>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = getProductColumns(theme, showExpireDate, showCategory, showSize);

  const tableComponent = (
    <Table<Product>
      dataSource={products}
      loading={loading}
      showHeader={true}
      pagination={false}
      rowKey="p_id"
      columns={columns}
      scroll={{ x: "max-content" }}
      showSorterTooltip={{ target: "sorter-icon" }}
      onRow={(record) => ({
        onClick: () => {
          setSelectedRow(record);
          setIsModalVisible(true);
        },
      })}
    />
  );

  const cardsComponent = (
    <div className="flex flex-col gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.p_id}
          product={product}
          theme={theme}
          showCategory={showCategory}
          showSize={showSize}
          showExpireDate={showExpireDate}
          onClick={() => {
            setSelectedRow(product);
            setIsModalVisible(true);
          }}
        />
      ))}
    </div>
  );

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
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-lg font-bold"
              style={{ color: theme.title.color }}
            >
              {title}
            </h2>
          </div>

          <ResponsiveList
            className="custom-table"
            table={tableComponent}
            cards={cardsComponent}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              onChange: onPageChange,
              showSizeChanger: true,
            }}
          />
        </div>
      </div>
      <ProductDetailModal
        modalOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedRow}
        theme={theme}
      />
    </>
  );
};

export default ProductTable;
