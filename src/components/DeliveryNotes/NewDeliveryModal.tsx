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
import { useCreateDelivery, useUpdateDelivery, useGetDeliveryById } from "@src/queries/DeliveryNotes";
import dayjs from "dayjs";
import AppModal from "@src/components/UI/AppModal";
import ModalStyle from "@src/components/UI/ModalStyle";

const { Option } = Select;
const { TextArea } = Input;

interface NewDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (id: number) => void;
  editingDeliveryId: number | null;
  onPreview?: (id: number) => void;
}

const NewDeliveryModal: React.FC<NewDeliveryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editingDeliveryId,
  onPreview,
}) => {
  const [form] = Form.useForm();
  const { user } = useAuthContext();
  const { theme, isDark } = useThemeContext();
  
  const { data: customersData, isLoading: loadingCustomers } = useGetAllCustomers({ page: 1, limit: 1000 });
  const customers = customersData?.data || [];
  
  const { data: stockData } = useGetAllProducts({ limit: 1000 });
  const stockItems = stockData?.data || [];

  const createDelivery = useCreateDelivery();
  const updateDelivery = useUpdateDelivery();
  
  const { data: deliveryToEdit, isLoading: loadingEdit } = useGetDeliveryById(editingDeliveryId);

  const [items, setItems] = useState<any[]>([{ productName: "", serialNumber: "", quantity: 1, model: "", notes: "" }]);

  useEffect(() => {
    if (!isOpen) return;

    if (editingDeliveryId && deliveryToEdit) {
      form.setFieldsValue({
        customerId: deliveryToEdit.c_id,
        date: dayjs(deliveryToEdit.dn_date),
        notes: deliveryToEdit.dn_notes,
        address: deliveryToEdit.dn_address,
        receiverName: deliveryToEdit.dn_receiver_name,
        taxId: deliveryToEdit.dn_tax_id,
        phone: deliveryToEdit.dn_phone,
        nationalId: deliveryToEdit.dn_national_id,
      });

      if (deliveryToEdit.delivery_items && deliveryToEdit.delivery_items.length > 0) {
        setItems(deliveryToEdit.delivery_items.map((ri: any) => ({
          productName: ri.dni_product_name,
          serialNumber: ri.dni_serial_number || "",
          quantity: ri.dni_quantity,
          model: ri.dni_model || "",
          manf: ri.dni_manf || "",
          notes: ri.dni_notes || "",
        })));
      }
    } else {
      // Set defaults for new delivery
      form.setFieldsValue({
        date: dayjs(),
        nationalId: user?.e_national_id || "",
      });
      setItems([{ productName: "", serialNumber: "", quantity: 1, model: "", manf: "", notes: "" }]);
    }
  }, [isOpen, editingDeliveryId, deliveryToEdit, form, user]);

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

  const handleCustomerChange = (val: number) => {
    const customer = customers.find((c: any) => c.c_id === val);
    if (customer) {
      form.setFieldsValue({
        address: customer.c_address || "",
        phone: customer.c_phone || "",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const payload = {
        address: values.address,
        receiverName: values.receiverName,
        taxId: values.taxId,
        phone: values.phone,
        nationalId: values.nationalId,
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

      if (editingDeliveryId) {
        updateDelivery.mutate({ id: editingDeliveryId, data: payload }, {
          onSuccess: (data) => {
            if (onPreview) onPreview(data.data.dn_id);
            onSuccess(data.data.dn_id);
          }
        });
      } else {
        createDelivery.mutate(payload, {
          onSuccess: (data) => {
            if (onPreview) onPreview(data.data.dn_id);
            onSuccess(data.data.dn_id);
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
        isLoading={loadingEdit || createDelivery.isPending || updateDelivery.isPending}
        title={
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-semibold">
              {editingDeliveryId ? "Edit Delivery Note" : "New Delivery Note"}
            </span>
            <Tag color="blue" className="ml-2">إذن تسليم بضاعة</Tag>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Top Section: Employee & Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <Form.Item name="customerId" label="Customer" rules={[{ required: true, message: "Required" }]}>
                <Select showSearch placeholder="Select Customer" loading={loadingCustomers} optionFilterProp="children" onChange={handleCustomerChange}>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="w-full">
              <Form.Item name="receiverName" label="Receiver Name (اسم المستلم)">
                <Input size="large" />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item name="address" label="Address (العنوان)">
                <Input size="large" />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item name="taxId" label="Tax ID (الرقم الضريبي)">
                <Input size="large" />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item name="phone" label="Phone (رقم التليفون)">
                <Input size="large" />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item name="nationalId" label="National ID (الرقم القومي)">
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
                placeholder="Any additional notes for the delivery..."
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
              loading={createDelivery.isPending || updateDelivery.isPending}
            >
              {editingDeliveryId ? "Update Delivery" : "Generate Delivery"}
            </Button>
          </div>
        </Form>
      </AppModal>
    </>
  );
};

export default NewDeliveryModal;
