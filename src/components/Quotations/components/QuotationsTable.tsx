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
}

const QuotationsTable = ({ quotations, theme, onEdit, onPreview }: QuotationsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const columns = getQuotationColumns(theme, onEdit, onPreview);
  const paginatedQuotations = quotations.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const tableComponent = (
    <Table
      columns={columns}
      dataSource={paginatedQuotations}
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
      {paginatedQuotations.map((quotation) => (
        <QuotationCard
          key={quotation.q_id}
          quotation={quotation}
          theme={theme}
          onEdit={onEdit}
          onPreview={onPreview}
        />
      ))}
      {paginatedQuotations.length === 0 && (
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
          total: quotations.length,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default QuotationsTable;
