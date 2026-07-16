import ConfirmBtn from "@src/components/UI/confirm";
import type { Theme } from "@src/types/theme";
import { Descriptions } from "antd";
import AppModal from "@src/components/UI/AppModal";
import { useState } from "react";
import SparePartsTable from "./components/SparePartsTable";
import CustomBtn from "@src/components/UI/customBtn";
import { useDeleteRepair } from "@src/queries/Repairs";
import { useThemeContext } from "@src/contexts/theme";
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
      <AppModal
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
        width={900}
      >
        <div className="flex justify-center mb-4">
          <div className="w-full md:w-2/3">
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
          </div>
        </div>
        <div className="flex justify-end mt-4 mr-2">
          <CustomBtn
            btnTitle="Edit Remarks & Status"
            className="px-6 py-2 mb-5 mr-5 w-55"
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
          />
        </div>

        <div className="mt-6 w-full overflow-x-auto">
            <SparePartsTable
              spareParts={repair?.repair_process}
              theme={theme}
              repair={repair}
            />
        </div>
      </AppModal>
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
