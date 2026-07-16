import { Table } from "antd";
import ResponsiveList from "@src/components/UI/ResponsiveList";
import { useState } from "react";
import QuotationCard from "./QuotationCard";
import type { Quotation } from "@src/types/Quotations/quotation";
import type { Theme } from "@src/types/theme";
import { getQuotationColumns } from "./quotationColumns";

interface QuotationsTableProps {
  quotations: Quotation[];
  theme: Theme;
  onEdit: (id: number) => void;
  onPreview: (id: number) => void;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading?: boolean;
}

const QuotationsTable = ({ quotations, theme, onEdit, onPreview, total, currentPage, pageSize, onPageChange, loading }: QuotationsTableProps) => {
  const columns = getQuotationColumns(theme, onEdit, onPreview);

  const tableComponent = (
    <Table
      columns={columns}
      dataSource={quotations}
      loading={loading}
      showHeader={true}
      pagination={false}
      rowKey="q_id"
      scroll={{ x: 1000 }}
      showSorterTooltip={{ target: "sorter-icon" }}
      locale={{
        emptyText: (
          <div style={{ padding: "20px", color: theme.employee.nameColor }}>
            No quotations found
          </div>
        ),
      }}
    />
  );

  const cardsComponent = (
    <div className="flex flex-col gap-4">
      {quotations.map((quotation) => (
        <QuotationCard
          key={quotation.q_id}
          quotation={quotation}
          theme={theme}
          onEdit={onEdit}
          onPreview={onPreview}
        />
      ))}
      {quotations.length === 0 && (
        <div
          style={{
            padding: "20px",
            color: theme.employee.nameColor,
            textAlign: "center",
          }}
        >
          No quotations found
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

export default QuotationsTable;
