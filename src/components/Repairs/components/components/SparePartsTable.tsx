import { Table } from "antd";
import type { Theme } from "@src/types/theme";
import ConfirmBtn from "@src/components/UI/customBtn";
import { useState } from "react";
import AddSparepartsModal from "./AddSparePartsModal";
import type { Repair } from "@src/types/Repairs/repair";
import type { RepairProcess } from "@src/types/Repairs/repair";
import SparePartOperationsModal from "./SparePartOperationsModal";

interface SparePartsTableProps {
  spareParts?: RepairProcess[];
  theme: Theme;
  repair?: Repair;
}

const { Column } = Table;

const SparePartsTable = ({
  spareParts,
  theme,
  repair,
}: SparePartsTableProps) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RepairProcess>();
  const [showOperationsModal, setShowOperationsModal] = useState(false);
  console.log("SparePartsTable spareParts:", spareParts);

  const safeData = (spareParts ?? []).map((sp, idx) => ({
    ...sp,
    __rowKey: String(
      (sp as RepairProcess).sp_id ??
      sp.stock?.p_id ??
      `missing-${idx}-${sp.sp_quantity}`
    ),
  }));

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
            <Table<RepairProcess & { __rowKey: string }>
              dataSource={safeData}
              showHeader={true}
              pagination={{ pageSize: 5 }}
              rowKey={(record) => record.__rowKey}
              onRow={(record) => ({
                onClick: () => {
                  setSelectedRow(record);
                  setShowOperationsModal(true);
                },
              })}
            >
              <Column
                title="Product"
                key="p_name"
                render={(_, record) =>
                  record.stock?.p_name ??
                  `Part ID: ${(record as RepairProcess).sp_id ?? "N/A"}`
                }
              />
              <Column
                title="Quantity Used"
                dataIndex="sp_quantity"
                key="sp_quantity"
                render={(qty: number) => qty ?? 0}
              />
              <Column
                title="Model Code"
                key="model_code"
                render={(_, record) => record.stock?.model_code ?? "N/A"}
              />
              <Column
                title="Serial Number"
                key="serial_number"
                render={(_, record) => record.stock?.serial_number ?? "N/A"}
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
      {showOperationsModal && selectedRow && repair &&(
        <SparePartOperationsModal
          modalOpen={showOperationsModal}
          onClose={() => setShowOperationsModal(false)}
          repair={repair}
          selectedSparePart={selectedRow}
          theme={theme}
        />
      )}
    </>
  );
};

export default SparePartsTable;
