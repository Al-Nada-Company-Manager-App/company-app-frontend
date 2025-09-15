import type { ColumnsType } from "antd/es/table";
import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";
import CustomerInfo from "./components/CustomerInfo";

export const getCustomerColumns = (theme: Theme): ColumnsType<Customer> => [
  {
    title: "Customer",
    dataIndex: "c_name",
    key: "customer",
    filterSearch: true,
    onFilter: (value, record) => {
      const searchTerm = String(value).toLowerCase();
      return (
        record.c_name.toLowerCase().includes(searchTerm) ||
        record.c_email.toLowerCase().includes(searchTerm) ||
        record.c_phone.includes(searchTerm)
      );
    },
    sorter: (a, b) => a.c_name.localeCompare(b.c_name),
    render: (_, record: Customer) => (
      <CustomerInfo customer={record} theme={theme} />
    ),
  },
  {
    title: "Address",
    dataIndex: "c_address",
    key: "address",
    filterSearch: true,
    onFilter: (value, record) =>
      record.c_address.toLowerCase().includes(String(value).toLowerCase()),
    render: (address: string) => (
      <span style={{ color: theme.employee.nameColor }}>{address || "N/A"}</span>
    ),
  },
  {
    title: "City",
    dataIndex: "c_city",
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
      record.c_city.toLowerCase().includes(String(value).toLowerCase()),
    render: (city: string) => (
      <span style={{ color: theme.employee.nameColor }}>{city || "N/A"}</span>
    ),
  },
  {
    title: "Country",
    dataIndex: "c_country",
    key: "country",
    filters: [
      { text: "Egypt", value: "Egypt" },
      { text: "Saudi Arabia", value: "Saudi Arabia" },
      { text: "UAE", value: "UAE" },
      { text: "Kuwait", value: "Kuwait" },
      { text: "Qatar", value: "Qatar" },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.c_country === value,
    render: (country: string) => (
      <span style={{ color: theme.employee.nameColor }}>{country || "N/A"}</span>
    ),
  },
  {
    title: "Zipcode",
    dataIndex: "c_zipcode",
    key: "zipcode",
    filterSearch: true,
    onFilter: (value, record) => record.c_zipcode.includes(String(value)),
    render: (zipcode: string) => (
      <span style={{ color: theme.employee.nameColor }}>{zipcode || "N/A"}</span>
    ),
  },
  {
    title: "Fax",
    dataIndex: "c_fax",
    key: "fax",
    filterSearch: true,
    onFilter: (value, record) => record.c_fax.includes(String(value)),
    render: (fax: string) => (
      <span style={{ color: theme.employee.nameColor }}>{fax || "N/A"}</span>
    ),
  },
  {
    title: "Phone",
    dataIndex: "c_phone",
    key: "phone",
    filterSearch: true,
    onFilter: (value, record) => record.c_phone.includes(String(value)),
    render: (phone: string) => (
      <span style={{ color: theme.employee.nameColor }}>{phone || "N/A"}</span>
    ),
  },
];
