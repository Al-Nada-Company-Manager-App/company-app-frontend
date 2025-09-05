import { Form, Col, InputNumber, Select } from "antd";

const { Option } = Select;

const PurchaseFinancialInfo = () => {
  return (
    <Col span={12}>
      <Form.Item
        name="pch_total"
        label="Total Amount"
        rules={[{ required: true, message: "Please enter total amount" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          step={0.01}
          placeholder="0.00"
        />
      </Form.Item>

      <Form.Item name="pch_tax" label="Tax">
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          step={0.01}
          placeholder="0.00"
        />
      </Form.Item>

      <Form.Item name="pch_cost" label="Cost">
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          step={0.01}
          placeholder="0.00"
        />
      </Form.Item>

      <Form.Item name="pch_currency" label="Currency">
        <Select placeholder="Select currency">
          <Option value="USD">USD</Option>
          <Option value="EUR">EUR</Option>
          <Option value="EGP">EGP</Option>
        </Select>
      </Form.Item>

      <Form.Item name="pch_expense" label="Expense">
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          step={0.01}
          placeholder="0.00"
        />
      </Form.Item>

      <Form.Item name="pch_customscost" label="Customs Cost">
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          step={0.01}
          placeholder="0.00"
        />
      </Form.Item>

      <Form.Item name="pch_customsnum" label="Customs Number">
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter customs number"
        />
      </Form.Item>
    </Col>
  );
};

export default PurchaseFinancialInfo;
