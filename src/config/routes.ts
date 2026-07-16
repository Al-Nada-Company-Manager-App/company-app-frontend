import type { EmployeePermissions } from "@src/types/Employees/employee";

export type RouteMeta = {
  path: string;
  title: string;
  label: string;
  permission?: keyof EmployeePermissions;
  parent?: string;
  searchable?: boolean;
};

export const ROUTES: Record<string, RouteMeta> = {
  dashboard: {
    path: "/",
    title: "Dashboard",
    label: "Dashboard",
    searchable: false,
  },
  employees: {
    path: "/employees",
    title: "Employees",
    label: "Employees",
    permission: "users_page",
    searchable: true,
  },
  customers: {
    path: "/customers",
    title: "Customers",
    label: "Customers",
    permission: "customer_page",
    searchable: true,
  },
  stock: {
    path: "/stock",
    title: "Stock",
    label: "Stock",
    permission: "products_page",
    searchable: false,
  },
  products: {
    path: "/stock/products",
    title: "Products",
    label: "Products",
    permission: "products_page",
    parent: "stock",
    searchable: true,
  },
  "spare-parts": {
    path: "/stock/spare-parts",
    title: "Spare Parts",
    label: "Spare Parts",
    permission: "products_page",
    parent: "stock",
    searchable: true,
  },
  repairs: {
    path: "/repairs",
    title: "Repairs",
    label: "Repairs",
    permission: "repaire_page",
    searchable: true,
  },
  sales: {
    path: "/sales",
    title: "Sales",
    label: "Sales",
    permission: "sales_page",
    searchable: true,
  },
  debts: {
    path: "/debts",
    title: "Debts",
    label: "Debts",
    permission: "debts_page",
    searchable: true,
  },
  purchases: {
    path: "/purchases",
    title: "Purchases",
    label: "Purchases",
    permission: "purchase_page",
    searchable: true,
  },
  suppliers: {
    path: "/suppliers",
    title: "Suppliers",
    label: "Suppliers",
    permission: "supplier_page",
    searchable: true,
  },
  quotations: {
    path: "/quotations",
    title: "Quotations",
    label: "Quotations",
    permission: "price_page",
    searchable: true,
  },
  tasks: {
    path: "/tasks",
    title: "Tasks",
    label: "Tasks",
    permission: "tasks_page",
    searchable: true,
  },
  profile: {
    path: "/profile",
    title: "Profile",
    label: "Profile",
    searchable: false,
  },
};
