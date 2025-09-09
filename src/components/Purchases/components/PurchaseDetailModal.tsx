import ConfirmBtn from "@src/components/UI/confirm";
import CustomBtn from "@src/components/UI/customBtn";
import ModalStyle from "@src/components/UI/ModalStyle";
import type { Purchases } from "@src/types/Purchases/purchases";
import type { Theme } from "@src/types/theme";
import { Col, Descriptions, Modal, Row, Image } from "antd";
import PurchaseDate from "./components/PurchaseDate";
import ProductPurchasesTable from "./components/ProductPurchasesTable";
import { useDeletePurchase } from "@src/queries/Purchases";
import { useThemeContext } from "@src/contexts/useThemeContext";
import { useState } from "react";
import UpdatePurchaseModal from "./UpdatePurchaseModal";

interface PurchaseDetailModalProps {
  modalOpen: boolean;
  onClose: () => void;
  purchase?: Purchases;
  theme: Theme;
}

const PurchaseDetailModal = ({
  modalOpen,
  onClose,
  purchase,
  theme,
}: PurchaseDetailModalProps) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const { isDark } = useThemeContext();

  const deletePurchase = useDeletePurchase(isDark);

  const handleDelete = async (purchaseId: number) => {
    if (purchaseId === -1) return;
    await deletePurchase.mutateAsync(purchaseId);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Purchase Details"
        open={modalOpen}
        onCancel={onClose}
        footer={
          <div className="flex justify-end">
            <CustomBtn
              btnTitle="Edit"
              onClick={() => setUpdateOpen(true)}
              theme={theme}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
            <ConfirmBtn
              type="primary"
              isdanger={true}
              btnTitle="Delete"
              onOk={() => {
                handleDelete(purchase?.pch_id || -1);
                onClose();
              }}
              onCancel={() => {
                console.log("Delete cancelled");
              }}
              className="px-6 py-2 mb-5 mr-5"
              theme={theme}
            />
          </div>
        }
        centered
        style={{ minWidth: 1100, width: "auto", maxWidth: "95vw" }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <Image
                src={
                  purchase?.supplier?.s_photo
                    ? `/Images/suppliers/${purchase?.supplier.s_photo}`
                    : "/Images/suppliers/placeholder.jpg"
                }
                alt={purchase?.supplier?.s_name}
                style={{ borderRadius: "12px", width: "100%" }}
              />
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: theme.employee.nameColor,
                }}
              >
                {purchase?.supplier?.s_name || (
                  <span style={{ fontStyle: "italic" }}>Deleted Supplier</span>
                )}
              </div>
              <div
                style={{ fontSize: "14px", color: theme.employee.dateColor }}
              >
                {purchase?.supplier?.s_email || ""}
              </div>
            </div>
          </Col>
          <Col span={16}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Purchase Date">
                {purchase?.pch_date && (
                  <PurchaseDate date={purchase.pch_date} theme={theme} />
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Total">
                {purchase?.pch_total?.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Tax">
                {purchase?.pch_tax?.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Cost">
                {purchase?.pch_cost?.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Bill Number">
                {purchase?.pch_billnum}
              </Descriptions.Item>
              <Descriptions.Item label="Currency">
                {purchase?.pch_currency}
              </Descriptions.Item>
              <Descriptions.Item label="Expense">
                {purchase?.pch_expense?.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Customs Cost">
                {purchase?.pch_customscost?.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Customs Number">
                {purchase?.pch_customsnum}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={24}>
            <ProductPurchasesTable
              purchaseId={purchase?.pch_id || -1}
              theme={theme}
            />
          </Col>
        </Row>
      </Modal>
      <UpdatePurchaseModal
        modalOpen={updateOpen}
        onClose={handleUpdateClose}
        purchase={purchase}
        theme={theme}
      />
    </>
  );
};

export default PurchaseDetailModal;
