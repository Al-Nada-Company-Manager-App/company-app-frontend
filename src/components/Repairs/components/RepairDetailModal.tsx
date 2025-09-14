import ConfirmBtn from "@src/components/UI/confirm";
import type { Theme } from "@src/types/theme";
import { Col, Descriptions, Modal, Row } from "antd";
import { useState } from "react";
import SparePartsTable from "./SparePartsTable";
import CustomBtn from "@src/components/UI/customBtn";
import { useDeleteRepair } from "@src/queries/Repairs";
import { useThemeContext } from "@src/contexts/useThemeContext";
import type { Repair } from "@src/types/Repairs/repair";
import UpdateStatusModal from "./UpdateStatusModal";

interface RepairDetailModalProps {
  modalOpen: boolean;
  onClose: () => void;
  repair?: Repair;
  theme: Theme;
}

const RepairDetailModal = ({
  modalOpen,
  onClose,
  repair,
  theme,
}: RepairDetailModalProps) => {
    const [updateOpen, setUpdateOpen] = useState(false);
  const { isDark } = useThemeContext();
  const deleteRepair = useDeleteRepair(isDark);

  const handleDelete = async (repairId: number) => {
    if (repairId === -1) return;
    await deleteRepair.mutateAsync(repairId);
  };

    const handleUpdateClose = () => {
      setUpdateOpen(false);
      onClose();
    };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Repair Process Details"
        open={modalOpen}
        onCancel={onClose}
        footer={
          <div className="flex justify-end">
            <ConfirmBtn
              type="primary"
              isdanger={true}
              btnTitle="Delete"
              onOk={() => {
                handleDelete(repair?.rep_id || -1);
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
        style={{ minWidth: 900, width: "auto", maxWidth: "95vw" }}
      >
        <Row gutter={[16, 16]} justify="center">
          <Col span={16}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Product Name">
                {`${repair?.stock?.p_name || "N/A"}`}
              </Descriptions.Item>
              <Descriptions.Item label="Product Category">
                {"Device Under Maintenance"}
              </Descriptions.Item>
              <Descriptions.Item label="Serial Number">
                {`${repair?.stock?.serial_number || "N/A"}`}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {`${repair?.stock?.p_status || "N/A"}`}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          justify="end"
          style={{ marginTop: 16, marginRight: 8 }}
        >
          <CustomBtn
            btnTitle="Edit Remarks & Status"
            className="px-6 py-2 mb-5 mr-5 w-55"
            onClick={() => setUpdateOpen(true)}
            theme={theme}
          />
        </Row>
        
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={24}>
            <SparePartsTable
              spareParts={repair?.repair_process.map(
                (process) => process.stock
              )}
              theme={theme}
            />
          </Col>
        </Row>
      </Modal>
      <UpdateStatusModal
        key={repair?.rep_id}
        modalOpen={updateOpen}
        onClose={handleUpdateClose}
        repair={repair}
        theme={theme}
      />
    </>
  );
};

export default RepairDetailModal;
