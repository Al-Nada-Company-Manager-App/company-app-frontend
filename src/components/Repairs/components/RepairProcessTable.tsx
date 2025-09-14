import { Table } from "antd";
import type { Repair, RepairProcess } from "@src/types/Repairs/repair";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import RepairDetailModal from "./RepairDetailModal";
import { convertTimestampToDate } from "@src/utils/ConvertDate";
import StatusBadge from "@src/components/UI/StatusBadge";

interface RepairProcessTableProps {
  repairs: Repair[];
  theme: Theme;
}

const { Column } = Table;

const RepairProcessTable = ({ repairs, theme }: RepairProcessTableProps) => {
    const [selectedRow, setSelectedRow] = useState<Repair>();
    const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="custom-table">
        <Table<Repair>
          dataSource={repairs}
          pagination={{ pageSize: 10 }}
          rowKey="rep_id"
          onRow={(record) => ({
            onClick: () => {
              setSelectedRow(record);
              setIsModalVisible(true);
            },
          })}
        >
          <Column title="Repair ID" dataIndex="rep_id" key="rep_id" />

          <Column
            title="Repair Date"
            dataIndex="rep_date"
            key="rep_date"
            render={(date: string) => convertTimestampToDate(date)}
          />

          <Column
            title="Serial Number"
            dataIndex={["stock", "serial_number"]}
            key="serial_number"
          />

          <Column
            title="Product Name"
            dataIndex={["stock", "p_name"]}
            key="p_name"
          />

          <Column
            title="Status"
            dataIndex={["stock", "p_status"]}
            key="p_status"
            render={(status: string) => <StatusBadge status={status} />}
          />

          <Column<RepairProcess>
            title="Spare Parts"
            dataIndex="repair_process"
            key="repair_process"
            render={(processes: RepairProcess[]) =>
              processes && processes.length > 0
                ? processes.map((proc, i) => (
                    <div key={i}>
                      {proc.stock.p_name ?? "Unnamed"} ( SN:{" "}
                      {proc.stock.serial_number ?? "N/A"})
                    </div>
                  ))
                : "No process details"
            }
          />
        </Table>
      </div>

      <RepairDetailModal
        modalOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        repair={selectedRow}
        theme={theme}
      />
    </>
  );
};

export default RepairProcessTable;
