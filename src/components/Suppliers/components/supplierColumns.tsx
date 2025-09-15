import type { ColumnsType } from "antd/es/table";
import type { Supplier } from "@src/types/Suppliers/supplier";
import type { Theme } from "@src/types/theme";
import SupplierInfo from "./components/SupplierInfo";

export const getSupplierColumns = (theme: Theme): ColumnsType<Supplier> => [
  {
    title: "Supplier",
    dataIndex: "s_name",
    key: "supplier",
    filterSearch: true,
    onFilter: (value, record) => {
      const searchTerm = String(value).toLowerCase();
      return (
        record.s_name.toLowerCase().includes(searchTerm) ||
        record.s_email.toLowerCase().includes(searchTerm) ||
        record.s_phone.includes(searchTerm)
      );
    },
    sorter: (a, b) => a.s_name.localeCompare(b.s_name),
    render: (_, record: Supplier) => (
      <SupplierInfo supplier={record} theme={theme} />
    ),
  },
  {
    title: "Address",
    dataIndex: "s_address",
    key: "address",
    filterSearch: true,
    render: (address: string) => (
      <span style={{ color: theme.employee.nameColor }}>
        {address || "N/A"}
      </span>
    ),
  },
  {
    title: "City",
    dataIndex: "s_city",
    key: "city",
    filters: [
      // These would typically be dynamically generated from your data
      { text: "Cairo", value: "Cairo" },
      { text: "Alexandria", value: "Alexandria" },
      { text: "Giza", value: "Giza" },
      { text: "Sharm El Sheikh", value: "Sharm El Sheikh" },
      { text: "Hurghada", value: "Hurghada" },
    ],
    filterSearch: true,
    onFilter: (value, record) =>
      record.s_city.toLowerCase().includes(String(value).toLowerCase()),
    render: (city: string) => (
      <span style={{ color: theme.employee.nameColor }}>{city || "N/A"}</span>
    ),
  },
  {
    title: "Country",
    dataIndex: "s_country",
    key: "country",
    filters: [
      { text: "Egypt", value: "Egypt" },
      { text: "Saudi Arabia", value: "Saudi Arabia" },
      { text: "UAE", value: "UAE" },
      { text: "Kuwait", value: "Kuwait" },
      { text: "Qatar", value: "Qatar" },
      { text: "China", value: "China" },
      { text: "India", value: "India" },
      { text: "Turkey", value: "Turkey" },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.s_country === value,
    render: (country: string) => (
      <span style={{ color: theme.employee.nameColor }}>
        {country || "N/A"}
      </span>
    ),
  },
  {
    title: "Zipcode",
    dataIndex: "s_zipcode",
    key: "zipcode",
    filterSearch: true,
    render: (zipcode: string) => (
      <span style={{ color: theme.employee.nameColor }}>
        {zipcode || "N/A"}
      </span>
    ),
  },
  {
    title: "Fax",
    dataIndex: "s_fax",
    key: "fax",
    filterSearch: true,
    render: (fax: string) => (
      <span style={{ color: theme.employee.nameColor }}>{fax || "N/A"}</span>
    ),
  },
  {
    title: "Phone",
    dataIndex: "s_phone",
    key: "phone",
    filterSearch: true,
    render: (phone: string) => (
      <span style={{ color: theme.employee.nameColor }}>{phone || "N/A"}</span>
    ),
  },
];
