import { Table } from "antd";
import ResponsiveList from "@src/components/UI/ResponsiveList";
import ReceiptCard from "./ReceiptCard";
import { getReceiptColumns } from "./receiptColumns";
import type { Theme } from "@src/types/theme";

interface ReceiptsTableProps {
  receipts: any[];
  theme: Theme;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onPreview: (id: number) => void;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading?: boolean;
}

const ReceiptsTable = ({ 
  receipts, 
  theme, 
  onEdit, 
  onDelete,
  onPreview, 
  total, 
  currentPage, 
  pageSize, 
  onPageChange, 
  loading 
}: ReceiptsTableProps) => {
  const columns = getReceiptColumns(theme, onEdit, onDelete, onPreview);

  const tableComponent = (
    <Table
      columns={columns}
      dataSource={receipts}
      loading={loading}
      showHeader={true}
      pagination={false}
      rowKey="rn_id"
      scroll={{ x: 1000 }}
      showSorterTooltip={{ target: "sorter-icon" }}
      locale={{
        emptyText: (
          <div style={{ padding: "20px", color: theme.employee.nameColor }}>
            No receipts found
          </div>
        ),
      }}
    />
  );

  const cardsComponent = (
    <div className="flex flex-col gap-4">
      {receipts.map((receipt) => (
        <ReceiptCard
          key={receipt.rn_id}
          receipt={receipt}
          theme={theme}
          onEdit={onEdit}
          onPreview={onPreview}
          onDelete={onDelete}
        />
      ))}
      {receipts.length === 0 && (
        <div
          style={{
            padding: "20px",
            color: theme.employee.nameColor,
            textAlign: "center",
          }}
        >
          No receipts found
        </div>
      )}
    </div>
  );

  return (
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
  );
};

export default ReceiptsTable;
