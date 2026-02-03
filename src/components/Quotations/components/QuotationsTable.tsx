import { Table } from "antd";
import type { Quotation } from "@src/types/Quotations/quotation";
import type { Theme } from "@src/types/theme";
import { getQuotationColumns } from "./quotationColumns";

interface QuotationsTableProps {
  quotations: Quotation[];
  theme: Theme;
}

const QuotationsTable = ({ quotations, theme }: QuotationsTableProps) => {
  const columns = getQuotationColumns(theme);

  return (
    <div className="custom-table">
      <Table
        columns={columns}
        dataSource={quotations}
        showHeader={true}
        pagination={{ pageSize: 10 }}
        rowKey="q_id"
        showSorterTooltip={{ target: "sorter-icon" }}
        locale={{
          emptyText: (
            <div style={{ padding: "20px", color: theme.employee.nameColor }}>
              No quotations found
            </div>
          ),
        }}
      />
    </div>
  );
};

export default QuotationsTable;
