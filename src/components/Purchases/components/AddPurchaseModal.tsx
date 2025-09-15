import {
  Modal,
  Form,
  Row,
  Col,
  DatePicker,
  Select,
  InputNumber,
  Button,
  Table,
  Card,
  Divider,
  Popconfirm,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/theme";
import { useCreatePurchase } from "@src/queries/Purchases";
import { useGetAllSuppliers } from "@src/queries/Suppliers";
import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { useGetAllProducts } from "@src/queries/Products";

interface AddPurchaseModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

interface ProductFormValues {
  product_id: number;
  quantity: number;
  costprice: number;
}

interface PurchaseFormValues {
  supplier_id: number;
  pch_billnum: number;
  pch_expense?: number;
  pch_customscost?: number;
  pch_customsnum?: string;
  pch_cost?: number;
  pch_tax?: number;
  pch_total: number;
  pch_currency?: string;
  pch_date: unknown;
}

interface SelectedProduct {
  p_id: number;
  p_name: string;
  quantity: number;
  costprice: number;
  total: number;
}

const AddPurchaseModal = ({
  modalOpen,
  onClose,
  theme,
}: AddPurchaseModalProps) => {
  const [form] = Form.useForm();
  const { isDark } = useThemeContext();
  const createPurchase = useCreatePurchase(isDark);
  const { data: suppliers } = useGetAllSuppliers();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [productForm] = Form.useForm();
  const { data: products } = useGetAllProducts();

  // Calculate total amount based on cost, tax, customs cost, and expense
  const calculateTotal = useCallback(() => {
    const cost = form.getFieldValue("pch_cost") || 0;
    const tax = form.getFieldValue("pch_tax") || 0;
    const customsCost = form.getFieldValue("pch_customscost") || 0;
    const expense = form.getFieldValue("pch_expense") || 0;

    const total = cost + tax + customsCost + expense;
    form.setFieldsValue({ pch_total: total });
  }, [form]);

  // Calculate products total and update cost field
  const updateCostFromProducts = useCallback(() => {
    const productsTotal = selectedProducts.reduce((sum, p) => sum + p.total, 0);
    if (productsTotal > 0) {
      form.setFieldsValue({ pch_cost: productsTotal });
    }
    calculateTotal();
  }, [selectedProducts, form, calculateTotal]);

  // Update cost when products change
  useEffect(() => {
    updateCostFromProducts();
  }, [selectedProducts, updateCostFromProducts]);

  // Initial calculation when modal opens
  useEffect(() => {
    if (modalOpen) {
      // Reset all values when modal opens
      setSelectedProducts([]);
      form.resetFields();
      productForm.resetFields();
      // Set initial total to 0
      form.setFieldsValue({ pch_total: 0 });
    }
  }, [modalOpen, form, productForm]);

  const addProduct = (values: ProductFormValues) => {
    const selectedProduct = products?.find((p) => p.p_id === values.product_id);
    if (selectedProduct) {
      const total = values.quantity * values.costprice;
      const newProduct: SelectedProduct = {
        p_id: selectedProduct.p_id,
        p_name: selectedProduct.p_name,
        quantity: values.quantity,
        costprice: values.costprice,
        total,
      };

      setSelectedProducts((prev) => [...prev, newProduct]);
      productForm.resetFields();
    }
  };

  const handleProductSelect = (productId: number) => {
    const selectedProduct = products?.find((p) => p.p_id === productId);
    if (selectedProduct) {
      // Auto-suggest cost price (80% of sell price as a starting point)
      const suggestedCostPrice = selectedProduct.p_sellprice * 0.8;
      productForm.setFieldsValue({ costprice: suggestedCostPrice });
    }
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.p_id !== productId));
  };

  const handleSubmit = async (values: PurchaseFormValues) => {
    try {
      setIsSubmitting(true);

      // Format data according to API specification
      const purchaseData = {
        supplier: {
          s_id: values.supplier_id,
        },
        billNumber: values.pch_billnum,
        expense: values.pch_expense || 0,
        customscost: values.pch_customscost || 0,
        customsnum: values.pch_customsnum || "",
        cost: values.pch_cost || 0,
        tax: values.pch_tax || 0,
        total: values.pch_total,
        currency: values.pch_currency || "USD",
        purchasedate:
          values.pch_date &&
          (dayjs.isDayjs(values.pch_date) ||
            typeof values.pch_date === "string" ||
            typeof values.pch_date === "number" ||
            values.pch_date instanceof Date)
            ? dayjs(values.pch_date).format("YYYY-MM-DD")
            : dayjs().format("YYYY-MM-DD"),
        // Use selected products or fallback to dummy data
        products:
          selectedProducts.length > 0
            ? selectedProducts.map((p) => ({
                p_id: p.p_id,
                quantity: p.quantity,
                costprice: p.costprice,
              }))
            : [
                {
                  p_id: 206,
                  quantity: 10,
                  costprice: 250.0,
                },
                {
                  p_id: 207,
                  quantity: 5,
                  costprice: 500.0,
                },
                {
                  p_id: 209,
                  quantity: 15,
                  costprice: 100.0,
                },
              ],
      };

      await createPurchase.mutateAsync(purchaseData);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error creating purchase:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    productForm.resetFields();
    setSelectedProducts([]);
    onClose();
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Add New Purchase"
        open={modalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ minWidth: 1000 }}
        width="90%"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={(changedValues) => {
            if (
              changedValues.pch_cost !== undefined ||
              changedValues.pch_tax !== undefined ||
              changedValues.pch_customscost !== undefined ||
              changedValues.pch_expense !== undefined
            ) {
              setTimeout(calculateTotal, 50);
            }
          }}
          style={{ maxWidth: "100%" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Supplier"
                name="supplier_id"
                rules={[
                  { required: true, message: "Please select a supplier" },
                ]}
              >
                <Select
                  placeholder="Select a supplier"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      ?.toLowerCase()
                      ?.includes(input.toLowerCase())
                  }
                >
                  {suppliers?.map((supplier) => (
                    <Select.Option key={supplier.s_id} value={supplier.s_id}>
                      {supplier.s_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Purchase Date"
                name="pch_date"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Total Amount (Calculated)"
                name="pch_total"
                rules={[
                  { required: true, message: "Please enter total amount" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tax" name="pch_tax">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Cost (Base from Products)" name="pch_cost">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Bill Number"
                name="pch_billnum"
                rules={[
                  { required: true, message: "Please enter bill number" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Currency" name="pch_currency">
                <Select placeholder="Select currency">
                  <Select.Option value="USD">USD</Select.Option>
                  <Select.Option value="EUR">EUR</Select.Option>
                  <Select.Option value="EGP">EGP</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Expense" name="pch_expense">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Customs Cost" name="pch_customscost">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Customs Number" name="pch_customsnum">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Product Selection Section */}
          <Divider>Product Selection</Divider>

          <Card size="small" style={{ marginBottom: 16 }}>
            <Form
              form={productForm}
              layout="inline"
              onFinish={addProduct}
              style={{ width: "100%" }}
            >
              <Form.Item
                name="product_id"
                rules={[{ required: true, message: "Select a product" }]}
                style={{ width: "30%" }}
              >
                <Select
                  placeholder="Search by name, ID, price, model, or serial..."
                  showSearch
                  onChange={handleProductSelect}
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    const product = products?.find(
                      (p) => p.p_id === Number(option?.value)
                    );
                    const searchText = input.toLowerCase();
                    return (
                      product?.p_name?.toLowerCase().includes(searchText) ||
                      product?.p_id?.toString().includes(searchText) ||
                      product?.p_sellprice?.toString().includes(searchText) ||
                      product?.model_code?.toLowerCase().includes(searchText) ||
                      product?.serial_number
                        ?.toLowerCase()
                        .includes(searchText) ||
                      false
                    );
                  }}
                  notFoundContent="No products found"
                >
                  {products
                    ?.filter(
                      (product) =>
                        !selectedProducts.find(
                          (selected) => selected.p_id === product.p_id
                        )
                    )
                    ?.map((product) => (
                      <Select.Option key={product.p_id} value={product.p_id}>
                        {product.p_name} (ID: {product.p_id} | $
                        {product.p_sellprice}
                        {product.model_code
                          ? ` | Model: ${product.model_code}`
                          : ""}
                        {product.serial_number
                          ? ` | Serial: ${product.serial_number}`
                          : ""}
                        )
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="quantity"
                rules={[{ required: true, message: "Enter quantity" }]}
                style={{ width: "20%" }}
              >
                <InputNumber
                  placeholder="Quantity"
                  min={1}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="costprice"
                rules={[{ required: true, message: "Enter cost price" }]}
                style={{ width: "25%" }}
              >
                <InputNumber
                  placeholder="Cost Price"
                  min={0}
                  step={0.01}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item style={{ width: "20%" }}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ width: "100%" }}
                  onClick={(e) => {
                    e.preventDefault();
                    productForm.submit();
                  }}
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* Selected Products Table */}
          {selectedProducts.length > 0 && (
            <Card size="small" style={{ marginBottom: 16 }}>
              <Table
                className="custom-table"
                dataSource={selectedProducts}
                rowKey="p_id"
                pagination={false}
                size="small"
              >
                <Table.Column title="Product" dataIndex="p_name" key="p_name" />
                <Table.Column
                  title="Quantity"
                  dataIndex="quantity"
                  key="quantity"
                />
                <Table.Column
                  title="Cost Price"
                  dataIndex="costprice"
                  key="costprice"
                  render={(value: number) => `$${value.toFixed(2)}`}
                />
                <Table.Column
                  title="Total"
                  dataIndex="total"
                  key="total"
                  render={(value: number) => `$${value.toFixed(2)}`}
                />
                <Table.Column
                  title="Action"
                  key="action"
                  render={(_, record: SelectedProduct) => (
                    <Popconfirm
                      title="Remove this product?"
                      onConfirm={() => removeProduct(record.p_id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                      />
                    </Popconfirm>
                  )}
                />
              </Table>

              <div
                style={{
                  textAlign: "right",
                  marginTop: 8,
                  fontWeight: "bold",
                  color: theme.employee.nameColor,
                }}
              >
                Total Products: {selectedProducts.length} | Total Amount: $
                {selectedProducts
                  .reduce((sum, p) => sum + p.total, 0)
                  .toFixed(2)}
              </div>
            </Card>
          )}

          <Row>
            <Col span={24}>
              <div style={{ textAlign: "right", marginTop: 16 }}>
                <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  Create Purchase
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddPurchaseModal;
