import {
  Modal,
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import { Plus, Trash, FileText } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import { useThemeContext } from "@src/contexts/theme";
import CustomBtn from "@src/components/UI/customBtn";
import { useCreateQuotation } from "@src/queries/Quotations";

const { Title, Text } = Typography;

const NewQuoteModal = ({ isOpen, onClose, onSuccess }: any) => {
  const { theme, isDark } = useThemeContext();
  const [form] = Form.useForm();
  const createQuotation = useCreateQuotation(isDark);

  const [items, setItems] = useState<any[]>([
    { productName: "", description: "", quantity: 1, price: 0, total: 0 },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Recalculate totals
  const calculateTotal = useCallback(() => {
    const total = items.reduce((sum, item) => sum + (item.total || 0), 0);
    setTotalAmount(total);
  }, [items]);

  useEffect(() => {
    calculateTotal();
  }, [items, calculateTotal]);

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    const item = { ...newItems[index], [field]: value };

    if (field === "quantity" || field === "price") {
      item.total =
        (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0);
    }

    newItems[index] = item;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { productName: "", description: "", quantity: 1, price: 0, total: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (values: any) => {
    const payload = {
      customerName: values.customerName,
      validUntil: values.validUntil
        ? values.validUntil.format("YYYY-MM-DD")
        : null,
      items: items.map((item) => ({
        productName: item.productName,
        description: item.description,
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price),
      })),
    };

    createQuotation.mutate(payload, {
      onSuccess: (data) => {
        window.open(`http://localhost:4000${data.pdfUrl}`, "_blank");
        onSuccess();
        onClose();
        form.resetFields();
        setItems([
          { productName: "", description: "", quantity: 1, price: 0, total: 0 },
        ]);
      },
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={900}
      title={
        <div className="flex items-center gap-2">
          <FileText className="text-blue-600" size={20} />
          <span>New Price Quotation</span>
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
        {/* Customer Info */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[
                { required: true, message: "Please enter customer name" },
              ]}
            >
              <Input placeholder="e.g. Acme Corp" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="validUntil" label="Valid Until">
              <DatePicker className="w-full" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Items</Divider>

        {/* Items List */}
        <div className="max-h-[400px] overflow-y-auto pr-2 mb-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-3 items-start mb-3 bg-gray-50 p-3 rounded-lg border border-gray-100"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  placeholder="Product Name"
                  value={item.productName}
                  onChange={(e) =>
                    handleItemChange(idx, "productName", e.target.value)
                  }
                  status={!item.productName && idx === 0 ? "" : ""} // Simple validation visual check
                />
                <Input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(idx, "description", e.target.value)
                  }
                />
              </div>
              <div className="w-20">
                <Input
                  type="number"
                  min={1}
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(idx, "quantity", e.target.value)
                  }
                />
              </div>
              <div className="w-28">
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  prefix="$"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(idx, "price", e.target.value)
                  }
                />
              </div>
              <div className="w-24 pt-1 text-right font-medium">
                ${item.total?.toFixed(2)}
              </div>
              {items.length > 1 && (
                <Button
                  type="text"
                  danger
                  icon={<Trash size={16} />}
                  onClick={() => removeItem(idx)}
                />
              )}
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

        {/* Total Footer */}
        <div className="flex justify-end items-end gap-4 border-t pt-4">
          <div className="text-right mr-4">
            <Text
              type="secondary"
              className="block text-xs uppercase tracking-wider"
            >
              Total Amount
            </Text>
            <Title level={3} className="m-0 text-blue-600">
              ${totalAmount.toFixed(2)}
            </Title>
          </div>
          <div className="flex gap-3">
            <Button size="large" onClick={onClose}>
              Cancel
            </Button>
            <CustomBtn
              theme={theme}
              btnTitle={
                createQuotation.isPending ? "Generating..." : "Generate Quote"
              }
              onClick={() => form.submit()}
              loading={createQuotation.isPending}
              className="h-10 px-6"
            />
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default NewQuoteModal;
