import { Table } from "antd";
import ResponsiveList from "@src/components/UI/ResponsiveList";
import DeliveryCard from "./DeliveryCard";
import { getDeliveryColumns } from "./deliveryColumns";
import type { Theme } from "@src/types/theme";

interface DeliveriesTableProps {
  deliveries: any[];
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

const DeliveriesTable = ({ 
  deliveries, 
  theme, 
  onEdit, 
  onDelete,
  onPreview, 
  total, 
  currentPage, 
  pageSize, 
  onPageChange, 
  loading 
}: DeliveriesTableProps) => {
  const columns = getDeliveryColumns(theme, onEdit, onDelete, onPreview);

  const tableComponent = (
    <Table
      columns={columns}
      dataSource={deliveries}
      loading={loading}
      showHeader={true}
      pagination={false}
      rowKey="dn_id"
      scroll={{ x: 1000 }}
      showSorterTooltip={{ target: "sorter-icon" }}
      locale={{
        emptyText: (
          <div style={{ padding: "20px", color: theme.employee.nameColor }}>
            No deliveries found
          </div>
        ),
      }}
    />
  );

  const cardsComponent = (
    <div className="flex flex-col gap-4">
      {deliveries.map((delivery) => (
        <DeliveryCard
          key={delivery.dn_id}
          delivery={delivery}
          theme={theme}
          onEdit={onEdit}
          onPreview={onPreview}
          onDelete={onDelete}
        />
      ))}
      {deliveries.length === 0 && (
        <div
          style={{
            padding: "20px",
            color: theme.employee.nameColor,
            textAlign: "center",
          }}
        >
          No deliveries found
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

export default DeliveriesTable;
