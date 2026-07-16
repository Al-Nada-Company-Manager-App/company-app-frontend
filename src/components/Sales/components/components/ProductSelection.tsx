import {
  Form,
  Select,
  Table,
  Button,
  Typography,
  Divider,
  Space,
  InputNumber,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { Theme } from "@src/types/theme";
import type { Product } from "@src/types/Products/product";

const { Option } = Select;
const { Link } = Typography;

interface SelectedProduct {
  p_id: number;
  p_name: string;
  p_costprice: number;
  si_quantity: number;
  si_total: number;
}

interface RepairItem {
  p_id: number;
  p_name: string;
}

interface ProductSelectionProps {
  saleType: string;
  products?: Product[];
  loadingProducts: boolean;
  selectedProducts: SelectedProduct[];
  selectedRepairItems: number[];
  onProductAdd: (productId: number) => void;
  onRepairItemAdd: (productId: number) => void;
  onProductQuantityChange: (productId: number, quantity: number) => void;
  onProductRemove: (productId: number) => void;
  onRepairItemRemove: (productId: number) => void;
  onOpenStockPage: () => void;
  onProductSearch: (val: string) => void;
  theme: Theme;
}

const ProductSelection = ({
  saleType,
  products,
  loadingProducts,
  selectedProducts,
  selectedRepairItems,
  onProductAdd,
  onRepairItemAdd,
  onProductQuantityChange,
  onProductRemove,
  onRepairItemRemove,
  onOpenStockPage,
  onProductSearch,
  theme,
}: ProductSelectionProps) => {
  if (saleType !== "SELLITEMS" && saleType !== "REPAIR") {
    return null;
  }

  const repairColumns = [
    {
      title: "Product Name",
      dataIndex: "p_name",
      key: "p_name",
    },
    {
      title: "Action",
      key: "action",
      render: (record: RepairItem) => (
        <Button
          type="text"
          danger
          aria-label={`Remove ${record.p_name}`}
          icon={<DeleteOutlined />}
          onClick={() => onRepairItemRemove(record.p_id)}
        />
      ),
    },
  ];

  const productColumns = [
    {
      title: "Product Name",
      dataIndex: "p_name",
      key: "p_name",
    },
    {
      title: "Unit Price",
      dataIndex: "p_price",
      key: "p_price",
      render: (price: number) => `${price} EGP`,
    },
    {
      title: "Quantity",
      dataIndex: "si_quantity",
      key: "si_quantity",
      render: (quantity: number, record: SelectedProduct) => {
        const availableStock =
          products?.find((p) => p.p_id === record.p_id)?.p_quantity || 1;
        const hasError = quantity > availableStock;

        return (
          <Form.Item
            validateStatus={hasError ? "error" : ""}
            help={
              hasError ? `Only ${availableStock} items available in stock!` : ""
            }
            style={{ margin: 0 }}
          >
            <InputNumber
              min={1}
              value={quantity}
              onChange={(value) => {
                onProductQuantityChange(record.p_id, value || 1);
                if (value && value > availableStock) {
                  setTimeout(() => {
                    onProductQuantityChange(record.p_id, availableStock);
                  }, 2000);
                }
              }}
              style={{ width: 80 }}
            />
          </Form.Item>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "si_total",
      key: "si_total",
      render: (total: number) => `${total} EGP`,
    },
    {
      title: "Action",
      key: "action",
      render: (record: SelectedProduct) => (
        <Button
          type="text"
          danger
          aria-label={`Remove ${record.p_name}`}
          icon={<DeleteOutlined />}
          onClick={() => onProductRemove(record.p_id)}
        />
      ),
    },
  ];

  return (
    <>
      <Divider>
        <Space>
          <span
            style={{
              color: theme.employee.nameColor,
            }}
          >
            {saleType === "SELLITEMS"
              ? "Select Products to Sell"
              : "Select Repair Items"}
          </span>
          <Link onClick={onOpenStockPage} style={{ fontSize: "12px" }}>
            Don't see your product? Add new product
          </Link>
        </Space>
      </Divider>

      <Form.Item
        label={saleType === "SELLITEMS" ? "Add Products" : "Add Repair Items"}
      >
        <Select
          placeholder={`Search by name, ID, price, model, or serial...`}
          loading={loadingProducts}
          onSelect={(value) =>
            saleType === "SELLITEMS"
              ? onProductAdd(Number(value))
              : onRepairItemAdd(Number(value))
          }
          value={undefined}
          showSearch
          onSearch={onProductSearch}
          filterOption={false}
          notFoundContent="No products found"
        >
          {products
            ?.filter((product: Product) =>
              saleType === "SELLITEMS"
                ? !selectedProducts.find((p) => p.p_id === product.p_id)
                : !selectedRepairItems.includes(product.p_id)
            )
            .map((product: Product) => (
              <Option key={product.p_id} value={product.p_id}>
                {product.p_name} (ID: {product.p_id} | Cost:{" "}
                {product.p_costprice} EGP
                {product.model_code ? ` | Model: ${product.model_code}` : ""}
                {product.serial_number
                  ? ` | Serial: ${product.serial_number}`
                  : ""}
                )
              </Option>
            ))}
        </Select>
      </Form.Item>

      {saleType === "SELLITEMS" && selectedProducts.length > 0 && (
        <>
        <div className="overflow-x-auto w-full">
          <Table
            className="custom-table"
            dataSource={selectedProducts}
            columns={productColumns}
            pagination={false}
            size="small"
            rowKey="p_id"
          />
        </div>
        </>
      )}

      {saleType === "REPAIR" && selectedRepairItems.length > 0 && (
        <div>
        <div className="overflow-x-auto w-full">
          <Table
            className="custom-table"
            dataSource={selectedRepairItems.map((itemId) => {
              const product = products?.find((p: Product) => p.p_id === itemId);
              return {
                p_id: itemId,
                p_name: product?.p_name || "Unknown Product",
              };
            })}
            columns={repairColumns}
            pagination={false}
            size="small"
            rowKey="p_id"
          />
        </div>
        </div>
      )}
    </>
  );
};

export default ProductSelection;
