import ConfirmBtn from "@src/components/UI/confirm";
import type { Supplier } from "@src/types/Suppliers/supplier";
import type { Theme } from "@src/types/theme";
import { Col, Descriptions, Image, Modal, Row } from "antd";
import { useState } from "react";
import SupplierPurchasesTable from "./components/SupplierPurchasesTable";
import UpdateSupplierModal from "./UpdateSupplierModal";
import { useDeleteSupplier } from "@src/queries/Suppliers";
import { useThemeContext } from "@src/contexts/theme";
import CustomBtn from "@src/components/UI/customBtn";
import { getImageUrl, getPlaceholderUrl } from "@src/config/api";

interface DetailModal {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  supplier?: Supplier;
}

const SupplierDetailModal = ({
  modalOpen,
  onClose,
  supplier,
  theme,
}: DetailModal) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const { isDark } = useThemeContext();
  const deleteSupplier = useDeleteSupplier(isDark);

  const handleDelete = async (supplierId: number) => {
    if (supplierId === -1) return;
    await deleteSupplier.mutateAsync(supplierId);
  };
  const handleUpdateClose = () => {
    setUpdateOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Supplier Details"
        open={modalOpen}
        onCancel={onClose}
        footer={
          <div className="flex justify-end">
            <CustomBtn
              btnTitle="Edit"
              onClick={() => setUpdateOpen(true)}
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
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
            <ConfirmBtn
              type="primary"
              isdanger={true}
              btnTitle="Delete"
              onOk={() => {
                handleDelete(supplier?.s_id || -1);
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
        style={{ minWidth: 1400, width: "auto", maxWidth: "95vw" }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <Image
                src={getImageUrl("suppliers", supplier?.s_photo)}
                fallback={getPlaceholderUrl("suppliers")}
                alt={supplier?.s_name}
                style={{ borderRadius: "12px", width: "100%" }}
              />
            </div>
          </Col>
          <Col span={16}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Name">
                {`${supplier?.s_name}`}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {supplier?.s_email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {supplier?.s_phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Fax">
                {supplier?.s_fax || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {supplier?.s_address}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {supplier?.s_city}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {supplier?.s_country}
              </Descriptions.Item>
              <Descriptions.Item label="Zip Code">
                {supplier?.s_zipcode}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={24}>
            <SupplierPurchasesTable
              supplierId={supplier?.s_id || -1}
              theme={theme}
            />
          </Col>
        </Row>
      </Modal>
      <UpdateSupplierModal
        key={supplier?.s_id}
        modalOpen={updateOpen}
        onClose={handleUpdateClose}
        supplier={supplier}
        theme={theme}
      />
    </>
  );
};

export default SupplierDetailModal;
