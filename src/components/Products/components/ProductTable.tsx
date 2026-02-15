import { Table, Grid } from "antd";
import ProductCard from "./ProductCard";
import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";
import { getProductColumns } from "./productColumns";

interface ProductTableProps {
  title: string;
  products: Product[];
  theme: Theme;
  showExpireDate?: boolean;
  showCategory?: boolean;
}

const ProductTable = ({
  title,
  products,
  theme,
  showExpireDate = false,
  showCategory = false,
}: ProductTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Product>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = getProductColumns(theme, showExpireDate, showCategory);

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

          <div className="custom-table">
            <Table<Product>
              dataSource={products}
              showHeader={true}
              pagination={{ pageSize: 10 }}
              rowKey="p_id"
              columns={columns}
              showSorterTooltip={{ target: "sorter-icon" }}
              onRow={(record) => ({
                onClick: () => {
                  setSelectedRow(record);
                  setIsModalVisible(true);
                },
              })}
            />
          </div>
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
