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
} from "antd";
import { Plus, Trash, FileText, Image as ImageIcon } from "lucide-react";
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
  const { data: products, isLoading: loadingProducts } = useGetAllProducts();

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
              <Form.Item name="validUntil" label="Valid Until">
                <DatePicker className="w-full" size="large" />
              </Form.Item>
            </div>
          </div>

          <Divider orientation="left">Items</Divider>

          {/* Items List */}
          <div className="max-h-[500px] overflow-y-auto pr-2 mb-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3 items-start mb-6 p-4 rounded-lg border"
                style={{
                  background: theme.row.hoverBackground || "rgba(0,0,0,0.02)",
                  borderColor: theme.row.borderColor || "#eee",
                }}
              >
                {/* Product Image Thumbnail & Toggle */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-20 h-20 flex-shrink-0 rounded overflow-hidden flex items-center justify-center border"
                    style={{ background: theme.row.borderColor || "#f5f5f5" }}
                  >
                    {item.image ? (
                      <img
                        src={getImageUrl("products", item.image)}
                        alt="Product"
                        className="w-full h-full object-cover"
                        style={{ opacity: item.includeImage ? 1 : 0.5 }}
                      />
                    ) : (
                      <ImageIcon size={24} className="text-gray-400" />
                    )}
                  </div>
                  {item.image && (
                    <Checkbox
                      checked={item.includeImage}
                      onChange={(e) =>
                        handleItemChange(idx, "includeImage", e.target.checked)
                      }
                      style={{ fontSize: "10px" }}
                    >
                      Show
                    </Checkbox>
                  )}
                </div>

                <div className="flex-1 grid grid-cols-1 gap-3">
                  {/* Product Name & Search */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Select
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
                    <Input
                      placeholder="Product Name"
                      value={item.productName}
                      onChange={(e) =>
                        handleItemChange(idx, "productName", e.target.value)
                      }
                    />
                  </div>

                  {/* Rich Text Editor */}
                  <div className="mb-2">
                    <RichTextEditor
                      value={item.description}
                      onChange={(val: string) =>
                        handleItemChange(idx, "description", val)
                      }
                      height={110}
                      isDark={isDark}
                      placeholder="Item description..."
                    />
                  </div>
                </div>

                {/* Qty & Price Side Column */}
                <div className="flex flex-col gap-2 w-28">
                  <Input
                    type="number"
                    prefix="Qty"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(idx, "quantity", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    prefix={currency}
                    min={0}
                    step={0.01}
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(idx, "price", e.target.value)
                    }
                  />
                  <div
                    className="text-right font-bold mt-1"
                    style={{ color: theme.button.background }}
                  >
                    {item.total?.toFixed(2)}
                  </div>
                  {items.length > 1 && (
                    <Button
                      danger
                      size="small"
                      icon={<Trash size={14} />}
                      onClick={() => removeItem(idx)}
                      block
                    >
                      Remove
                    </Button>
                  )}
                </div>
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

          <div className="flex justify-end gap-3 mt-6">
            {" "}
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
