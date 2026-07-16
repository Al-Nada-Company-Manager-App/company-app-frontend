import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  message,
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
import type { Purchases } from "@src/types/Purchases/purchases";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/theme";
import { useCreatePurchase, useUpdatePurchase } from "@src/queries/Purchases";
import { useGetAllSuppliers } from "@src/queries/Suppliers";
import { useGetAllProducts } from "@src/queries/Products";
import dayjs from "dayjs";
import AppModal from "@src/components/UI/AppModal";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchase?: Purchases;
  theme: Theme;
}

interface ProductFormValues {
  product_id: number;
  quantity: number;
  costprice: number;
}

interface SelectedProduct {
  p_id: number;
  p_name: string;
  quantity: number;
  costprice: number;
  total: number;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  purchase,
  theme,
}) => {
  const [form] = Form.useForm();
  const [productForm] = Form.useForm();
  const { isDark } = useThemeContext();

  const createPurchase = useCreatePurchase(isDark);
  const updatePurchase = useUpdatePurchase(isDark);
  const { data: paginatedSuppliers } = useGetAllSuppliers({ limit: 1000 });
  const suppliers = paginatedSuppliers?.data;
  const { data: paginatedProducts } = useGetAllProducts({ limit: 1000 });
  const products = paginatedProducts?.data;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

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

  // Sync form values when modal opens or purchase changes
  useEffect(() => {
    if (isOpen) {
      if (purchase) {
        form.setFieldsValue({
          ...purchase,
          pch_date: purchase.pch_date ? dayjs(purchase.pch_date) : null,
          supplier_id: purchase.supplier?.s_id,
        });

        if (purchase.products) {
          const existingProducts: SelectedProduct[] = purchase.products.map(
            (p) => ({
              p_id: p.p_id || 0,
              p_name:
                products?.find((ap) => ap.p_id === p.p_id)?.p_name ||
                `Product ${p.p_id}`,
              quantity: p.pi_quantity || 0,
              costprice: p.p_costprice || 0,
              total: (p.pi_quantity || 0) * (p.p_costprice || 0),
            })
          );
          setSelectedProducts(existingProducts);
        }

        setTimeout(() => {
          calculateTotal();
        }, 100);
      } else {
        setSelectedProducts([]);
        form.resetFields();
        productForm.resetFields();
        form.setFieldsValue({ pch_total: 0 });
      }
    }
  }, [isOpen, purchase, form, products, calculateTotal, productForm]);

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
      const suggestedCostPrice = selectedProduct.p_sellprice * 0.8;
      productForm.setFieldsValue({ costprice: suggestedCostPrice });
    }
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.p_id !== productId));
  };

  const handleSubmit = async (values: any) => {
    try {
      if (selectedProducts.length === 0) {
        message.error("Please add at least one product before submitting.");
        return;
      }
      setIsSubmitting(true);

      const productsData = selectedProducts.map((p) => ({
        p_id: p.p_id,
        quantity: p.quantity,
        costprice: p.costprice,
      }));

      if (purchase) {
        // Edit mode
        if (!purchase.pch_id) return;

        const purchaseData = {
          cost: values.pch_cost || 0,
          tax: values.pch_tax || 0,
          customscost: values.pch_customscost || 0,
          expense: values.pch_expense || 0,
          total: values.pch_total,
          products: productsData,
        };

        await updatePurchase.mutateAsync({
          id: purchase.pch_id,
          purchaseData,
        });
      } else {
        // Add mode
        const purchaseData = {
          supplier: {
            s_id: values.supplier_id,
          },
          billNumber: values.pch_billnum,
          expense: values.pch_expense || 0,
          customscost: values.pch_customscost || 0,
          customsnum: values.pch_customsnum ? String(values.pch_customsnum) : "",
          cost: values.pch_cost || 0,
          tax: values.pch_tax || 0,
          total: values.pch_total,
          currency: values.pch_currency || "USD",
          purchasedate: values.pch_date ? dayjs(values.pch_date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
          products: productsData,
        };

        await createPurchase.mutateAsync(purchaseData);
      }

      form.resetFields();
      productForm.resetFields();
      setSelectedProducts([]);
      onClose();
    } catch (error) {
      console.error("Error submitting purchase:", error);
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
    <AppModal
      title={purchase ? "Update Purchase" : "Add New Purchase"}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ minWidth: 1000 }}
      width="90%"
      form={form}
      isLoading={isSubmitting}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <Form.Item
              label="Supplier"
              name="supplier_id"
              rules={[{ required: true, message: "Please select a supplier" }]}
            >
              <Select
                placeholder="Select a supplier"
                showSearch
                disabled={!!purchase}
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
          </div>
          <div className="w-full">
            <Form.Item
              label="Purchase Date"
              name="pch_date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} disabled={!!purchase} />
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <Form.Item
              label="Total Amount (Calculated)"
              name="pch_total"
              rules={[{ required: true, message: "Please enter total amount" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                step={0.01}
                placeholder="0.00"
                readOnly
              />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item label="Tax" name="pch_tax">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                step={0.01}
                placeholder="0.00"
              />
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <Form.Item label="Cost (Base from Products)" name="pch_cost">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                step={0.01}
                placeholder="0.00"
              />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              label="Bill Number"
              name="pch_billnum"
              rules={[{ required: true, message: "Please enter bill number" }]}
            >
              <InputNumber style={{ width: "100%" }} disabled={!!purchase} />
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <Form.Item label="Currency" name="pch_currency">
              <Select placeholder="Select currency" disabled={!!purchase}>
                <Select.Option value="USD">USD</Select.Option>
                <Select.Option value="EUR">EUR</Select.Option>
                <Select.Option value="EGP">EGP</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item label="Expense" name="pch_expense">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                step={0.01}
                placeholder="0.00"
              />
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <Form.Item label="Customs Cost" name="pch_customscost">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                step={0.01}
                placeholder="0.00"
              />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item label="Customs Number" name="pch_customsnum">
              <InputNumber style={{ width: "100%" }} disabled={!!purchase} />
            </Form.Item>
          </div>
        </div>

        <Divider>Product Selection</Divider>

        <Card size="small" style={{ marginBottom: 16 }}>
          <Form
            form={productForm}
            layout="vertical"
            onFinish={addProduct}
            className="flex flex-col md:flex-row gap-4 items-end"
          >
            <Form.Item
              name="product_id"
              rules={[{ required: true, message: "Select a product" }]}
              className="w-full md:w-[40%] mb-0"
              label="Product"
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
                    product?.serial_number?.toLowerCase().includes(searchText) ||
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
                      {product.model_code ? ` | Model: ${product.model_code}` : ""}
                      {product.serial_number ? ` | Serial: ${product.serial_number}` : ""}
                      )
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="quantity"
              rules={[{ required: true, message: "Enter quantity" }]}
              className="w-full md:w-[20%] mb-0"
              label="Qty"
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
              className="w-full md:w-[25%] mb-0"
              label="Price"
            >
              <InputNumber
                placeholder="Cost Price"
                min={0}
                step={0.01}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item className="w-full md:w-auto mb-0">
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

        {selectedProducts.length > 0 && (
          <Card size="small" style={{ marginBottom: 16 }}>
            <div className="overflow-x-auto w-full">
              <Table
                className="custom-table"
                dataSource={selectedProducts}
                rowKey="p_id"
                pagination={false}
                size="small"
              >
                <Table.Column title="Product" dataIndex="p_name" key="p_name" />
                <Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
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
                        aria-label="Remove product"
                        icon={<DeleteOutlined />}
                        size="small"
                      />
                    </Popconfirm>
                  )}
                />
              </Table>
            </div>

            <div
              style={{
                textAlign: "right",
                marginTop: 8,
                fontWeight: "bold",
                color: theme.employee.nameColor,
              }}
            >
              Total Products: {selectedProducts.length} | Total Amount: $
              {selectedProducts.reduce((sum, p) => sum + p.total, 0).toFixed(2)}
            </div>
          </Card>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {purchase ? "Update Purchase" : "Create Purchase"}
          </Button>
        </div>
      </Form>
    </AppModal>
  );
};

export default PurchaseModal;
