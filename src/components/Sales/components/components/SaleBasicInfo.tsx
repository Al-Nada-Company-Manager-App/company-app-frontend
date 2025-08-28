import {
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  InputNumber,
  Space,
  Typography,
} from "antd";
import type { Customer } from "@src/types/Customers/customer";

const { Option } = Select;
const { Link } = Typography;

interface SaleBasicInfoProps {
  customers?: Customer[];
  loadingCustomers: boolean;
  saleType: string;
  onSaleTypeChange: (value: string) => void;
  onOpenCustomersPage: () => void;
}

const SaleBasicInfo = ({
  customers,
  loadingCustomers,
  onSaleTypeChange,
  onOpenCustomersPage,
}: SaleBasicInfoProps) => {
  return (
    <Col span={12}>
      <Form.Item
        name="sl_type"
        label="Sale Type"
        rules={[{ required: true, message: "Please select sale type" }]}
      >
        <Select placeholder="Select sale type" onChange={onSaleTypeChange}>
          <Option value="REPAIR">Repair</Option>
          <Option value="SELLITEMS">Sell Items</Option>
          <Option value="SERVICE">Service</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="customer_id"
        label={
          <Space>
            <span>Customer</span>
            <Link onClick={onOpenCustomersPage} style={{ fontSize: "12px" }}>
              Don't see your customer? Add new customer
            </Link>
          </Space>
        }
        rules={[{ required: true, message: "Please select a customer" }]}
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
            rules={[{ required: true, message: "Please enter bill number" }]}
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
            rules={[{ required: true, message: "Please select status" }]}
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
            rules={[{ required: true, message: "Please select currency" }]}
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
            rules={[{ required: true, message: "Please select sale date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
    </Col>
  );
};

export default SaleBasicInfo;
