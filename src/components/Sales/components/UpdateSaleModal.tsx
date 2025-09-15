import { Modal, Form, Button, Row, Col, Select, InputNumber } from "antd";
import type { Sales } from "@src/types/Sales/sales";
import type { Theme } from "@src/types/theme";
import ModalStyle from "@src/components/UI/ModalStyle";
import { useThemeContext } from "@src/contexts/theme";
import { useUpdateSale } from "@src/queries/Sales";
import { useState, useEffect } from "react";
import CustomBtn from "@src/components/UI/customBtn";

const { Option } = Select;

interface UpdateSaleModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  sale?: Partial<Sales>;
}

const UpdateSaleModal = ({
  modalOpen,
  onClose,
  sale,
  theme,
}: UpdateSaleModalProps) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const updateSale = useUpdateSale(isDark);

  // Calculate remaining amount
  const [remainingAmount, setRemainingAmount] = useState<number>(0);

  useEffect(() => {
    if (sale?.sl_total && sale?.sl_payed !== undefined) {
      setRemainingAmount(sale.sl_total - sale.sl_payed);
    }
  }, [sale?.sl_total, sale?.sl_payed]);

  const onFinish = async (values: Partial<Sales>) => {
    const updatedSaleData = {
      sl_id: sale?.sl_id,
      sl_payed: values.sl_payed,
      sl_inamount: values.sl_inamount,
      sl_status: values.sl_status,
    };

    if (sale?.sl_id) {
      await updateSale.mutateAsync({
        id: sale.sl_id,
        saleData: updatedSaleData,
      });
      onClose();
    }
  };

  // Watch form values to update remaining amount
  const watchedValues = Form.useWatch([], form);
  useEffect(() => {
    if (watchedValues?.sl_payed !== undefined && sale?.sl_total) {
      setRemainingAmount(sale.sl_total - (watchedValues.sl_payed || 0));
    }
  }, [watchedValues?.sl_payed, sale?.sl_total]);

  return (
    <>
      <Modal
        className="custom-modal"
        title="Update Sale"
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
            sl_payed: sale?.sl_payed || 0,
            sl_inamount: sale?.sl_inamount || 0,
            sl_status: sale?.sl_status || "PENDING",
          }}
          style={{ maxWidth: "100%" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div
                style={{
                  background: theme.card?.background || "#f5f5f5",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              >
                <h4 style={{ margin: "0 0 8px 0" }}>Sale Information</h4>
                <p style={{ margin: "4px 0" }}>
                  <strong>Bill Number:</strong> {sale?.sl_billnum}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Total Amount:</strong> {sale?.sl_total}{" "}
                  {sale?.sl_currency}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Current Paid:</strong> {sale?.sl_payed || 0}{" "}
                  {sale?.sl_currency}
                </p>
                <p
                  style={{
                    margin: "4px 0",
                    color:
                      remainingAmount > 0
                        ? "#ff4d4f"
                        : remainingAmount < 0
                        ? "#52c41a"
                        : "#1890ff",
                  }}
                >
                  <strong>Remaining Amount:</strong> {remainingAmount}{" "}
                  {sale?.sl_currency}
                  {remainingAmount < 0 && " (Overpaid)"}
                </p>
              </div>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="sl_payed"
                label="Paid Amount"
                rules={[
                  {
                    required: true,
                    message: "Please enter the paid amount",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Amount must be greater than or equal to 0",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Enter paid amount"
                  style={{ width: "100%" }}
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sl_inamount"
                label="Insurance Amount"
                rules={[
                  {
                    required: true,
                    message: "Please enter the insurance amount",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Amount must be greater than or equal to 0",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Enter insurance amount"
                  style={{ width: "100%" }}
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="sl_status"
                label="Sale Status"
                rules={[
                  {
                    required: true,
                    message: "Please select the sale status",
                  },
                ]}
              >
                <Select placeholder="Select sale status">
                  <Option value="PENDING">Pending</Option>
                  <Option value="COMPLETE">Complete</Option>
                  <Option value="CANCELED">Canceled</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div className="flex justify-end gap-4">
              <Button
                onClick={onClose}
                loading={updateSale.isPending}
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
                btnTitle="Update Sale"
                loading={updateSale.isPending}
                onClick={() => form.submit()}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateSaleModal;
