import type { ColumnsType } from "antd/es/table";
import type { Employee } from "@src/types/Employees/employee";
import type { Theme } from "@src/types/theme";
import EmployeeInfo from "./components/EmployeeInfo";
import EmployeeRole from "./components/EmployeeRole";
import StatusBadge from "@src/components/UI/StatusBadge";
import EmployeeDate from "./components/EmployeeDate";

export const getEmployeeColumns = (theme: Theme): ColumnsType<Employee> => [
  {
    title: "Employee",
    dataIndex: "f_name",
    key: "employee",
    filterSearch: true,
    onFilter: (value, record) => {
      const searchTerm = String(value).toLowerCase();
      return (
        record.f_name.toLowerCase().includes(searchTerm) ||
        record.l_name.toLowerCase().includes(searchTerm) ||
        record.e_email?.toLowerCase().includes(searchTerm) ||
        false ||
        record.e_phone?.includes(searchTerm) ||
        false
      );
    },
    sorter: (a, b) => {
      const nameA = `${a.f_name} ${a.l_name}`;
      const nameB = `${b.f_name} ${b.l_name}`;
      return nameA.localeCompare(nameB);
    },
    render: (_, record: Employee) => (
      <EmployeeInfo employee={record} theme={theme} />
    ),
  },
  {
    title: "FUNCTION",
    dataIndex: "e_role",
    key: "function",
    filters: [
      { text: "Manager", value: "Manager" },
      { text: "Employee", value: "Employee" },
      { text: "Admin", value: "Admin" },
      { text: "Sales Representative", value: "Sales Representative" },
      { text: "Technician", value: "Technician" },
      { text: "Supervisor", value: "Supervisor" },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.e_role === value,
    sorter: (a, b) => a.e_role.localeCompare(b.e_role),
    render: (_, record: Employee) => (
      <EmployeeRole employee={record} theme={theme} />
    ),
  },
  {
    title: "STATUS",
    dataIndex: "e_active",
    key: "status",
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    onFilter: (value, record) => record.e_active === value,
    sorter: (a, b) => Number(b.e_active) - Number(a.e_active), // Active first
    render: (e_active: boolean) => (
      <StatusBadge status={e_active ? "active" : "inactive"} />
    ),
  },
  {
    title: "EMPLOYED",
    dataIndex: "birth_date",
    key: "employed",
    sorter: (a, b) =>
      new Date(a.birth_date).getTime() - new Date(b.birth_date).getTime(),
    render: (date: string) => <EmployeeDate date={date} theme={theme} />,
  },
  {
    title: "Salary",
    dataIndex: "salary",
    key: "salary",
    sorter: (a, b) => (a.salary || 0) - (b.salary || 0),
    render: (salary: number | null) => (
      <span style={{ color: theme.employee.nameColor }}>
        {salary != null ? `$${salary.toLocaleString()}` : "N/A"}
      </span>
    ),
  },
  {
    title: "City",
    dataIndex: "e_city",
    key: "city",
    filters: [
      { text: "Cairo", value: "Cairo" },
      { text: "Alexandria", value: "Alexandria" },
      { text: "Giza", value: "Giza" },
      { text: "Sharm El Sheikh", value: "Sharm El Sheikh" },
      { text: "Hurghada", value: "Hurghada" },
    ],
    filterSearch: true,
    onFilter: (value, record) =>
      record.e_city.toLowerCase().includes(String(value).toLowerCase()),
    sorter: (a, b) => a.e_city.localeCompare(b.e_city),
    render: (city: string) => (
      <span style={{ color: theme.employee.nameColor }}>{city || "N/A"}</span>
    ),
  },
  {
    title: "Gender",
    dataIndex: "e_gender",
    key: "gender",
    filters: [
      { text: "Male", value: "Male" },
      { text: "Female", value: "Female" },
    ],
    onFilter: (value, record) => record.e_gender === value,
    render: (gender: string) => (
      <span style={{ color: theme.employee.nameColor }}>{gender || "N/A"}</span>
    ),
  },
];
