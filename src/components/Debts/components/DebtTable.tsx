import { Table, Grid } from "antd";
import DebtCard from "./DebtCard";
import { useState } from "react";
import type { Debt } from "@src/types/Debts/debt";
import type { Theme } from "@src/types/theme";
import { getDebtColumns } from "./debtColumns";
import DebtDetailModal from "./DebtDetailModal";
import UpdateDebtModal from "./UpdateDebtModal";
import { useDeleteDebt } from "@src/queries/Debts";
import { useThemeContext } from "@src/contexts/theme";

interface DebtTableProps {
  debts: Debt[];
  theme: Theme;
}

const DebtTable = ({ debts, theme }: DebtTableProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { isDark } = useThemeContext();

  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const deleteDebt = useDeleteDebt(isDark);

  const handleView = (debt: Debt) => {
    setSelectedDebt(debt);
    setDetailModalOpen(true);
  };

  const handleEdit = (debt: Debt) => {
    setSelectedDebt(debt);
    setUpdateModalOpen(true);
  };

  const handleDelete = async (debt: Debt) => {
    await deleteDebt.mutateAsync(debt.d_id);
    setSelectedDebt(null);
    setDetailModalOpen(false);
  };

  const columns = getDebtColumns(theme);

  return (
    <>
      {!screens.md ? (
        <div className="flex flex-col gap-4 mb-4">
          {debts.map((debt) => (
            <DebtCard
              key={debt.d_id}
              debt={debt}
              theme={theme}
              onClick={() => handleView(debt)}
            />
          ))}
        </div>
      ) : (
        <Table
          className="custom-table"
          columns={columns}
          dataSource={debts}
          rowKey="d_id"
          onRow={(record) => {
            return {
              onClick: () => {
                handleView(record);
              },
            };
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
          }}
          scroll={{ x: 1200 }}
          style={{
            background: theme.container?.background,
            borderRadius: "12px",
          }}
        />
      )}

      {/* Detail Modal */}
      <DebtDetailModal
        modalOpen={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedDebt(null);
        }}
        debt={selectedDebt}
        theme={theme}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Update Modal */}
      <UpdateDebtModal
        modalOpen={updateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false);
          setSelectedDebt(null);
        }}
        debt={selectedDebt}
        theme={theme}
      />
    </>
  );
};

export default DebtTable;
