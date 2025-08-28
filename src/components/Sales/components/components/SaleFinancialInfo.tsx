import { Form, Row, Col, InputNumber, DatePicker } from "antd";

interface SaleFinancialInfoProps {
  saleType: string;
  calculatedTotal: number;
  shouldShowDueDate: boolean;
  shouldShowInsuranceDueDate: boolean;
  onCalculateTotal: () => void;
  onDiscountChange: (value: number) => void;
  onTaxChange: (value: number) => void;
  onAmountPaidChange: (value: number) => void;
  onInsuranceAmountChange: (value: number) => void;
}

const SaleFinancialInfo = ({
  saleType,
  calculatedTotal,
  shouldShowDueDate,
  shouldShowInsuranceDueDate,
  onCalculateTotal,
  onDiscountChange,
  onTaxChange,
  onAmountPaidChange,
  onInsuranceAmountChange,
}: SaleFinancialInfoProps) => {
  return (
    <Col span={12}>
      {saleType !== "SELLITEMS" && (
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
            onChange={onCalculateTotal}
          />
        </Form.Item>
      )}

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item name="discount_percentage" label="Discount (%)">
            <InputNumber
              placeholder="Enter discount %"
              style={{ width: "100%" }}
              min={0}
              max={100}
              step={0.01}
              onChange={(value) => onDiscountChange(value || 0)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="tax_percentage" label="Tax (%)">
            <InputNumber
              placeholder="Enter tax %"
              style={{ width: "100%" }}
              min={0}
              max={100}
              step={0.01}
              onChange={(value) => onTaxChange(value || 0)}
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
              onChange={(value) => onAmountPaidChange(value || 0)}
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
              onChange={(value) => onInsuranceAmountChange(value || 0)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {shouldShowDueDate && (
          <Col span={shouldShowInsuranceDueDate ? 12 : 24}>
            <Form.Item
              name="due_date"
              label="Due Date"
              rules={[{ required: true, message: "Please select due date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        )}
        {shouldShowInsuranceDueDate && (
          <Col span={shouldShowDueDate ? 12 : 24}>
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
        )}
      </Row>
    </Col>
  );
};

export default SaleFinancialInfo;
