import type { ColumnsType } from "antd/es/table";
import type { Purchases } from "@src/types/Purchases/purchases";
import type { Theme } from "@src/types/theme";
import SupplierInfo from "./components/SupplierInfo";
import { convertTimestampToDate } from "@src/utils/ConvertDate";

export const getPurchasesColumns = (theme: Theme): ColumnsType<Purchases> => [
  {
    title: "Supplier",
    dataIndex: ["supplier", "s_name"],
    key: "supplier",
    render: (_, record) =>
      record.supplier ? (
        <SupplierInfo supplier={record.supplier} theme={theme} />
      ) : (
        <span
          style={{
            color: theme.employee.nameColor,
            fontStyle: "italic",
          }}
        >
          Deleted Supplier
        </span>
      ),
    sorter: (a, b) => {
      const nameA = a.supplier?.s_name || "";
      const nameB = b.supplier?.s_name || "";
      return nameA.localeCompare(nameB);
    },
  },
  {
    title: "Total",
    dataIndex: "pch_total",
    key: "total",
    render: (value: number) => value?.toFixed(2),
    sorter: (a, b) => (a.pch_total || 0) - (b.pch_total || 0),
    width: "10%",
  },
  {
    title: "Tax",
    dataIndex: "pch_tax",
    key: "tax",
    sorter: (a, b) => (a.pch_tax || 0) - (b.pch_tax || 0),
    width: "8%",
  },
  {
    title: "Cost",
    dataIndex: "pch_cost",
    key: "cost",
    render: (value: number) => value?.toFixed(2),
    sorter: (a, b) => (a.pch_cost || 0) - (b.pch_cost || 0),
    width: "10%",
  },
  {
    title: "Date",
    dataIndex: "pch_date",
    key: "date",
    render: (date: string) => convertTimestampToDate(date) || "N/A",
    sorter: (a, b) =>
      new Date(a.pch_date).getTime() - new Date(b.pch_date).getTime(),
    width: "12%",
  },
  {
    title: "Bill Number",
    dataIndex: "pch_billnum",
    key: "billnum",
    sorter: (a, b) =>
      String(a.pch_billnum || "").localeCompare(String(b.pch_billnum || "")),
    filterSearch: true,
    onFilter: (value, record) =>
      String(record.pch_billnum || "")
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    width: "10%",
  },
  {
    title: "Currency",
    dataIndex: "pch_currency",
    key: "currency",
    filters: [
      { text: "USD", value: "USD" },
      { text: "EUR", value: "EUR" },
      { text: "EGP", value: "EGP" },
    ],
    onFilter: (value, record) => record.pch_currency === value,
    width: "8%",
  },
  {
    title: "Expense",
    dataIndex: "pch_expense",
    key: "expense",
    render: (value: number) => value?.toFixed(2),
    sorter: (a, b) => (a.pch_expense || 0) - (b.pch_expense || 0),
    width: "10%",
  },
  {
    title: "Customs Cost",
    dataIndex: "pch_customscost",
    key: "customescost",
    render: (value: number) => value?.toFixed(2),
    sorter: (a, b) => (a.pch_customscost || 0) - (b.pch_customscost || 0),
    width: "12%",
  },
  {
    title: "Customs Number",
    dataIndex: "pch_customsnum",
    key: "customsnum",
    width: "12%",
  },
];
