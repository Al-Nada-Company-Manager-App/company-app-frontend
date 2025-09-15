import type { ColumnsType } from "antd/es/table";
import type { Sales } from "@src/types/Sales/sales";
import type { Theme } from "@src/types/theme";
import CustomerInfo from "./components/CustomerInfo";
import StatusBadge from "@src/components/UI/StatusBadge";
import { convertTimestampToDate } from "@src/utils/ConvertDate";

export const getSalesColumns = (theme: Theme): ColumnsType<Sales> => [
  {
    title: "Customer",
    dataIndex: ["customer", "c_name"],
    key: "customer",
    render: (_, record) =>
      record.customer ? (
        <CustomerInfo customer={record.customer} theme={theme} />
      ) : (
        <span
          style={{
            color: theme.employee.nameColor,
            fontStyle: "italic",
          }}
        >
          Deleted Customer
        </span>
      ),
    sorter: (a, b) => {
      const nameA = a.customer?.c_name || "";
      const nameB = b.customer?.c_name || "";
      return nameA.localeCompare(nameB);
    },
  },
  {
    title: "Total",
    dataIndex: "sl_total",
    key: "total",
    render: (value: number) => value?.toFixed(2),
    sorter: (a, b) => (a.sl_total || 0) - (b.sl_total || 0),
    width: "10%",
  },
  {
    title: "Discount",
    dataIndex: "sl_discount",
    key: "discount",
    sorter: (a, b) => (a.sl_discount || 0) - (b.sl_discount || 0),
    width: "8%",
  },
  {
    title: "Tax",
    dataIndex: "sl_tax",
    key: "tax",
    sorter: (a, b) => (a.sl_tax || 0) - (b.sl_tax || 0),
    width: "8%",
  },
  {
    title: "Date",
    dataIndex: "sl_date",
    key: "date",
    render: (date: string) => convertTimestampToDate(date) || "N/A",
    sorter: (a, b) =>
      new Date(a.sl_date).getTime() - new Date(b.sl_date).getTime(),
    width: "12%",
  },
  {
    title: "Status",
    dataIndex: "sl_status",
    key: "status",
    render: (status: string) => <StatusBadge status={status} />,
    filters: [
      { text: "Completed", value: "Completed" },
      { text: "Pending", value: "Pending" },
      { text: "Cancelled", value: "Cancelled" },
      { text: "Processing", value: "Processing" },
    ],
    onFilter: (value, record) => record.sl_status === value,
    width: "10%",
  },
  {
    title: "Type",
    dataIndex: "sl_type",
    key: "type",
    filters: [
      { text: "SELLITEMS", value: "SELLITEMS" },
      { text: "REPAIR", value: "REPAIR" },
      { text: "SERVICES", value: "SERVICES" },
    ],
    onFilter: (value, record) => record.sl_type === value,
    width: "10%",
  },
  {
    title: "In Amount",
    dataIndex: "sl_inamount",
    key: "inamount",
    render: (value: number) => value?.toFixed(2),
    sorter: (a, b) => (a.sl_inamount || 0) - (b.sl_inamount || 0),
    width: "10%",
  },
  {
    title: "Cost",
    dataIndex: "sl_cost",
    key: "cost",
    render: (value: number) => value?.toFixed(2),
    sorter: (a, b) => (a.sl_cost || 0) - (b.sl_cost || 0),
    width: "8%",
  },
  {
    title: "Bill Number",
    dataIndex: "sl_billnum",
    key: "billnum",
  },
  {
    title: "Payed",
    dataIndex: "sl_payed",
    key: "payed",
    render: (value: number) => value?.toFixed(2),
    sorter: (a, b) => (a.sl_payed || 0) - (b.sl_payed || 0),
    width: "8%",
  },
  {
    title: "Currency",
    dataIndex: "sl_currency",
    key: "currency",
    filters: [
      { text: "USD", value: "USD" },
      { text: "EUR", value: "EUR" },
      { text: "EGP", value: "EGP" },
    ],
    onFilter: (value, record) => record.sl_currency === value,
    width: "8%",
  },
];
