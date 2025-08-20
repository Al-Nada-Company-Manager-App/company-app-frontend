import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../contexts/useThemeContext";
import Sidebar from "../Sidebar";
import Breadcrumb from "../Breadcrumb";

const Layout = () => {
  const { isDark, theme, toggleTheme } = useThemeContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSidebarItemClick = (itemId: string) => {
    const routeMap: Record<string, string> = {
      dashboard: "/",
      employees: "/employees",
      customers: "/customers",
      stock: "/stock",
      sales: "/sales",
      purchases: "/purchases",
      suppliers: "/suppliers",
    };

    const newRoute = routeMap[itemId] || "/";
    navigate(newRoute);
  };

  const handleBreadcrumbItemClick = (itemId: string) => {
    console.log("Breadcrumb item clicked:", itemId);
  };

  const getCurrentPageName = () => {
    const pageNames: Record<string, string> = {
      "/": "Dashboard",
      "/employees": "Employees",
      "/customers": "Customers",
      "/stock": "Stock",
      "/sales": "Sales",
      "/purchases": "Purchases",
      "/suppliers": "Suppliers",
    };
    return pageNames[location.pathname] || "Dashboard";
  };

  return (
    <div
      className="relative w-screen h-screen"
      style={{ backgroundColor: theme.containerBg }}
    >
      {/* Sidebar */}
      <Sidebar
        isDark={isDark}
        onItemClick={handleSidebarItemClick}
        currentPath={location.pathname}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        isDark={isDark}
        currentPage={getCurrentPageName()}
        onThemeToggle={toggleTheme}
        onMenuItemClick={handleBreadcrumbItemClick}
      />

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-[30px]"
          style={{ backgroundImage: `url(${theme.backgroundImage})` }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: theme.gradient1 }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: theme.gradient2 }}
        />
      </div>

      {/* Scrollable Content Area */}
      <div className="scrollable-content fixed left-[298px] top-0 right-0 bottom-0 overflow-y-auto pt-[101px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
