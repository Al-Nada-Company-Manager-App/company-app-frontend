import { Table, Image } from "antd";
import { Loading, ErrorDisplay } from "@src/components/UI";
import type { Theme } from "@src/types/theme";
import { useGetSalesProducts } from "@src/queries/Sales";
import { useThemeContext } from "@src/contexts/useThemeContext";

interface ProductSalesTableProps {
  saleId: number;
  saleType: string;
  theme: Theme;
}

const { Column } = Table;

const ProductSalesTable = ({ saleId,saleType, theme }: ProductSalesTableProps) => {

  const { isDark } = useThemeContext();
  const { data: products, isLoading, error } = useGetSalesProducts(saleId, saleType);
  console.log(products);
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
            title="Failed to Load Products"
            subTitle="There was an error loading the products data."
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
    <div className="custom-table p-6">
      <Table
        dataSource={products}
        rowKey="p_id"
        pagination={{ pageSize: 5 }}
        showHeader={true}
        locale={{
          emptyText: "No products for this sale.",
        }}
      >
        <Column
          title="Photo"
          dataIndex={["stock", "p_photo"]}
          key="p_photo"
          render={(_, record) =>
            record.stock?.p_photo ? (
              <Image
                src={`/Images/products/${record.stock.p_photo}`}
                alt={record.stock.p_name}
                width={40}
                height={40}
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
            ) : (
              <Image
                src="/Images/products/placeholder.jpg"
                alt="No photo"
                width={40}
                height={40}
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
            )
          }
        />
        <Column
          title="Product Name"
          dataIndex={["stock", "p_name"]}
          key="p_name"
          render={(_, record) => record.stock?.p_name || "N/A"}
        />
        { products && products.length > 0 && products[0].stock && products[0].stock.serial_number &&
        <Column
          title="Serial Number"
          dataIndex={["stock", "serial_number"]}
          key="serial_number"
          render={(_, record) => record.stock?.serial_number || "N/A"}
        />
        }
        { products && products.length > 0 && products[0].stock && products[0].stock.p_costprice &&
        <Column
          title="Cost Price"
          dataIndex={["stock", "p_costprice"]}
          key="p_costprice"
          render={(_, record) =>
            record.stock?.p_costprice
              ? record.stock.p_costprice.toFixed(2)
              : "N/A"
          }
        />
        }
        { products && products.length > 0 && products[0].si_quantity &&
          <Column
          title="Quantity"
          dataIndex="si_quantity"
          key="si_quantity"
        />
        }
        { products && products.length > 0 && products[0].si_total &&
          <Column
          title="Total Price"
          dataIndex="si_total"
          key="si_total"
          render={(value: number) => value?.toFixed(2)}
        />
        }
      </Table>
    </div>
  );
};

export default ProductSalesTable;
