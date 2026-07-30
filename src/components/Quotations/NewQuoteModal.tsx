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

const DEFAULT_TERMS = [
  { label: "Validity", value: "Offer valid until the date shown above or until stock lasts." },
  { label: "Delivery", value: "Ex-warehouse Cairo / 2-4 weeks from confirmation." },
  { label: "Payment", value: "Upon inspection and receipt of goods." },
  { label: "Warranty", value: "One year against manufacturing defects." },
  { label: "Taxes", value: "VAT is applied as shown in this quotation." },
  { label: "Training", value: "Prices include installation, operation and training when applicable." },
];

const QUICK_DATES = [
  { label: "+1 Week", amount: 1, unit: "week" as const },
  { label: "+2 Weeks", amount: 2, unit: "week" as const },
  { label: "+1 Month", amount: 1, unit: "month" as const },
  { label: "+3 Months", amount: 3, unit: "month" as const },
  { label: "+6 Months", amount: 6, unit: "month" as const },
];

const NewQuoteModal = ({ isOpen, onClose, onSuccess, onPreview, editingQuoteId }: any) => {
  const { theme, isDark } = useThemeContext();
  const [form] = Form.useForm();
  const createQuotation = useCreateQuotation(isDark);
  const updateQuotation = useUpdateQuotation(isDark);

  const { data: quoteToEdit, isFetching: loadingQuote } = useGetQuotationById(editingQuoteId || null);

  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [debouncedCustomerSearch, setDebouncedCustomerSearch] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [debouncedProductSearch, setDebouncedProductSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCustomerSearch(customerSearchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [customerSearchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedProductSearch(productSearchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [productSearchTerm]);

  // Fetch Data
  const { data: customersResponse, isLoading: loadingCustomers } =
    useGetAllCustomers({ limit: 50, search: debouncedCustomerSearch });
  const customers = customersResponse?.data;
  const { data: paginatedProducts, isLoading: loadingProducts } = useGetAllProducts({ limit: 50, search: debouncedProductSearch });
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
  const [selectedCustomerName, setSelectedCustomerName] = useState("");

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
        validUntil: dayjs(quoteToEdit.q_valid_until),
      });
      setCurrency(quoteToEdit.q_currency || "EGP");
      setSelectedCustomerName(quoteToEdit.q_customer_name || "");
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
    } else if (!isOpen) {
       resetFormState();
    }
  }, [editingQuoteId, quoteToEdit, form, isOpen]);

  const handleItemChange = (index: number, field: string, value: any) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const item = { ...newItems[index], [field]: value };
      if (field === "quantity" || field === "price") {
        item.total = (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0);
      }
      newItems[index] = item;
      return newItems;
    });
  };

  const handleProductSelect = (index: number, val: any) => {
    const productId = Number(val);
    const product = products?.find((p) => Number(p.p_id) === productId);
    if (!product) return;
    const sellPrice = Number(product.p_sellprice);
    const costPrice = Number(product.p_costprice);
    const finalPrice = sellPrice > 0 ? sellPrice : costPrice;

    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = {
        ...newItems[index],
        productId: product.p_id,
        productName: product.p_name || "",
        description: product.p_description || (product.model_code ? `${product.model_code}` : ""),
        price: finalPrice || 0,
        quantity: 1,
        image: product.p_photo,
        includeImage: !!product.p_photo,
        total: 1 * (finalPrice || 0),
      };
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

    const payload = {
      customerId: values.customerId,
      customerName: selectedCustomerName || "Valued Customer",
      validUntil: values.validUntil ? values.validUntil.format("YYYY-MM-DD") : null,
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
    setSelectedCustomerName("");
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

  const subtotal = items.reduce((sum, i) => sum + (i.total || 0), 0);

  return (
    <>
      <ModalStyle />
      <AppModal
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width={1100}
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
          {/* ── Header Row: Customer / Currency / Valid Until ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            <Form.Item
              name="customerId"
              label="Customer"
              rules={[{ required: true, message: "Please select a customer" }]}
              className="mb-0"
            >
              <Select
                placeholder="Select Customer"
                showSearch
                loading={loadingCustomers}
                onSearch={setCustomerSearchTerm}
                filterOption={false}
                onSelect={(_val, option: any) => setSelectedCustomerName(option.children)}
              >
                {customers?.map((c) => (
                  <Option key={c.c_id} value={c.c_id}>
                    {c.c_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Currency" className="mb-0">
              <Select value={currency} onChange={(val) => setCurrency(val)}>
                <Select.Option value="EGP">EGP — Egyptian Pound</Select.Option>
                <Select.Option value="USD">USD — US Dollar</Select.Option>
                <Select.Option value="EUR">EUR — Euro</Select.Option>
              </Select>
            </Form.Item>

            <div>
              <Form.Item name="validUntil" label="Valid Until" className="mb-1">
                <DatePicker className="w-full" />
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

          <Divider orientation="left" style={{ color: "#0056B3", borderColor: "#D1E4F6" }}>
            <span style={{ color: "#0056B3", fontWeight: 600 }}>Quotation Items</span>
          </Divider>

          {/* ── Items List ── */}
          <div className="flex flex-col gap-4 mb-4 max-h-[520px] overflow-y-auto pr-1">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border p-4"
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,86,179,0.03)",
                  borderColor: theme.row.borderColor || "#dbeafe",
                }}
              >
                {/* Row 1 — Item number badge + image + include toggle */}
                <div className="flex gap-4 items-start mb-3">
                  {/* Item Number */}
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "#0056B3" }}
                  >
                    {idx + 1}
                  </div>

                  {/* Image block */}
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center border"
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

                  {/* Fields: search + name + description */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <Select
                        showSearch
                        value={item.productId || null}
                        placeholder="Search & select product..."
                        loading={loadingProducts}
                        onChange={(val) => handleProductSelect(idx, val)}
                        onSearch={setProductSearchTerm}
                        filterOption={false}
                        options={products?.map((p) => ({
                          value: p.p_id,
                          label: `${p.p_name} (${p.model_code || "No Model"})`,
                        }))}
                      />
                      <Input
                        placeholder="Product name (editable)"
                        value={item.productName}
                        onChange={(e) => handleItemChange(idx, "productName", e.target.value)}
                      />
                    </div>
                    <RichTextEditor
                      value={item.description}
                      onChange={(val: string) => handleItemChange(idx, "description", val)}
                      height={100}
                      isDark={isDark}
                      placeholder="Item description..."
                    />
                  </div>
                </div>

                {/* Row 2 — Qty / Price / Total / Remove */}
                <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: theme.row.borderColor || "#dbeafe" }}>
                  <Input
                    type="number"
                    prefix={<span className="text-gray-400 text-xs">Qty</span>}
                    min={1}
                    value={item.quantity}
                    onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                    className="w-24"
                  />
                  <Input
                    type="number"
                    prefix={<span className="text-gray-400 text-xs">{currency}</span>}
                    min={0}
                    step={0.01}
                    value={item.price}
                    onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                    className="w-36"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400 text-xs">Total:</span>
                    <span className="font-bold text-sm" style={{ color: theme.button.background }}>
                      {currency} {item.total?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex-1" />
                  {items.length > 1 && (
                    <Tooltip title="Remove item">
                      <Button
                        danger
                        size="small"
                        icon={<Trash size={13} />}
                        onClick={() => removeItem(idx)}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            type="dashed"
            onClick={addItem}
            block
            icon={<Plus size={15} />}
            className="mb-4"
            style={{ color: "#0056B3", borderColor: "#93C5FD", borderRadius: 8 }}
          >
            Add Item
          </Button>

          {/* ── Totals Section ── */}
          <div className="flex justify-end mb-4">
            <div
              className="w-full md:w-80 rounded-xl p-4 flex flex-col gap-3"
              style={{
                background: isDark ? "rgba(0,86,179,0.1)" : "#EBF4FF",
                border: "1px solid #BFDBFE",
              }}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{currency} {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 w-28 flex-shrink-0">Discount (%)</span>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  size="small"
                />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 w-28 flex-shrink-0">VAT (%)</span>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  value={vat}
                  onChange={(e) => setVat(parseFloat(e.target.value) || 0)}
                  size="small"
                />
              </div>

              <Divider className="my-1" />

              <div className="flex items-center justify-between">
                <Text type="secondary" className="text-xs uppercase tracking-wider">Total Amount</Text>
                <Title level={4} className="m-0" style={{ color: "#0056B3" }}>
                  {currency} {totalAmount.toFixed(2)}
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

          {/* ── Action Buttons ── */}
          <div className="flex justify-end gap-3 mt-2">
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
        </Form>
      </AppModal>
    </>
  );
};

export default NewQuoteModal;
