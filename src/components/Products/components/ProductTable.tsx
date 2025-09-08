import { Table } from "antd";
import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";
import TableStyle from "../../UI/TableStyle";
import { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";
// import ProductInfo from "./components/ProductInfo";

interface ProductTableProps {
  title: string;
  products: Product[];
  theme: Theme;
}

const { Column } = Table;

const ProductTable = ({ title, products, theme }: ProductTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Product>();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
                onRow={(record) => ({
                  onClick: () => {
                    setSelectedRow(record);
                    setIsModalVisible(true);
                  },
                })}
            >
              <Column
            title="Product"
            dataIndex="p_name"
            key="p_name"
            // render={(_, record: Product) => (
            //   <ProductInfo product={record} theme={theme} />
            // )}
            />
              <Column
                title="Category"
                dataIndex="p_category"
                key="p_category"
              />
              <Column
                title="Cost Price"
                dataIndex="p_costprice"
                key="p_costprice"
              />
              <Column
                title="Sell Price"
                dataIndex="p_sellprice"
                key="p_sellprice"
              />
              <Column
                title="Quantity"
                dataIndex="p_quantity"
                key="p_quantity"
              />
              <Column
                title="Model Code"
                dataIndex="model_code"
                key="model_code"
              />
              <Column
                title="Expire Date"
                dataIndex="expire_date"
                key="expire_date"
              />
              <Column title="Status" dataIndex="p_status" key="p_status" />
            </Table>
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
