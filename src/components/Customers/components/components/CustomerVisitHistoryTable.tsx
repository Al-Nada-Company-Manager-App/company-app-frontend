import { Table, Avatar, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Theme } from "@src/types/theme";
import { useGetCustomerVisits } from "@src/queries/Visits/visitQueries";
import { getImageUrl } from "@src/config/api";
import type { CustomerVisit } from "@src/queries/Visits/visitApi";

interface CustomerVisitHistoryTableProps {
  customerId: number;
  theme: Theme;
}

const CustomerVisitHistoryTable = ({
  customerId,
  theme,
}: CustomerVisitHistoryTableProps) => {
  const { data: visits, isLoading } = useGetCustomerVisits(
    customerId > 0 ? customerId : null
  );

  const columns: ColumnsType<CustomerVisit> = [
    {
      title: "#",
      key: "index",
      width: 60,
      render: (_v, _r, index) => (
        <span style={{ color: theme.title?.color, opacity: 0.7 }}>
          {index + 1}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "cv_date",
      key: "cv_date",
      width: 180,
      render: (date: string) => (
        <span style={{ color: theme.title?.color }}>
          {new Date(date).toLocaleString()}
        </span>
      ),
      sorter: (a, b) =>
        new Date(b.cv_date).getTime() - new Date(a.cv_date).getTime(),
      defaultSortOrder: "ascend",
    },
    {
      title: "Visited By",
      key: "employee",
      width: 200,
      render: (_v, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={32}
            src={
              record.employee.e_photo
                ? getImageUrl("employees", record.employee.e_photo)
                : undefined
            }
          >
            {record.employee.f_name[0]}
          </Avatar>
          <span style={{ color: theme.title?.color }}>
            {record.employee.f_name} {record.employee.l_name}
          </span>
        </div>
      ),
    },
    {
      title: "Notes",
      dataIndex: "cv_notes",
      key: "cv_notes",
      render: (notes: string | null) =>
        notes ? (
          <span style={{ color: theme.title?.color }}>{notes}</span>
        ) : (
          <Tag color="default">No notes</Tag>
        ),
    },
  ];

  if (!visits || visits.length === 0) {
    return (
      <div
        className="rounded-xl p-6 text-center"
        style={{ color: theme.title?.color, opacity: 0.6 }}
      >
        No visit history for this customer yet.
      </div>
    );
  }

  return (
    <Table<CustomerVisit>
      className="custom-table"
      dataSource={visits}
      columns={columns}
      loading={isLoading}
      rowKey="cv_id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: "max-content" }}
      size="small"
    />
  );
};

export default CustomerVisitHistoryTable;
