import { Table } from "antd";
import ResponsiveList from "@src/components/UI/ResponsiveList";
import RepairCard from "./RepairCard";
import type { Repair } from "@src/types/Repairs/repair";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import { useGetRepairById } from "@src/queries/Repairs/repairQueries";
import RepairDetailModal from "./RepairDetailModal";
import { convertTimestampToDate } from "@src/utils/ConvertDate";
import StatusBadge from "@src/components/UI/StatusBadge";

interface RepairProcessTableProps {
  repairs: Repair[];
  theme: Theme;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading?: boolean;
}

const { Column } = Table;

const RepairProcessTable = ({ repairs, theme, total, currentPage, pageSize, onPageChange, loading }: RepairProcessTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Repair>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: freshSelectedRepair } = useGetRepairById(
    selectedRow?.rep_id,
    isModalVisible,
  );


  const tableComponent = (
    <Table<Repair>
      dataSource={repairs}
      loading={loading}
      pagination={false}
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
    </Table>
  );

  const cardsComponent = (
    <div className="flex flex-col gap-4">
      {repairs.map((repair) => (
        <RepairCard
          key={repair.rep_id}
          repair={repair}
          theme={theme}
          onClick={() => {
            setSelectedRow(repair);
            setIsModalVisible(true);
          }}
        />
      ))}
      {repairs.length === 0 && (
        <div
          style={{
            padding: "20px",
            color: theme.employee.nameColor,
            textAlign: "center",
          }}
        >
          No repairs found
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="custom-table">
        <ResponsiveList
          className="custom-table"
          table={tableComponent}
          cards={cardsComponent}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            onChange: onPageChange,
            showSizeChanger: true,
          }}
        />
      </div>


      <RepairDetailModal
        modalOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        repair={freshSelectedRepair ?? selectedRow}
        theme={theme}
      />
    </>
  );
};

export default RepairProcessTable;
