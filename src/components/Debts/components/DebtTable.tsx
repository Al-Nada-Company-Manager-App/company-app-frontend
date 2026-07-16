import { Table } from "antd";
import ResponsiveList from "@src/components/UI/ResponsiveList";
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
  const { isDark } = useThemeContext();

  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
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

  const paginatedDebts = debts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const tableComponent = (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={paginatedDebts}
      rowKey="d_id"
      onRow={(record) => {
        return {
          onClick: () => {
            handleView(record);
          },
        };
      }}
      pagination={false}
      scroll={{ x: 1200 }}
      style={{
        background: theme.container?.background,
        borderRadius: "12px",
      }}
    />
  );

  const cardsComponent = (
    <div className="flex flex-col gap-4 mb-4">
      {paginatedDebts.map((debt) => (
        <DebtCard
          key={debt.d_id}
          debt={debt}
          theme={theme}
          onClick={() => handleView(debt)}
        />
      ))}
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
            total: debts.length,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
          }}
        />
      </div>

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
