import { Form, InputNumber, DatePicker } from "antd";

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
    <div className="w-full md:w-1/2 flex flex-col gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
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
        </div>
        <div className="w-full">
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
        </div>
      </div>

      <Form.Item name="sl_total" label="Total Amount" className="mb-0">
        <InputNumber
          placeholder="Total (auto-calculated)"
          style={{ width: "100%" }}
          value={calculatedTotal}
          readOnly
        />
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <Form.Item name="sl_payed" label="Amount Paid">
            <InputNumber
              placeholder="Enter amount paid"
              style={{ width: "100%" }}
              min={0}
              step={0.01}
              onChange={(value) => onAmountPaidChange(value || 0)}
            />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item name="sl_inamount" label="Insurance Amount">
            <InputNumber
              placeholder="Enter insurance amount"
              style={{ width: "100%" }}
              min={0}
              step={0.01}
              onChange={(value) => onInsuranceAmountChange(value || 0)}
            />
          </Form.Item>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shouldShowDueDate && (
          <div className={shouldShowInsuranceDueDate ? "w-full" : "w-full md:col-span-2"}>
            <Form.Item
              name="due_date"
              label="Due Date"
              rules={[{ required: true, message: "Please select due date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>
        )}
        {shouldShowInsuranceDueDate && (
          <div className={shouldShowDueDate ? "w-full" : "w-full md:col-span-2"}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleFinancialInfo;
