import { Table, Grid } from "antd";
import QuotationCard from "./QuotationCard";
import type { Quotation } from "@src/types/Quotations/quotation";
import type { Theme } from "@src/types/theme";
import { getQuotationColumns } from "./quotationColumns";

interface QuotationsTableProps {
  quotations: Quotation[];
  theme: Theme;
}

const QuotationsTable = ({ quotations, theme }: QuotationsTableProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const columns = getQuotationColumns(theme);

  return (
    <div className="custom-table">
      {!screens.md ? (
        <div className="flex flex-col gap-4">
          {quotations.map((quotation) => (
            <QuotationCard
              key={quotation.q_id}
              quotation={quotation}
              theme={theme}
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
      ) : (
        <Table
          columns={columns}
          dataSource={quotations}
          showHeader={true}
          pagination={{ pageSize: 10 }}
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
      )}
    </div>
  );
};

export default QuotationsTable;
