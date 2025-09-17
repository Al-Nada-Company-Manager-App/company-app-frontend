import { Modal, Form, Input, DatePicker, Button, Row, Col } from "antd";
import type { Debt } from "@src/types/Debts/debt";
import type { Theme } from "@src/types/theme";
import { useUpdateDebt } from "@src/queries/Debts";
import { useThemeContext } from "@src/contexts/theme";
import { useState } from "react";
import CustomBtn from "@src/components/UI/customBtn";
import moment from "moment";

interface UpdateDebtModalProps {
  modalOpen: boolean;
  onClose: () => void;
  debt: Debt | null;
  theme: Theme;
}

const UpdateDebtModal = ({
  modalOpen,
  onClose,
  debt,
  theme,
}: UpdateDebtModalProps) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const updateDebt = useUpdateDebt(isDark);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Partial<Debt>) => {
    if (!debt) return;

    setLoading(true);
    try {
      const updatedDebt: Partial<Debt> = {
        ...values,
        d_date: values.d_date
          ? moment(values.d_date).format("YYYY-MM-DD")
          : debt.d_date,
        d_type: debt.d_type,
        sl_id: debt.sl_id,
      };

      await updateDebt.mutateAsync({
        id: debt.d_id,
        debtData: updatedDebt,
      });

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error updating debt:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!debt) return null;

  return (
    <Modal
      className="custom-modal"
      title="Update Debt"
      open={modalOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          d_type: debt.d_type,
          d_amount: debt.d_amount,
          d_currency: debt.d_currency,
          d_date: moment(debt.d_date),
        }}
        style={{ maxWidth: "100%", marginTop: "20px" }}
      >
        <Form.Item
          name="d_amount"
          label="Debt Amount"
          rules={[
            {
              required: true,
              message: "Please enter the debt amount",
            },
          ]}
        >
          <Input
            type="number"
            placeholder="Enter debt amount"
            step={0.01}
          />
        </Form.Item>

        <Form.Item
          name="d_date"
          label="Debt Date"
          rules={[
            {
              required: true,
              message: "Please select the debt date",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Select debt date"
            format="YYYY-MM-DD"
          />
        </Form.Item>

        {/* Sale Information (Read-only) */}
        <div
          style={{
            background: theme.container?.background,
            padding: "16px",
            borderRadius: "8px",
            border: `1px solid ${theme.row?.borderColor}`,
            marginBottom: "24px",
          }}
        >
          <h4
            style={{
              color: theme.employee?.nameColor,
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Related Sale Information
          </h4>
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <div>
                <span
                  style={{
                    color: theme.employee?.emailColor,
                    fontSize: "12px",
                  }}
                >
                  Sale ID:
                </span>
                <span
                  style={{
                    color: theme.employee?.nameColor,
                    fontSize: "14px",
                    fontWeight: "500",
                    marginLeft: "8px",
                  }}
                >
                  #{debt.sales.sl_id}
                </span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span
                  style={{
                    color: theme.employee?.emailColor,
                    fontSize: "12px",
                  }}
                >
                  Bill Number:
                </span>
                <span
                  style={{
                    color: theme.employee?.nameColor,
                    fontSize: "14px",
                    fontWeight: "500",
                    marginLeft: "8px",
                  }}
                >
                  #{debt.sales.sl_billnum}
                </span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span
                  style={{
                    color: theme.employee?.emailColor,
                    fontSize: "12px",
                  }}
                >
                  Customer:
                </span>
                <span
                  style={{
                    color: theme.employee?.nameColor,
                    fontSize: "14px",
                    fontWeight: "500",
                    marginLeft: "8px",
                  }}
                >
                  {debt.sales?.customer?.c_name || "Deleted Customer"}
                </span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span
                  style={{
                    color: theme.employee?.emailColor,
                    fontSize: "12px",
                  }}
                >
                  Sale Total:
                </span>
                <span
                  style={{
                    color: theme.employee?.nameColor,
                    fontSize: "14px",
                    fontWeight: "500",
                    marginLeft: "8px",
                  }}
                >
                  {debt.sales.sl_currency} {debt.sales.sl_total.toFixed(2)}
                </span>
              </div>
            </Col>
          </Row>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <div className="flex justify-end gap-4">
            <Button
              onClick={onClose}
              disabled={loading}
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
              btnTitle={loading ? "Updating..." : "Update Debt"}
              onClick={() => form.submit()}
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateDebtModal;
