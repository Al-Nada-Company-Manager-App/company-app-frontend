import { Modal, Descriptions, Tag, Row, Col } from "antd";
import type { Debt } from "@src/types/Debts/debt";
import type { Theme } from "@src/types/theme";
import moment from "moment";
import CustomBtn from "@src/components/UI/customBtn";
import ConfirmBtn from "@src/components/UI/confirm";

interface DebtDetailModalProps {
  modalOpen: boolean;
  onClose: () => void;
  debt: Debt | null;
  theme: Theme;
  onEdit?: (debt: Debt) => void;
  onDelete?: (debt: Debt) => void;
}

const DebtDetailModal = ({
  modalOpen,
  onClose,
  debt,
  theme,
  onEdit,
  onDelete,
}: DebtDetailModalProps) => {
  if (!debt) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "#52c41a";
      case "Pending":
        return "#faad14";
      case "Cancelled":
        return "#ff4d4f";
      default:
        return "#d9d9d9";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "DEBT_IN":
        return "#52c41a";
      case "DEBT_OUT":
        return "#ff4d4f";
      case "INSURANCE":
        return "#faad14";
      default:
        return "#d9d9d9";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "DEBT_IN":
        return "Debt In";
      case "DEBT_OUT":
        return "Debt Out";
      case "INSURANCE":
        return "Insurance";
      default:
        return type;
    }
  };

  return (
    <Modal
      className="custom-modal"
      title="Debt Details"
      open={modalOpen}
      onCancel={onClose}
      footer={
        <div className="flex justify-end">
          {onEdit && (
            <CustomBtn
              theme={{
                ...theme,
                button: {
                  ...theme.button,
                  background: "#faad14",
                  hoverBackground: "#d48806",
                  color: "#fff",
                  hoverColor: "#fff",
                },
              }}
              btnTitle="Edit"
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
              onClick={() => {
                onEdit(debt);
              }}
            />
          )}
          {onDelete && (
            <ConfirmBtn
              type="primary"
              className="px-6 py-2 mb-5 mr-5"
              isdanger={true}
              btnTitle="Delete"
              theme={theme}
              onOk={() => {
                onDelete(debt);
                onClose();
              }}
            />
          )}
        </div>
      }
      centered
      width={900}
    >
      <Row gutter={[24, 24]}>
        {/* Customer Information */}
        <Col span={8}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
            <img
              src={
            debt.sales?.customer?.c_photo
              ? `/Images/customers/${debt.sales.customer.c_photo}`
              : "/Images/customers/placeholder.jpg"
              }
              alt={debt.sales?.customer?.c_name || "Deleted Customer"}
              style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: `3px solid ${theme.row?.borderColor}`,
            marginBottom: "16px",
              }}
            />
            <h3
              style={{
            color: theme.employee?.nameColor,
            fontSize: "18px",
            fontWeight: "600",
            margin: 0,
              }}
            >
              {debt.sales?.customer?.c_name || "Deleted Customer"}
            </h3>
            <p
              style={{
            color: theme.employee?.emailColor,
            fontSize: "14px",
            margin: "4px 0 0 0",
              }}
            >
              Customer ID: {debt.sales?.c_id || "N/A"}
            </p>
          </div>
        </Col>

        {/* Debt Information */}
        <Col span={16}>
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Debt ID">
              <span style={{ fontFamily: "monospace", fontWeight: "600" }}>
                #{debt.d_id}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Debt Type">
              <Tag
                color={getTypeColor(debt.d_type)}
                style={{
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  border: "none",
                }}
              >
                {getTypeLabel(debt.d_type)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Debt Amount">
              <span
                style={{
                  color: getTypeColor(debt.d_type),
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {debt.d_type === "DEBT_IN"
                  ? "+"
                  : debt.d_type === "DEBT_OUT"
                  ? "-"
                  : "🛡"}
                {debt.d_currency} {debt.d_amount.toFixed(2)}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Debt Date">
              {moment(debt.d_date).format("MMMM DD, YYYY")}
            </Descriptions.Item>
          </Descriptions>
        </Col>

        {/* Sale Information */}
        <Col span={24}>
          <h3
            style={{
              color: theme.employee?.nameColor,
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "16px",
              borderBottom: `1px solid ${theme.row?.borderColor}`,
              paddingBottom: "8px",
            }}
          >
            Related Sale Information
          </h3>
          <Descriptions bordered column={2} size="middle">
            <Descriptions.Item label="Sale ID">
              <span style={{ fontFamily: "monospace", fontWeight: "600" }}>
                #{debt.sales.sl_id}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Bill Number">
              <span style={{ fontFamily: "monospace", fontWeight: "600" }}>
                #{debt.sales.sl_billnum}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Sale Date">
              {moment(debt.sales.sl_date).format("MMMM DD, YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Sale Type">
              <Tag
                color="blue"
                style={{
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "500",
                  border: "none",
                }}
              >
                {debt.sales.sl_type}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Sale Status">
              <Tag
                color={getStatusColor(debt.sales.sl_status)}
                style={{
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "500",
                  border: "none",
                }}
              >
                {debt.sales.sl_status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Total Amount">
              <span style={{ fontWeight: "600" }}>
                {debt.sales.sl_currency} {debt.sales.sl_total.toFixed(2)}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Paid Amount">
              <span style={{ color: "#52c41a", fontWeight: "600" }}>
                {debt.sales.sl_currency} {debt.sales.sl_payed.toFixed(2)}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Remaining Amount">
              <span style={{ color: "#ff4d4f", fontWeight: "600" }}>
                {debt.sales.sl_currency}{" "}
                {(debt.sales.sl_total - debt.sales.sl_payed).toFixed(2)}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Discount">
              {debt.sales.sl_discount}%
            </Descriptions.Item>
            <Descriptions.Item label="Tax">
              {debt.sales.sl_tax}%
            </Descriptions.Item>
            <Descriptions.Item label="Cost">
              {debt.sales.sl_currency} {debt.sales.sl_cost.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Initial Amount">
              {debt.sales.sl_currency} {debt.sales.sl_inamount.toFixed(2)}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Modal>
  );
};

export default DebtDetailModal;
