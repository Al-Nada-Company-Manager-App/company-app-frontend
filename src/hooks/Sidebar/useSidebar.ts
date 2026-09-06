import { useMemo } from "react";
import type { SidebarItem, SidebarTheme } from "@src/types/Sidebar/sidebar";
import { usePermission } from "@src/hooks/usePermission";
import type { EmployeePermissions } from "@src/types/Employees/employee";

// Extended interface for internal use
interface SidebarItemWithPermission extends SidebarItem {
  permission?: keyof EmployeePermissions;
  children?: SidebarItemWithPermission[];
}

const getSidebarItems = (): SidebarItemWithPermission[] => [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "Home",
    path: "/",
    // No permission needed for dashboard
  },
  {
    id: "employees",
    label: "Employees",
    icon: "Users",
    path: "/employees",
    permission: "users_page",
  },
  {
    id: "customers",
    label: "Customers",
    icon: "UserCheck",
    path: "/customers",
    permission: "customer_page",
  },
  {
    id: "stock",
    label: "Stock",
    icon: "Package",
    permission: "products_page", // Parent permission
    children: [
      {
        id: "products",
        label: "Products",
        icon: "Box",
        path: "/stock/products",
        permission: "products_page",
      },
      {
        id: "spare-parts",
        label: "Spare Parts",
        icon: "Box",
        path: "/stock/spare-parts",
        permission: "products_page",
      },
    ],
  },
  {
    id: "repairs",
    label: "Repairs",
    icon: "Wrench",
    path: "/repairs",
    permission: "repaire_page",
  },
  {
    id: "sales",
    label: "Sales",
    icon: "TrendingUp",
    path: "/sales",
    permission: "sales_page",
  },
  {
    id: "debts",
    label: "Debts",
    icon: "DollarSign",
    path: "/debts",
    permission: "debts_page",
  },
  {
    id: "purchases",
    label: "Purchases",
    icon: "ShoppingCart",
    path: "/purchases",
    permission: "purchase_page",
  },
  {
    id: "documents",
    label: "Documents",
    icon: "FileText",
    path: "/documents",
    permission: "price_page",
  },
  {
    id: "suppliers",
    label: "Suppliers",
    icon: "Truck",
    path: "/suppliers",
    permission: "supplier_page",
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: "ClipboardList",
    path: "/tasks",
    permission: "tasks_page",
  },
];

const lightTheme: SidebarTheme = {
  container: {
    background:
      "linear-gradient(111.84deg, rgba(255, 255, 255, 0.95) 59.3%, rgba(240, 240, 240, 0) 100%)",
    backdropFilter: "blur(60px)",
    borderRadius: "20px",
  },
  item: {
    normal: {
      background: "transparent",
      iconBackground: "#f8f9fa",
      iconColor: "#6c757d",
      textColor: "#495057",
    },
    active: {
      background: "#e3f2fd",
      iconBackground: "#2196f3",
      iconColor: "#ffffff",
      textColor: "#1976d2",
    },
  },
  helpSection: {
    background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
    iconBackground: "#ffffff",
    iconColor: "#0075FF",
    textColor: "#ffffff",
    buttonBackground:
      "linear-gradient(126.97deg, rgba(255, 255, 255, 0.2) 28.26%, rgba(255, 255, 255, 0.1) 91.2%)",
  },
  logo: {
    textColor: "#495057",
    gradient:
      "linear-gradient(97.89deg, #2196f3 70.67%, rgba(117, 122, 140, 0) 108.55%)",
  },
};

const darkTheme: SidebarTheme = {
  container: {
    background:
      "linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)",
    backdropFilter: "blur(60px)",
    borderRadius: "20px",
  },
  item: {
    normal: {
      background: "transparent",
      iconBackground: "#1A1F37",
      iconColor: "#0075FF",
      textColor: "#FFFFFF",
    },
    active: {
      background: "#1A1F37",
      iconBackground: "#0075FF",
      iconColor: "#FFFFFF",
      textColor: "#FFFFFF",
    },
  },
  helpSection: {
    background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    iconBackground: "#0075FF",
    iconColor: "#FFFFFF",
    textColor: "#FFFFFF",
    buttonBackground:
      "linear-gradient(126.97deg, rgba(0, 117, 255, 0.8) 28.26%, rgba(0, 117, 255, 0.6) 91.2%)",
  },
  logo: {
    textColor: "#FFFFFF",
    gradient:
      "linear-gradient(97.89deg, #FFFFFF 70.67%, rgba(117, 122, 140, 0) 108.55%)",
  },
};

export const useSidebar = (isDark: boolean) => {
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const { hasPermission } = usePermission();

  const items = useMemo(() => {
    const allItems = getSidebarItems();
    return allItems
      .filter((item) => {
        if (!item.permission) return true;
        return hasPermission(item.permission);
      })
      .map((item) => {
        // Handle children filtering if needed
        if (item.children) {
          return {
            ...item,
            children: item.children.filter((child) => {
              if (!child.permission) return true;
              return hasPermission(child.permission);
            }),
          };
        }
        return item;
      });
  }, [hasPermission]);

  return {
    items,
    theme,
  };
};
