import { Table } from "antd";
import type { Theme } from "@src/types/theme";
import ConfirmBtn from "@src/components/UI/customBtn";
import { useState } from "react";
import AddSparepartsModal from "./AddSparePartsModal";
import type { Repair } from "@src/types/Repairs/repair";
import type { RepairProcess } from "@src/types/Repairs/repair";

interface SparePartsTableProps {
  spareParts?: RepairProcess[];
  theme: Theme;
  repair?: Repair;
}

const { Column } = Table;

const SparePartsTable = ({ spareParts, theme, repair }: SparePartsTableProps) => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <div className="p-6">
        <div
          className="w-full rounded-2xl p-6 mb-6"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "auto",
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-lg font-bold"
              style={{ color: theme.title.color }}
            >
              {"Spare Parts Used"}
            </h2>
            <ConfirmBtn
              btnTitle="Add Spare Part"
              className="px-6 py-2 mb-5 mr-5 w-55"
              onClick={() => setShowAddModal(true)}
              theme={theme}
            />
          </div>

          <div className="custom-table">
            <Table<RepairProcess>
              dataSource={spareParts}
              showHeader={true}
              pagination={{ pageSize: 10 }}
              rowKey={(record) => record.stock.p_id}
            >
              <Column
                title="Product"
                dataIndex={["stock", "p_name"]}
                key="p_name"
              />
              <Column
                title="Quantity Used"
                dataIndex="sp_quantity"
                key="sp_quantity"
              />
              <Column
                title="Model Code"
                dataIndex={["stock", "model_code"]}
                key="model_code"
              />
              <Column
                title="Serial Number"
                dataIndex={["stock", "serial_number"]}
                key="serial_number"
              />
            </Table>
          </div>
        </div>
      </div>
      {showAddModal && repair && (
        <AddSparepartsModal
          modalOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          repair={repair}
          theme={theme}
        />
      )}
    </>
  );
};

export default SparePartsTable;
