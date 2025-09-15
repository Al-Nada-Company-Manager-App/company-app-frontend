import ConfirmBtn from "@src/components/UI/confirm";
import CustomBtn from "@src/components/UI/customBtn";
import type { Purchases } from "@src/types/Purchases/purchases";
import type { Theme } from "@src/types/theme";
import { Col, Descriptions, Modal, Row, Image } from "antd";
import ProductPurchasesTable from "./components/ProductPurchasesTable";
import { useDeletePurchase } from "@src/queries/Purchases";
import { useThemeContext } from "@src/contexts/theme";
import { useState, useEffect } from "react";
import UpdatePurchaseModal from "./UpdatePurchaseModal";
import { convertTimestampToDate } from "@src/utils/ConvertDate";

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
  const [refreshKey, setRefreshKey] = useState(0);
  const { isDark } = useThemeContext();

  const deletePurchase = useDeletePurchase(isDark);

  // Reset refreshKey when purchase changes or modal opens
  useEffect(() => {
    if (modalOpen && purchase) {
      setRefreshKey(0);
    }
  }, [modalOpen, purchase]);

  const handleDelete = async (purchaseId: number) => {
    if (purchaseId === -1) return;
    await deletePurchase.mutateAsync(purchaseId);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    // Add a small delay to ensure the data has been updated before refreshing
    setTimeout(() => {
      setRefreshKey((prev) => prev + 1);
    }, 100);
    // Don't close the detail modal, just refresh the data
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
                {convertTimestampToDate(purchase?.pch_date) || "N/A"}
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
              key={`${purchase?.pch_id}-${refreshKey}`}
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
