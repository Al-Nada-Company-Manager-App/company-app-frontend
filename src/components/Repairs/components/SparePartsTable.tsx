import { Table } from "antd";
import type { SparePart } from "@src/types/SpareParts/sparePart";
import type { Theme } from "@src/types/theme";

interface SparePartsTableProps {
  spareParts?: SparePart[];
  theme: Theme;
}

const { Column } = Table;

const SparePartsTable = ({ spareParts, theme }: SparePartsTableProps) => {
  return (
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
        </div>

        <div className="custom-table">
          <Table<SparePart>
            dataSource={spareParts}
            showHeader={true}
            pagination={{ pageSize: 10 }}
            rowKey="p_id"
          >
            <Column title="Product" dataIndex="p_name" key="p_name" />
            <Column title="Quantity" dataIndex="p_quantity" key="p_quantity" />
            <Column
              title="Model Code"
              dataIndex="model_code"
              key="model_code"
            />
            <Column title="Serial Number" dataIndex="serial_number" key="serial_number" />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SparePartsTable;
