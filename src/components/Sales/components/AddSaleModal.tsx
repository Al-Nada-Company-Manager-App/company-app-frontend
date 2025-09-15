import { Modal, Form, Row, Divider } from "antd";
import type { Sales } from "@src/types/Sales/sales";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/theme";
import { useCreateSale } from "@src/queries/Sales";
import { useGetAllCustomers } from "@src/queries/Customers";
import { useGetAllProducts } from "@src/queries/Products";
import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";

// Import the new components
import SaleBasicInfo from "./components/SaleBasicInfo";
import SaleFinancialInfo from "./components/SaleFinancialInfo";
import ProductSelection from "./components/ProductSelection";
import SaleModalButtons from "./components/SaleModalButtons";
import type { Product } from "@src/types/Products/product";

interface AddSaleModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
}


interface SelectedProduct {
  p_id: number;
  p_name: string;
  p_costprice: number;
  si_quantity: number;
  si_total: number;
}

interface SaleFormValues extends Omit<Sales, "sl_id" | "customer"> {
  customer_id: number;
  discount_percentage?: number;
  tax_percentage?: number;
}

const AddSaleModal = ({ modalOpen, onClose, theme }: AddSaleModalProps) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const createSale = useCreateSale(isDark);
  const { data: customers, isLoading: loadingCustomers } = useGetAllCustomers();
  const { data: products, isLoading: loadingProducts } = useGetAllProducts();

  // State management
  const [saleType, setSaleType] = useState<string>("");
  const [calculatedTotal, setCalculatedTotal] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [selectedRepairItems, setSelectedRepairItems] = useState<number[]>([]);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [taxPercentage, setTaxPercentage] = useState<number>(0);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [insuranceAmount, setInsuranceAmount] = useState<number>(0);

  // Reset form when modal opens
  useEffect(() => {
    if (modalOpen) {
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
  }, [modalOpen, form]);

  // Calculate total whenever values change
  const calculateTotal = useCallback(() => {
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
  }, [saleType, selectedProducts, discountPercentage, taxPercentage, form]);

  useEffect(() => {
    calculateTotal();
  }, [
    selectedProducts,
    discountPercentage,
    taxPercentage,
    saleType,
    calculateTotal,
  ]);

  // Event handlers
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

  const onFinish = async (values: SaleFormValues) => {
    try {
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

      // Add products for SELLITEMS
      if (values.sl_type === "SELLITEMS" && selectedProducts.length > 0) {
        saleData.products = selectedProducts.map((product) => ({
          p_id: product.p_id,
          si_quantity: product.si_quantity,
          si_total: product.si_total,
        }));
      }

      // Add repair items for REPAIR
      if (values.sl_type === "REPAIR" && selectedRepairItems.length > 0) {
        const adddum: { [key: string]: number } = {};
        selectedRepairItems.forEach((itemId, index) => {
          adddum[index.toString()] = itemId;
        });
        saleData.adddum = adddum;
      }

      await createSale.mutateAsync(saleData);
      form.resetFields();
      setSaleType("");
      setCalculatedTotal(0);
      setSelectedProducts([]);
      setSelectedRepairItems([]);
      setDiscountPercentage(0);
      setTaxPercentage(0);
      setAmountPaid(0);
      setInsuranceAmount(0);
      onClose();
    } catch (error) {
      console.error("Error creating sale:", error);
    }
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Add New Sale"
        open={modalOpen}
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
            {/* Basic Information */}
            <SaleBasicInfo
              customers={customers}
              loadingCustomers={loadingCustomers}
              saleType={saleType}
              onSaleTypeChange={handleSaleTypeChange}
              onOpenCustomersPage={openCustomersPage}
            />

            {/* Financial Information */}
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

          {/* Product Selection */}
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
    </>
  );
};

export default AddSaleModal;
