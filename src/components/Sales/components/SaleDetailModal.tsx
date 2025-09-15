import ConfirmBtn from "@src/components/UI/confirm";
import CustomBtn from "@src/components/UI/customBtn";
import type { Sales } from "@src/types/Sales/sales";
import type { Theme } from "@src/types/theme";
import { Col, Descriptions, Modal, Row, Image } from "antd";
import ProductSalesTable from "./components/ProductSalesTable";
import { useDeleteSale } from "@src/queries/Sales";
import { useThemeContext } from "@src/contexts/useThemeContext";
import { useState } from "react";
import UpdateSaleModal from "./UpdateSaleModal";
import { convertTimestampToDate } from "@src/utils/ConvertDate";

interface SaleDetailModalProps {
  modalOpen: boolean;
  onClose: () => void;
  sale?: Sales;
  theme: Theme;
}

const SaleDetailModal = ({
  modalOpen,
  onClose,
  sale,
  theme,
}: SaleDetailModalProps) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const { isDark } = useThemeContext();

  const deleteSale = useDeleteSale(isDark);

  const handleDelete = async (saleId: number) => {
    if (saleId === -1) return;
    await deleteSale.mutateAsync(saleId);
  };
  return (
    <>
      <Modal
        className="custom-modal"
        title="Sale Details"
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
                handleDelete(sale?.sl_id || -1);
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
                  sale?.customer?.c_photo
                    ? `/Images/customers/${sale?.customer.c_photo}`
                    : "/Images/customers/placeholder.jpg"
                }
                alt={sale?.customer?.c_name}
                style={{ borderRadius: "12px", width: "100%" }}
              />
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: theme.employee.nameColor,
                }}
              >
                {sale?.customer?.c_name || (
                  <span style={{ fontStyle: "italic" }}>Deleted Customer</span>
                )}
              </div>
              <div
                style={{ fontSize: "14px", color: theme.employee.dateColor }}
              >
                {sale?.customer?.c_email || ""}
              </div>
            </div>
          </Col>
          <Col span={16}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Sale Date">
                {convertTimestampToDate(sale?.sl_date) || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Total">
                {sale?.sl_total?.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Discount">
                {sale?.sl_discount}
              </Descriptions.Item>
              <Descriptions.Item label="Tax">{sale?.sl_tax}</Descriptions.Item>
              <Descriptions.Item label="Status">
                {sale?.sl_status}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                {sale?.sl_type}
              </Descriptions.Item>
              <Descriptions.Item label="In Amount">
                {sale?.sl_inamount?.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Cost">
                {sale?.sl_cost?.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Bill Number">
                {sale?.sl_billnum}
              </Descriptions.Item>
              <Descriptions.Item label="Payed">
                {sale?.sl_payed?.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Currency">
                {sale?.sl_currency}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={24}>
            {sale?.sl_type === "REPAIR" || sale?.sl_type === "SELLITEMS" ? (
              <ProductSalesTable
                saleId={sale?.sl_id || -1}
                saleType={sale?.sl_type || ""}
                theme={theme}
              />
            ) : null}
          </Col>
        </Row>
      </Modal>
      <UpdateSaleModal
        modalOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
        sale={sale}
        theme={theme}
      />
    </>
  );
};

export default SaleDetailModal;
