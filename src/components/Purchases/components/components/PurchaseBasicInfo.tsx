import {
  Form,
  Col,
  Select,
  DatePicker,
  InputNumber,
  Space,
  Typography,
} from "antd";
import type { Supplier } from "@src/types/Suppliers/supplier";

const { Option } = Select;
const { Link } = Typography;

interface PurchaseBasicInfoProps {
  suppliers?: Supplier[];
  loadingSuppliers: boolean;
  onOpenSuppliersPage: () => void;
}

const PurchaseBasicInfo = ({
  suppliers,
  loadingSuppliers,
  onOpenSuppliersPage,
}: PurchaseBasicInfoProps) => {
  return (
    <Col span={12}>
      <Form.Item
        name="supplier_id"
        label={
          <Space>
            <span>Supplier</span>
            <Link onClick={onOpenSuppliersPage} style={{ fontSize: "12px" }}>
              Don't see your supplier? Add new supplier
            </Link>
          </Space>
        }
        rules={[{ required: true, message: "Please select a supplier" }]}
      >
        <Select
          placeholder="Select a supplier"
          loading={loadingSuppliers}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.children as unknown as string)
              ?.toLowerCase()
              ?.includes(input.toLowerCase())
          }
        >
          {suppliers?.map((supplier) => (
            <Option key={supplier.s_id} value={supplier.s_id}>
              {supplier.s_name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="pch_date"
        label="Purchase Date"
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="pch_billnum"
        label="Bill Number"
        rules={[{ required: true, message: "Please enter bill number" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter bill number"
        />
      </Form.Item>
    </Col>
  );
};

export default PurchaseBasicInfo;
