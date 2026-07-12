import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form, Button, Row, Col, Select, InputNumber, Divider } from "antd";
import type { Sales } from "@src/types/Sales/sales";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/theme";
import { useCreateSale, useUpdateSale } from "@src/queries/Sales";
import { useGetAllCustomers } from "@src/queries/Customers";
import { useGetAllProducts } from "@src/queries/Products";
import CustomBtn from "@src/components/UI/customBtn";
import dayjs from "dayjs";

// Import the sub-components used in Add Sale
import SaleBasicInfo from "./components/SaleBasicInfo";
import SaleFinancialInfo from "./components/SaleFinancialInfo";
import ProductSelection from "./components/ProductSelection";
import SaleModalButtons from "./components/SaleModalButtons";
import type { Product } from "@src/types/Products/product";

const { Option } = Select;

interface SaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  sale?: Partial<Sales>;
}

interface SelectedProduct {
  p_id: number;
  p_name: string;
  p_costprice: number;
  si_quantity: number;
  si_total: number;
}

const SaleModal: React.FC<SaleModalProps> = ({
  isOpen,
  onClose,
  theme,
  sale,
}) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const createSale = useCreateSale(isDark);
  const updateSale = useUpdateSale(isDark);

  // Queries for Add mode
  const { data: customersResponse, isLoading: loadingCustomers } = useGetAllCustomers({ limit: 1000 });
  const customers = customersResponse?.data;
  const { data: products, isLoading: loadingProducts } = useGetAllProducts();

  // State management for Add mode
  const [saleType, setSaleType] = useState<string>("");
  const [calculatedTotal, setCalculatedTotal] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [selectedRepairItems, setSelectedRepairItems] = useState<number[]>([]);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [taxPercentage, setTaxPercentage] = useState<number>(0);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [insuranceAmount, setInsuranceAmount] = useState<number>(0);

  // State management for Edit mode
  const [remainingAmount, setRemainingAmount] = useState<number>(0);

  // Watch form values to update remaining amount in Edit mode
  const watchedValues = Form.useWatch([], form);
  useEffect(() => {
    if (sale && watchedValues?.sl_payed !== undefined && sale.sl_total) {
      setRemainingAmount(sale.sl_total - (watchedValues.sl_payed || 0));
    }
  }, [watchedValues?.sl_payed, sale]);

  // Reset form and state when modal opens/changes
  useEffect(() => {
    if (isOpen) {
      if (sale) {
        form.setFieldsValue({
          sl_payed: sale.sl_payed || 0,
          sl_inamount: sale.sl_inamount || 0,
          sl_status: sale.sl_status || "PENDING",
        });
        if (sale.sl_total && sale.sl_payed !== undefined) {
          setRemainingAmount(sale.sl_total - sale.sl_payed);
        }
      } else {
        form.resetFields();
        setSaleType("");
        setCalculatedTotal(0);
        setSelectedProducts([]);
        setSelectedRepairItems([]);
        setDiscountPercentage(0);
        setTaxPercentage(0);
        setAmountPaid(0);
        setInsuranceAmount(0);
      }
    }
  }, [isOpen, sale, form]);

  // Calculate total whenever values change (Add mode)
  const calculateTotal = useCallback(() => {
    if (sale) return;

    let subtotal = 0;
    if (saleType === "SELLITEMS") {
      subtotal = selectedProducts.reduce(
        (sum, product) => sum + product.si_total,
        0
      );
    } else {
      subtotal = form.getFieldValue("sl_cost") || 0;
    }

    const discountAmount = (subtotal * discountPercentage) / 100;
    const taxAmount = ((subtotal - discountAmount) * taxPercentage) / 100;
    const total = subtotal - discountAmount + taxAmount;

    setCalculatedTotal(total);
    form.setFieldsValue({
      sl_total: total,
      sl_discount: discountAmount,
      sl_tax: taxAmount,
      sl_cost: subtotal,
    });
  }, [saleType, selectedProducts, discountPercentage, taxPercentage, form, sale]);

  useEffect(() => {
    if (!sale) {
      calculateTotal();
    }
  }, [
    selectedProducts,
    discountPercentage,
    taxPercentage,
    saleType,
    calculateTotal,
    sale,
  ]);

  // Event handlers for Add mode
  const handleSaleTypeChange = (value: string) => {
    setSaleType(value);
    setSelectedProducts([]);
    setSelectedRepairItems([]);
  };

  const handleProductAdd = (productId: number) => {
    const product = products?.find((p: Product) => p.p_id === productId);
    if (product && !selectedProducts.find((p) => p.p_id === productId)) {
      const newProduct: SelectedProduct = {
        p_id: product.p_id,
        p_name: product.p_name,
        p_costprice: product.p_costprice,
        si_quantity: 1,
        si_total: product.p_costprice,
      };
      setSelectedProducts([...selectedProducts, newProduct]);
    }
  };

  const handleProductQuantityChange = (productId: number, quantity: number) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.p_id === productId
          ? {
              ...product,
              si_quantity: quantity,
              si_total: product.p_costprice * quantity,
            }
          : product
      )
    );
  };

  const handleProductRemove = (productId: number) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.p_id !== productId)
    );
  };

  const handleRepairItemAdd = (productId: number) => {
    if (!selectedRepairItems.includes(productId)) {
      setSelectedRepairItems([...selectedRepairItems, productId]);
    }
  };

  const handleRepairItemRemove = (productId: number) => {
    setSelectedRepairItems((prevItems) =>
      prevItems.filter((id) => id !== productId)
    );
  };

  const openCustomersPage = () => {
    window.open("/customers", "_blank");
  };

  const openStockPage = () => {
    window.open("/stock", "_blank");
  };

  const shouldShowDueDate = amountPaid < calculatedTotal;
  const shouldShowInsuranceDueDate = insuranceAmount > 0;

  const onFinish = async (values: any) => {
    try {
      if (sale) {
        // Edit Mode
        if (!sale.sl_id) return;
        const updatedSaleData = {
          sl_id: sale.sl_id,
          sl_payed: values.sl_payed,
          sl_inamount: values.sl_inamount,
          sl_status: values.sl_status,
        };

        await updateSale.mutateAsync({
          id: sale.sl_id,
          saleData: updatedSaleData,
        });
      } else {
        // Add Mode
        const saleData: Partial<Sales> = {
          sl_type: values.sl_type,
          customer: { c_id: values.customer_id },
          sl_billnum: values.sl_billnum,
          sl_cost:
            saleType === "SELLITEMS"
              ? selectedProducts.reduce((sum, p) => sum + p.si_total, 0)
              : values.sl_cost || 0,
          sl_discount: (calculatedTotal * discountPercentage) / 100,
          sl_tax:
            ((calculatedTotal - (calculatedTotal * discountPercentage) / 100) *
              taxPercentage) /
            100,
          sl_payed: amountPaid,
          sl_inamount: insuranceAmount,
          sl_status: values.sl_status,
          sl_currency: values.sl_currency,
          sl_date: dayjs(values.sl_date).format("YYYY-MM-DD"),
          sl_total: calculatedTotal,
        };

        if (shouldShowDueDate) {
          saleData.due_date = dayjs(values.due_date).format("YYYY-MM-DD");
        }

        if (shouldShowInsuranceDueDate) {
          saleData.in_due_date = dayjs(values.in_due_date).format("YYYY-MM-DD");
        }

        if (values.sl_type === "SELLITEMS" && selectedProducts.length > 0) {
          saleData.products = selectedProducts.map((product) => ({
            p_id: product.p_id,
            si_quantity: product.si_quantity,
            si_total: product.si_total,
          }));
        }

        if (values.sl_type === "REPAIR" && selectedRepairItems.length > 0) {
          const adddum: { [key: string]: number } = {};
          selectedRepairItems.forEach((itemId, index) => {
            adddum[index.toString()] = itemId;
          });
          saleData.adddum = adddum;
        }

        await createSale.mutateAsync(saleData);
      }

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error submitting sale:", error);
    }
  };

  if (sale) {
    // Edit Modal Layout
    return (
      <Modal
        className="custom-modal"
        title="Update Sale"
        open={isOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: "100%" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div
                style={{
                  background: theme.container.background || "#f5f5f5",
                  color: theme.headers.color || "#000",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              >
                <h4 style={{ margin: "0 0 8px 0" }}>Sale Information</h4>
                <p style={{ margin: "4px 0" }}>
                  <strong>Bill Number:</strong> {sale.sl_billnum}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Total Amount:</strong> {sale.sl_total} {sale.sl_currency}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Current Paid:</strong> {sale.sl_payed || 0} {sale.sl_currency}
                </p>
                <p
                  style={{
                    margin: "4px 0",
                    color:
                      remainingAmount > 0
                        ? "#ff4d4f"
                        : remainingAmount < 0
                        ? "#52c41a"
                        : "#1890ff",
                  }}
                >
                  <strong>Remaining Amount:</strong> {remainingAmount} {sale.sl_currency}
                  {remainingAmount < 0 && " (Overpaid)"}
                </p>
              </div>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="sl_payed"
                label="Paid Amount"
                rules={[
                  { required: true, message: "Please enter the paid amount" },
                  { type: "number", min: 0, message: "Amount must be >= 0" },
                ]}
              >
                <InputNumber
                  placeholder="Enter paid amount"
                  style={{ width: "100%" }}
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sl_inamount"
                label="Insurance Amount"
                rules={[
                  { required: true, message: "Please enter insurance amount" },
                  { type: "number", min: 0, message: "Amount must be >= 0" },
                ]}
              >
                <InputNumber
                  placeholder="Enter insurance amount"
                  style={{ width: "100%" }}
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="sl_status"
                label="Sale Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Select sale status">
                  <Option value="PENDING">Pending</Option>
                  <Option value="COMPLETE">Complete</Option>
                  <Option value="CANCELED">Canceled</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div className="flex justify-end gap-4">
              <Button
                onClick={onClose}
                loading={updateSale.isPending}
                style={{
                  background: theme.modal?.cancelButtonBg,
                  color: theme.modal?.cancelButtonColor,
                  boxShadow: theme.button?.boxShadow,
                  borderRadius: theme.button?.borderRadius,
                  fontWeight: theme.button?.fontWeight,
                  fontSize: theme.button?.fontSize,
                  padding: theme.button?.padding,
                  transition: theme.button?.transition,
                  border: theme.button?.border,
                }}
              >
                Cancel
              </Button>
              <CustomBtn
                theme={theme}
                btnTitle="Update Sale"
                loading={updateSale.isPending}
                onClick={() => form.submit()}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  // Add Modal Layout
  return (
    <Modal
      className="custom-modal"
      title="Add New Sale"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={1200}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "100%" }}
        initialValues={{
          sl_currency: "EGP",
          sl_status: "PENDING",
          sl_date: dayjs(),
          due_date: dayjs().add(15, "days"),
          in_due_date: dayjs().add(30, "days"),
        }}
      >
        <Row gutter={[24, 24]}>
          <SaleBasicInfo
            customers={customers}
            loadingCustomers={loadingCustomers}
            saleType={saleType}
            onSaleTypeChange={handleSaleTypeChange}
            onOpenCustomersPage={openCustomersPage}
          />

          <SaleFinancialInfo
            saleType={saleType}
            calculatedTotal={calculatedTotal}
            shouldShowDueDate={shouldShowDueDate}
            shouldShowInsuranceDueDate={shouldShowInsuranceDueDate}
            onCalculateTotal={calculateTotal}
            onDiscountChange={setDiscountPercentage}
            onTaxChange={setTaxPercentage}
            onAmountPaidChange={setAmountPaid}
            onInsuranceAmountChange={setInsuranceAmount}
          />
        </Row>

        <ProductSelection
          saleType={saleType}
          products={products}
          loadingProducts={loadingProducts}
          selectedProducts={selectedProducts}
          selectedRepairItems={selectedRepairItems}
          onProductAdd={handleProductAdd}
          onRepairItemAdd={handleRepairItemAdd}
          onProductQuantityChange={handleProductQuantityChange}
          onProductRemove={handleProductRemove}
          onRepairItemRemove={handleRepairItemRemove}
          onOpenStockPage={openStockPage}
          theme={theme}
        />

        <Divider />

        <Form.Item>
          <SaleModalButtons
            theme={theme}
            onClose={onClose}
            onSubmit={() => form.submit()}
            isLoading={createSale.isPending}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SaleModal;
