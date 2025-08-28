import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  InputNumber,
  Divider,
} from "antd";
import type { Sales } from "@src/types/Sales/sales";
import type { Theme } from "@src/types/theme";
import type { Customer } from "@src/types/Customers/customer";
import ModalStyle from "@src/components/UI/ModalStyle";
import { useThemeContext } from "@src/contexts/useThemeContext";
import { useCreateSale } from "@src/queries/Sales";
import { useGetAllCustomers } from "@src/queries/Customers";
import { useState, useEffect } from "react";
import CustomBtn from "@src/components/UI/customBtn";
import dayjs from "dayjs";

const { Option } = Select;

interface AddSaleModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

interface SaleFormValues extends Omit<Sales, "sl_id" | "customer"> {
  customer_id: number;
  adddum_items?: string; // Comma-separated product IDs for additional items
}

const AddSaleModal = ({ modalOpen, onClose, theme }: AddSaleModalProps) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const createSale = useCreateSale(isDark);
  const { data: customers, isLoading: loadingCustomers } = useGetAllCustomers();

  const [saleType, setSaleType] = useState<string>("");
  const [calculatedTotal, setCalculatedTotal] = useState<number>(0);

  // Reset form when modal opens
  useEffect(() => {
    if (modalOpen) {
      form.resetFields();
      setSaleType("");
      setCalculatedTotal(0);
    }
  }, [modalOpen, form]);

  // Calculate total whenever cost, discount, or tax changes
  const calculateTotal = () => {
    const cost = form.getFieldValue("sl_cost") || 0;
    const discount = form.getFieldValue("sl_discount") || 0;
    const tax = form.getFieldValue("sl_tax") || 0;

    const total = cost - discount + tax;
    setCalculatedTotal(total);
    form.setFieldsValue({ sl_total: total });
  };

  const handleSaleTypeChange = (value: string) => {
    setSaleType(value);
  };

  const onFinish = async (values: SaleFormValues) => {
    try {
      // Format the data according to your API structure
      const saleData: Partial<Sales> = {
        sl_type: values.sl_type,
        customer: { c_id: values.customer_id },
        sl_billnum: values.sl_billnum,
        sl_cost: values.sl_cost || 0,
        sl_discount: values.sl_discount || 0,
        sl_tax: values.sl_tax || 0,
        sl_payed: values.sl_payed || 0,
        sl_inamount: values.sl_inamount || 0,
        sl_status: values.sl_status,
        sl_currency: values.sl_currency,
        sl_date: dayjs(values.sl_date).format("YYYY-MM-DD"),
        sl_total: calculatedTotal,
        due_date: dayjs(values.due_date).format("YYYY-MM-DD"),
        in_due_date: dayjs(values.in_due_date).format("YYYY-MM-DD"),
      };

      // Add adddum data if sale type is REPAIR
      if (values.sl_type === "REPAIR" && values.adddum_items) {
        const adddum: { [key: string]: number } = {};
        values.adddum_items
          .split(",")
          .forEach((item: string, index: number) => {
            const trimmedItem = item.trim();
            if (trimmedItem) {
              adddum[index.toString()] = parseInt(trimmedItem);
            }
          });
        saleData.adddum = adddum;
      }

      await createSale.mutateAsync(saleData);
      form.resetFields();
      setSaleType("");
      setCalculatedTotal(0);
      onClose();
    } catch (error) {
      console.error("Error creating sale:", error);
    }
  };

  return (
    <>
      <ModalStyle theme={theme} />
      <Modal
        className="custom-modal"
        title="Add New Sale"
        open={modalOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={900}
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
            {/* Left Column */}
            <Col span={12}>
              <Form.Item
                name="sl_type"
                label="Sale Type"
                rules={[{ required: true, message: "Please select sale type" }]}
              >
                <Select
                  placeholder="Select sale type"
                  onChange={handleSaleTypeChange}
                >
                  <Option value="REPAIR">Repair</Option>
                  <Option value="SELLITEMS">Sell Items</Option>
                  <Option value="SERVICE">Service</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="customer_id"
                label="Customer"
                rules={[
                  { required: true, message: "Please select a customer" },
                ]}
              >
                <Select
                  placeholder="Select customer"
                  showSearch
                  loading={loadingCustomers}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {customers?.map((customer: Customer) => (
                    <Option key={customer.c_id} value={customer.c_id}>
                      {customer.c_name} - {customer.c_email}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="sl_billnum"
                    label="Bill Number"
                    rules={[
                      { required: true, message: "Please enter bill number" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Enter bill number"
                      style={{ width: "100%" }}
                      min={1}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="sl_status"
                    label="Status"
                    rules={[
                      { required: true, message: "Please select status" },
                    ]}
                  >
                    <Select placeholder="Select status">
                      <Option value="PENDING">Pending</Option>
                      <Option value="COMPLETED">Completed</Option>
                      <Option value="CANCELLED">Cancelled</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="sl_currency"
                    label="Currency"
                    rules={[
                      { required: true, message: "Please select currency" },
                    ]}
                  >
                    <Select placeholder="Select currency">
                      <Option value="EGP">EGP</Option>
                      <Option value="USD">USD</Option>
                      <Option value="EUR">EUR</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="sl_date"
                    label="Sale Date"
                    rules={[
                      { required: true, message: "Please select sale date" },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              {saleType === "REPAIR" && (
                <Form.Item
                  name="adddum_items"
                  label="Additional Items (Product IDs)"
                  tooltip="Enter product IDs separated by commas (e.g., 359, 360)"
                >
                  <Input.TextArea
                    placeholder="Enter product IDs separated by commas"
                    rows={3}
                  />
                </Form.Item>
              )}
            </Col>

            {/* Right Column */}
            <Col span={12}>
              <Form.Item
                name="sl_cost"
                label="Cost"
                rules={[{ required: true, message: "Please enter cost" }]}
              >
                <InputNumber
                  placeholder="Enter cost"
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  onChange={calculateTotal}
                />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="sl_discount" label="Discount">
                    <InputNumber
                      placeholder="Enter discount"
                      style={{ width: "100%" }}
                      min={0}
                      step={0.01}
                      onChange={calculateTotal}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="sl_tax" label="Tax">
                    <InputNumber
                      placeholder="Enter tax"
                      style={{ width: "100%" }}
                      min={0}
                      step={0.01}
                      onChange={calculateTotal}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="sl_total" label="Total Amount">
                <InputNumber
                  placeholder="Total (auto-calculated)"
                  style={{ width: "100%" }}
                  value={calculatedTotal}
                  readOnly
                />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="sl_payed" label="Amount Paid">
                    <InputNumber
                      placeholder="Enter amount paid"
                      style={{ width: "100%" }}
                      min={0}
                      step={0.01}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="sl_inamount" label="Insurance Amount">
                    <InputNumber
                      placeholder="Enter insurance amount"
                      style={{ width: "100%" }}
                      min={0}
                      step={0.01}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="due_date"
                    label="Due Date"
                    rules={[
                      { required: true, message: "Please select due date" },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="in_due_date"
                    label="Insurance Due Date"
                    rules={[
                      {
                        required: true,
                        message: "Please select insurance due date",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider />

          <Form.Item>
            <div className="flex justify-end gap-4">
              <Button
                onClick={onClose}
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
                btnTitle="Create Sale"
                onClick={() => form.submit()}
                // loading={createSale.isPending}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddSaleModal;
