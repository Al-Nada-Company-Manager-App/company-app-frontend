import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Popconfirm,
  Divider,
  Tag,
} from "antd";
import { Plus, Trash } from "lucide-react";
import { useAuthContext } from "@src/contexts/auth";
import { useThemeContext } from "@src/contexts/theme";
import RichTextEditor from "@src/components/UI/RichTextEditor";
import { useGetAllCustomers } from "@src/queries/Customers/customerQueries";
import { useGetAllProducts } from "@src/queries/Products/productQueries";
import { useCreateReceipt, useUpdateReceipt, useGetReceiptById } from "@src/queries/Receipts";
import dayjs from "dayjs";
import AppModal from "@src/components/UI/AppModal";
import ModalStyle from "@src/components/UI/ModalStyle";

const { Option } = Select;
const { TextArea } = Input;

interface NewReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (id: number) => void;
  editingReceiptId: number | null;
  onPreview?: (id: number) => void;
}

const NewReceiptModal: React.FC<NewReceiptModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editingReceiptId,
  onPreview,
}) => {
  const [form] = Form.useForm();
  const { user } = useAuthContext();
  const { theme, isDark } = useThemeContext();
  
  const { data: customersData, isLoading: loadingCustomers } = useGetAllCustomers({ page: 1, limit: 1000 });
  const customers = customersData?.data || [];
  
  const { data: stockData } = useGetAllProducts({ limit: 1000 });
  const stockItems = stockData?.data || [];

  const createReceipt = useCreateReceipt();
  const updateReceipt = useUpdateReceipt();
  
  const { data: receiptToEdit, isLoading: loadingEdit } = useGetReceiptById(editingReceiptId);

  const [items, setItems] = useState<any[]>([{ productName: "", serialNumber: "", quantity: 1, model: "", notes: "" }]);

  useEffect(() => {
    if (!isOpen) return;

    if (editingReceiptId && receiptToEdit) {
      form.setFieldsValue({
        customerId: receiptToEdit.c_id,
        date: dayjs(receiptToEdit.rn_date),
        notes: receiptToEdit.rn_notes,
        employeeName: receiptToEdit.rn_employee_name,
        nationalId: receiptToEdit.rn_national_id,
        role: receiptToEdit.rn_role,
      });

      if (receiptToEdit.receipt_items && receiptToEdit.receipt_items.length > 0) {
        setItems(receiptToEdit.receipt_items.map((ri: any) => ({
          productName: ri.rni_product_name,
          serialNumber: ri.rni_serial_number || "",
          quantity: ri.rni_quantity,
          model: ri.rni_model || "",
          manf: ri.rni_manf || "",
          notes: ri.rni_notes || "",
        })));
      }
    } else {
      // Set defaults for new receipt
      form.setFieldsValue({
        date: dayjs(),
        employeeName: `${user?.f_name || ""} ${user?.l_name || ""}`.trim(),
        nationalId: user?.e_national_id || "",
        role: user?.e_role || "",
      });
      setItems([{ productName: "", serialNumber: "", quantity: 1, model: "", manf: "", notes: "" }]);
    }
  }, [isOpen, editingReceiptId, receiptToEdit, form, user]);

  const handleAddItem = () => {
    setItems([...items, { productName: "", serialNumber: "", quantity: 1, model: "", manf: "", notes: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    // Auto fill if selecting a stock item
    if (field === "productName") {
      const stockItem = stockItems.find((s: any) => s.p_name === value);
      if (stockItem) {
        if (!newItems[index].model && stockItem.model_code) newItems[index].model = stockItem.model_code;
        if (!newItems[index].serialNumber && stockItem.serial_number) newItems[index].serialNumber = stockItem.serial_number;
      }
    }
    
    setItems(newItems);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const payload = {
        employeeId: user?.e_id,
        employeeName: values.employeeName,
        nationalId: values.nationalId,
        role: values.role,
        customerId: values.customerId,
        customerName: customers.find((c: any) => c.c_id === values.customerId)?.c_name || "",
        date: values.date.toDate(),
        notes: values.notes || "",
        items: items.map(item => ({
          productName: item.productName,
          serialNumber: item.serialNumber,
          quantity: parseInt(item.quantity) || 1,
          model: item.model,
          manf: item.manf,
          notes: item.notes,
        })).filter(i => i.productName), // Filter out empty names
      };

      if (editingReceiptId) {
        updateReceipt.mutate({ id: editingReceiptId, data: payload }, {
          onSuccess: (data) => {
            if (onPreview) onPreview(data.data.rn_id);
            onSuccess(data.data.rn_id);
          }
        });
      } else {
        createReceipt.mutate(payload, {
          onSuccess: (data) => {
            if (onPreview) onPreview(data.data.rn_id);
            onSuccess(data.data.rn_id);
          }
        });
      }
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setItems([{ productName: "", serialNumber: "", quantity: 1, model: "", manf: "", notes: "" }]);
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
        isLoading={loadingEdit || createReceipt.isPending || updateReceipt.isPending}
        title={
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-semibold">
              {editingReceiptId ? "Edit Receipt Note" : "New Receipt Note"}
            </span>
            <Tag color="blue" className="ml-2">إذن استلام بضاعة</Tag>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Top Section: Employee & Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <Form.Item name="customerId" label="Customer" rules={[{ required: true, message: "Required" }]}>
                <Select showSearch placeholder="Select Customer" loading={loadingCustomers} optionFilterProp="children">
                  {customers?.map((c: any) => (
                    <Option key={c.c_id} value={c.c_id}>{c.c_name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                <DatePicker className="w-full" size="large" />
              </Form.Item>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="w-full">
              <Form.Item name="employeeName" label="Employee Name" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item name="nationalId" label="National ID (رقم قومي)" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item name="role" label="Role / Capacity (بصفتي)" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </div>
          </div>

          <Divider className="my-2" />

          <Divider orientation="left">Items</Divider>

          <div className="max-h-[500px] overflow-y-auto pr-2 mb-4">
            {items.map((item, index) => (
              <div
                key={index}
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
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <Select
                      className="w-full"
                      showSearch
                      placeholder="Search Product..."
                      value={item.productName || null}
                      onChange={(val) => handleItemChange(index, "productName", val)}
                      filterOption={(input, option) =>
                        ((option?.label as string) || "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={Array.from(new Set(stockItems.map((s: any) => s.p_name))).map((name: any) => ({
                        value: name,
                        label: name,
                      }))}
                    />
                  </div>
                  {items.length > 1 && (
                    <Button
                      danger
                      type="text"
                      className="mt-1 sm:mt-0 px-2"
                      icon={<Trash size={16} />}
                      onClick={() => handleRemoveItem(index)}
                    />
                  )}
                </div>

                {/* Middle Section: Inputs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <Input
                        prefix={<span className="text-gray-400 text-xs">S/N</span>}
                        placeholder="Serial Number"
                        value={item.serialNumber}
                        onChange={(e) => handleItemChange(index, "serialNumber", e.target.value)}
                      />
                      <Input
                        prefix={<span className="text-gray-400 text-xs">Model</span>}
                        placeholder="Model"
                        value={item.model}
                        onChange={(e) => handleItemChange(index, "model", e.target.value)}
                      />
                      <Input
                        prefix={<span className="text-gray-400 text-xs">Manf</span>}
                        placeholder="Manufacturer"
                        value={item.manf}
                        onChange={(e) => handleItemChange(index, "manf", e.target.value)}
                      />
                      <Input
                        type="number"
                        prefix={<span className="text-gray-400 text-xs">Qty</span>}
                        min={1}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <RichTextEditor
                  value={item.notes}
                  onChange={(val: string) => handleItemChange(index, "notes", val)}
                  height={110}
                  isDark={isDark}
                  placeholder="Notes (ملاحظات - Condition, accessories, etc.)"
                />
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center py-8 text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                No items added. Click "Add Item" to begin.
              </div>
            )}
          </div>

          <Button
            type="dashed"
            onClick={handleAddItem}
            block
            icon={<Plus size={16} />}
            className="mb-6 text-blue-600 border-blue-200 hover:border-blue-400 hover:text-blue-700"
          >
            Add Item
          </Button>

          <Divider className="my-2" />

          {/* Notes Section */}
          <div className="mb-4">
            <Form.Item name="notes" label="General Notes (ملاحظات عامة)">
              <RichTextEditor
                isDark={isDark}
                placeholder="Any additional notes for the receipt..."
                height={150}
              />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button onClick={handleClose} size="large">Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={createReceipt.isPending || updateReceipt.isPending}
            >
              {editingReceiptId ? "Update Receipt" : "Generate Receipt"}
            </Button>
          </div>
        </Form>
      </AppModal>
    </>
  );
};

export default NewReceiptModal;
