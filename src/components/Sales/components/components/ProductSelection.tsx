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

const { Option } = Select;
const { Text, Link } = Typography;

interface Product {
  p_id: number;
  p_name: string;
  p_price: number;
}

interface SelectedProduct {
  p_id: number;
  p_name: string;
  p_price: number;
  si_quantity: number;
  si_total: number;
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
  theme,
}: ProductSelectionProps) => {
  if (saleType !== "SELLITEMS" && saleType !== "REPAIR") {
    return null;
  }

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
      render: (quantity: number, record: SelectedProduct) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => onProductQuantityChange(record.p_id, value || 1)}
          style={{ width: 80 }}
        />
      ),
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
          placeholder={`Select ${
            saleType === "SELLITEMS" ? "products" : "items"
          }`}
          loading={loadingProducts}
          onSelect={(value) =>
            saleType === "SELLITEMS"
              ? onProductAdd(Number(value))
              : onRepairItemAdd(Number(value))
          }
          value={undefined}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.children as unknown as string)
              ?.toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {products
            ?.filter((product: Product) =>
              saleType === "SELLITEMS"
                ? !selectedProducts.find((p) => p.p_id === product.p_id)
                : !selectedRepairItems.includes(product.p_id)
            )
            .map((product: Product) => (
              <Option key={product.p_id} value={product.p_id}>
                {product.p_name} - {product.p_price} EGP
              </Option>
            ))}
        </Select>
      </Form.Item>

      {saleType === "SELLITEMS" && selectedProducts.length > 0 && (
        <Table
          dataSource={selectedProducts}
          columns={productColumns}
          pagination={false}
          size="small"
          rowKey="p_id"
        />
      )}

      {saleType === "REPAIR" && selectedRepairItems.length > 0 && (
        <div>
          <Text strong>Selected Repair Items:</Text>
          <div style={{ marginTop: 8 }}>
            {selectedRepairItems.map((itemId) => {
              const product = products?.find((p: Product) => p.p_id === itemId);
              return (
                <div
                  key={itemId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ marginRight: 8 }}>{product?.p_name}</span>
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => onRepairItemRemove(itemId)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSelection;
