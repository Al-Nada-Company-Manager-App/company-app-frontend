import {
  Form,
  Input,
  message,
  DatePicker,
  Button,
  Typography,
  Divider,
  Select,
  Checkbox,
  Collapse,
  Tag,
  Space,
  Tooltip,
} from "antd";
import { Plus, Trash, FileText, Image as ImageIcon, X } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import { useThemeContext } from "@src/contexts/theme";
import CustomBtn from "@src/components/UI/customBtn";
import ModalStyle from "@src/components/UI/ModalStyle";
import { useCreateQuotation, useGetQuotationById, useUpdateQuotation } from "@src/queries/Quotations";
import { useGetAllCustomers } from "@src/queries/Customers";
import { useGetAllProducts } from "@src/queries/Products";
import { getImageUrl } from "@src/config/api";
import RichTextEditor from "@src/components/UI/RichTextEditor";
import AppModal from "@src/components/UI/AppModal";

const { Title, Text } = Typography;
const { Option } = Select;
const QUICK_DATES = [
  { label: "+1 Week", amount: 1, unit: "week" as const },
  { label: "+2 Weeks", amount: 2, unit: "week" as const },
  { label: "+1 Month", amount: 1, unit: "month" as const },
  { label: "+3 Months", amount: 3, unit: "month" as const },
  { label: "+6 Months", amount: 6, unit: "month" as const },
];

const DEFAULT_TERMS = [
  { label: "Validity", value: "Offer valid until the date shown above or until stock lasts." },
  { label: "Delivery", value: "Ex-warehouse Cairo / 2-4 weeks from confirmation." },
  { label: "Payment", value: "Upon inspection and receipt of goods." },
  { label: "Warranty", value: "One year against manufacturing defects." },
  { label: "Taxes", value: "VAT is applied as shown in this quotation." },
  { label: "Training", value: "Prices include installation, operation and training when applicable." },
];
const NewQuoteModal = ({ isOpen, onClose, onSuccess, onPreview, editingQuoteId }: any) => {
  const { theme, isDark } = useThemeContext();
  const [form] = Form.useForm();
  const createQuotation = useCreateQuotation(isDark);
  const updateQuotation = useUpdateQuotation(isDark);

  const { data: quoteToEdit, isFetching: loadingQuote } = useGetQuotationById(editingQuoteId || null);

  // Fetch Data
  const { data: customersResponse, isLoading: loadingCustomers } =
    useGetAllCustomers({ limit: 10 });
  const customers = customersResponse?.data;
  const { data: paginatedProducts, isLoading: loadingProducts } = useGetAllProducts({ limit: 1000 });
  const products = paginatedProducts?.data;

  const [items, setItems] = useState<any[]>([
    {
      productName: "",
      description: "",
      quantity: 1,
      price: 0,
      total: 0,
      image: null,
      includeImage: false,
    },
  ]);
  const [vat, setVat] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [currency, setCurrency] = useState("EGP");
  const [totalAmount, setTotalAmount] = useState(0);
  const [terms, setTerms] = useState<{ label: string; value: string }[]>(DEFAULT_TERMS);

  // Recalculate totals
  const calculateTotal = useCallback(() => {
    const itemsTotal = items.reduce((sum, item) => sum + (item.total || 0), 0);

    const discountAmount = itemsTotal * (discount / 100);
    const afterDiscount = Math.max(0, itemsTotal - discountAmount);

    const vatAmount = afterDiscount * (vat / 100);
    const total = afterDiscount + vatAmount;

    setTotalAmount(total);
  }, [items, vat, discount]);

  useEffect(() => {
    calculateTotal();
  }, [items, vat, discount, calculateTotal]);

  useEffect(() => {
    if (editingQuoteId && quoteToEdit) {
      form.setFieldsValue({
        customerId: quoteToEdit.c_id,
        refTo: quoteToEdit.q_ref_to || undefined,
        validUntil: dayjs(quoteToEdit.q_valid_until),
      });
      setCurrency(quoteToEdit.q_currency || "EGP");

      // Calculate derived vat/discount percentage from amounts if needed, 
      // but if we store them in DB later it's better. For now we assume 0 or 
      // if you added pq_discount we can use it. Since we didn't add it to DB,
      // let's leave it as 0 unless you want to reverse engineer it.
      // We will set items:
      if (quoteToEdit.quotation_items) {
        setItems(quoteToEdit.quotation_items.map((qi: any) => ({
          productId: qi.p_id,
          productName: qi.qi_product_name,
          description: qi.qi_description || "",
          quantity: qi.qi_quantity,
          price: qi.qi_unit_price,
          total: qi.qi_total,
          image: qi.stock?.p_photo || null,
          includeImage: !!qi.stock?.p_photo,
        })));
      }
      
      // Load terms if they exist in quoteToEdit, otherwise fallback to DEFAULT_TERMS
      // We don't have terms in the DB yet, but we prepare it.
      // @ts-ignore
      if (quoteToEdit.q_terms) {
          try {
              // @ts-ignore
              const parsed = JSON.parse(quoteToEdit.q_terms);
              setTerms(parsed);
          } catch(e) {
              setTerms(DEFAULT_TERMS);
          }
      }
    } else if (!isOpen) {
      resetFormState();
    }
  }, [editingQuoteId, quoteToEdit, form, isOpen]);

  const handleItemChange = (index: number, field: string, value: any) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const item = { ...newItems[index], [field]: value };

      if (field === "quantity" || field === "price") {
        item.total =
          (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0);
      }

      newItems[index] = item;
      return newItems;
    });
  };

  const handleProductSelect = (index: number, val: any) => {
    console.log("handleProductSelect called", { index, val });

    // Ensure we are looking for the ID
    const productId = Number(val);

    // Find product
    const product = products?.find((p) => Number(p.p_id) === productId);

    if (!product) {
      console.warn("Product not found for ID:", productId);
      return;
    }

    console.log("Product found:", product);

    // Calculate Price logic
    const sellPrice = Number(product.p_sellprice);
    const costPrice = Number(product.p_costprice);
    const finalPrice = sellPrice > 0 ? sellPrice : costPrice;

    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = {
        ...newItems[index],
        productId: product.p_id,
        productName: product.p_name || "",
        description:
          product.p_description ||
          (product.model_code ? `${product.model_code}` : ""),
        price: finalPrice || 0,
        quantity: 1, // Reset qty to 1 or keep? Let's keep 1 default
        image: product.p_photo,
        includeImage: !!product.p_photo,
        total: 1 * (finalPrice || 0),
      };
      console.log("Updated Item:", newItems[index]);
      return newItems;
    });
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: null,
        productName: "",
        description: "",
        quantity: 1,
        price: 0,
        total: 0,
        image: null,
        includeImage: false,
      },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleTermChange = (index: number, field: "label" | "value", val: string) => {
    setTerms((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const addTerm = () => {
    setTerms((prev) => [...prev, { label: "", value: "" }]);
  };

  const removeTerm = (index: number) => {
    setTerms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (values: any) => {
    const validItems = items.filter((item) => item.productName && item.price >= 0);
    if (validItems.length === 0) {
      message.error("Please add at least one valid item with a product name.");
      return;
    }

    // Find customer name from ID
    const customer = customers?.find((c) => c.c_id === values.customerId);

    const payload = {
      customerId: values.customerId,
      customerName: customer ? customer.c_name : "Unknown Customer",
      validUntil: values.validUntil
        ? values.validUntil.format("YYYY-MM-DD")
        : null,
      items: items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        description: item.description,
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price),
        image: item.image,
        includeImage: item.includeImage,
      })),
      vat,
      discount,
      currency,
      refTo: values.refTo || "",
      terms: terms.filter((t) => t.label && t.value),
    };

    if (editingQuoteId) {
      updateQuotation.mutate({ id: editingQuoteId, data: payload }, {
        onSuccess: (data) => {
          if (onPreview) onPreview(data.data.q_id);
          onSuccess(data.data.q_id);
        }
      });
    } else {
      createQuotation.mutate(payload, {
        onSuccess: (data) => {
          if (onPreview) onPreview(data.data.q_id);
          onSuccess(data.data.q_id);
        },
      });
    }
  };

  const resetFormState = () => {
    form.resetFields();
    setVat(0);
    setDiscount(0);
    setCurrency("EGP");
    setTerms(DEFAULT_TERMS);
    setItems([
      {
        productName: "",
        description: "",
        quantity: 1,
        price: 0,
        total: 0,
        image: null,
        includeImage: false,
      },
    ]);
  };

  const handleClose = () => {
    resetFormState();
    onClose();
  };

  return (
    <>
      <ModalStyle />
      <AppModal
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width={1000}
        form={form}
        isLoading={createQuotation.isPending || updateQuotation.isPending || loadingQuote}
        title={
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            <span>{editingQuoteId ? `Edit Quotation #${editingQuoteId}` : "New Price Quotation"}</span>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            validUntil: dayjs().add(30, "day"),
          }}
        >
          {/* Customer Info Row - Removed Global Checkbox */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <Form.Item
                name="customerId"
                label="Customer"
                rules={[
                  { required: true, message: "Please select a customer" },
                ]}
              >
                <Select
                  placeholder="Select Customer"
                  showSearch
                  loading={loadingCustomers}
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {customers?.map((c) => (
                    <Option key={c.c_id} value={c.c_id}>
                      {c.c_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item name="refTo" label="Ref No. (Customer Reference)">
                <Input placeholder="Enter reference number (optional)" size="large" />
              </Form.Item>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div className="w-full">
              <Form.Item name="validUntil" label="Valid Until" className="mb-1">
                <DatePicker className="w-full" size="large" />
              </Form.Item>
              {/* Quick date chips */}
              <Space wrap size={4}>
                {QUICK_DATES.map((qd) => (
                  <Tag
                    key={qd.label}
                    color="blue"
                    className="cursor-pointer select-none hover:opacity-80 transition-opacity"
                    style={{ borderRadius: 20, padding: "2px 10px", fontSize: 11 }}
                    onClick={() =>
                      form.setFieldsValue({ validUntil: dayjs().add(qd.amount, qd.unit) })
                    }
                  >
                    {qd.label}
                  </Tag>
                ))}
              </Space>
            </div>
          </div>

          <Divider orientation="left">Items</Divider>

          {/* Items List */}
          <div className="max-h-[500px] overflow-y-auto pr-2 mb-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border p-4 flex flex-col gap-4"
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,86,179,0.03)",
                  borderColor: theme.row.borderColor || "#dbeafe",
                }}
              >
                {/* Header: Badge & Product Selection */}
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mt-1 sm:mt-0"
                    style={{ background: "#0056B3" }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <Select
                      className="w-full"
                      showSearch
                      value={item.productId || null}
                      placeholder="Search Product..."
                      loading={loadingProducts}
                      onChange={(val) => handleProductSelect(idx, val)}
                      filterOption={(input, option) =>
                        ((option?.label as string) || "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={products?.map((p) => ({
                        value: p.p_id,
                        label: `${p.p_name} (${p.model_code || "No Model"})`,
                      }))}
                    />
                  </div>
                  {items.length > 1 && (
                    <Button
                      danger
                      type="text"
                      className="mt-1 sm:mt-0 px-2"
                      icon={<Trash size={16} />}
                      onClick={() => removeItem(idx)}
                    />
                  )}
                </div>

                {/* Middle Section: Image + Core Inputs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-full sm:w-28 h-40 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center border"
                      style={{
                        background: isDark ? "#1a1a2e" : "#f0f5ff",
                        borderColor: theme.row.borderColor || "#dbeafe",
                      }}
                    >
                      {item.image ? (
                        <img
                          src={getImageUrl("products", item.image)}
                          alt="Product"
                          className="w-full h-full object-cover"
                          style={{ opacity: item.includeImage ? 1 : 0.4 }}
                        />
                      ) : (
                        <ImageIcon size={32} className="text-gray-300" />
                      )}
                    </div>
                    {item.image && (
                      <Checkbox
                        checked={item.includeImage}
                        onChange={(e) => handleItemChange(idx, "includeImage", e.target.checked)}
                        style={{ fontSize: 11 }}
                      >
                        Show in PDF
                      </Checkbox>
                    )}
                  </div>

                  {/* Inputs */}
                  <div className="flex-1 flex flex-col gap-3">
                    <Input
                      placeholder="Product Name (Editable)"
                      value={item.productName}
                      onChange={(e) => handleItemChange(idx, "productName", e.target.value)}
                    />
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <Input
                        type="number"
                        prefix={<span className="text-gray-400 text-xs">Qty</span>}
                        min={1}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                      />
                      <Input
                        type="number"
                        prefix={<span className="text-gray-400 text-xs">{currency}</span>}
                        min={0}
                        step={0.01}
                        value={item.price}
                        onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                      />
                      <div className="col-span-2 lg:col-span-2 flex items-center justify-center sm:justify-start gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-md border border-blue-100 dark:border-blue-900/30">
                        <span className="text-gray-500 text-xs">Total:</span>
                        <span className="font-bold text-sm" style={{ color: theme.button.background }}>
                          {currency} {item.total?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <RichTextEditor
                  value={item.description}
                  onChange={(val: string) => handleItemChange(idx, "description", val)}
                  height={110}
                  isDark={isDark}
                  placeholder="Item description..."
                />
              </div>
            ))}
          </div>

          <Button
            type="dashed"
            onClick={addItem}
            block
            icon={<Plus size={16} />}
            className="mb-6 text-blue-600 border-blue-200 hover:border-blue-400 hover:text-blue-700"
          >
            Add Item
          </Button>

          {/* Totals Section */}
          <div className="flex justify-end border-t pt-4">
            <div className="w-full md:w-1/3 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Subtotal:</span>
                <span className="font-medium">
                  {items.reduce((sum, i) => sum + (i.total || 0), 0).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 w-24">Currency:</span>
                <Select
                  value={currency}
                  onChange={(val) => setCurrency(val)}
                  className="flex-1 text-right"
                >
                  <Select.Option value="EGP">EGP</Select.Option>
                  <Select.Option value="USD">USD</Select.Option>
                  <Select.Option value="EUR">EUR</Select.Option>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 w-24">Discount (%):</span>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="flex-1 text-right"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 w-24">VAT (%):</span>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  value={vat}
                  onChange={(e) => setVat(parseFloat(e.target.value) || 0)}
                  className="flex-1 text-right"
                />
              </div>

              <Divider className="my-2" />

              <div className="flex items-center justify-between">
                <Text
                  type="secondary"
                  className="text-xs uppercase tracking-wider"
                >
                  Total Amount
                </Text>
                <Title level={3} className="m-0 text-blue-600">
                  {totalAmount.toFixed(2)}
                </Title>
              </div>
            </div>
          </div>

          {/* ── Terms & Conditions (collapsible) ── */}
          <Collapse
            ghost
            className="mb-4"
            items={[
              {
                key: "terms",
                label: (
                  <span style={{ color: "#0056B3", fontWeight: 600 }}>
                    📋 Terms &amp; Conditions
                    <span
                      className="ml-2 text-xs font-normal"
                      style={{ color: isDark ? "#aaa" : "#555" }}
                    >
                      ({terms.length} condition{terms.length !== 1 ? "s" : ""})
                    </span>
                  </span>
                ),
                children: (
                  <div className="flex flex-col gap-2">
                    {terms.map((term, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <Input
                          placeholder="Label"
                          value={term.label}
                          onChange={(e) => handleTermChange(idx, "label", e.target.value)}
                          style={{ width: 120, flexShrink: 0 }}
                        />
                        <Input.TextArea
                          placeholder="Condition text..."
                          value={term.value}
                          onChange={(e) => handleTermChange(idx, "value", e.target.value)}
                          autoSize={{ minRows: 1, maxRows: 3 }}
                          className="flex-1"
                        />
                        <Tooltip title="Remove condition">
                          <Button
                            type="text"
                            danger
                            size="small"
                            icon={<X size={13} />}
                            onClick={() => removeTerm(idx)}
                          />
                        </Tooltip>
                      </div>
                    ))}
                    <Button
                      type="dashed"
                      size="small"
                      icon={<Plus size={13} />}
                      onClick={addTerm}
                      className="mt-1"
                      style={{ color: "#0056B3", borderColor: "#93C5FD", alignSelf: "flex-start" }}
                    >
                      Add Condition
                    </Button>
                  </div>
                ),
              },
            ]}
          />

          <div className="flex justify-end gap-3 mt-6">
            <div className="flex gap-3">
              <Button size="large" onClick={handleClose}>
                Close
              </Button>
              <CustomBtn
                theme={theme}
                btnTitle={
                  editingQuoteId
                    ? updateQuotation.isPending ? "Updating..." : "Update Quote"
                    : createQuotation.isPending ? "Generating..." : "Generate Quote"
                }
                onClick={() => form.submit()}
                loading={createQuotation.isPending || updateQuotation.isPending || loadingQuote}
                className="h-10 px-6"
              />
            </div>
          </div>
        </Form>
      </AppModal>
    </>
  );
};

export default NewQuoteModal;
