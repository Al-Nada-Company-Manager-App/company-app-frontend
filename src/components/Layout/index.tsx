import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "@src/contexts/theme";
import { useAuthContext } from "@src/contexts/auth";
import Sidebar from "@src/components/Sidebar";
import Breadcrumb from "@src/components/Breadcrumb";
import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";
import { useMemo } from "react";
import ModalStyle from "../UI/ModalStyle";
import TableStyle from "../UI/TableStyle";
import { useLogout } from "@src/queries/Auth";

const Layout = () => {
  const { isDark, theme, toggleTheme } = useThemeContext();
  const { logout: authLogout } = useAuthContext();
  const logoutMutation = useLogout(isDark);
  const itheme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSidebarItemClick = (itemId: string) => {
    const routeMap: Record<string, string> = {
      dashboard: "/",
      employees: "/employees",
      customers: "/customers",
      stock: "/stock",
      products: "/stock/products",
      "spare-parts": "/stock/spare-parts",
      repairs: "/repairs",
      sales: "/sales",
      quotations: "/quotations",
      debts: "/debts",
      purchases: "/purchases",
      suppliers: "/suppliers",
    };

    const newRoute = routeMap[itemId] || "/";
    navigate(newRoute);
  };

  const handleBreadcrumbItemClick = async (itemId: string) => {
    console.log("Breadcrumb item clicked:", itemId);

    // Handle profile navigation
    if (itemId === "profile") {
      navigate("/profile");
    }
    // Handle settings or other menu items here
    if (itemId === "settings") {
      navigate("/profile"); // For now, redirect settings to profile
    }
    // Handle help
    if (itemId === "help") {
      // Open help modal or navigate to help page
      console.log("Opening help...");
      // You can implement help modal or help page here
    }
    // Handle logout
    if (itemId === "logout") {
      try {
        await logoutMutation.mutateAsync();
        authLogout(); // Clear local auth context
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  const getCurrentPageName = () => {
    const pageNames: Record<string, string> = {
      "/": "Dashboard",
      "/employees": "Employees",
      "/customers": "Customers",
      "/stock": "Stock",
      "/profile": "Profile",
      "/sales": "Sales",
      "/debts": "Debts",
      "/purchases": "Purchases",
      "/suppliers": "Suppliers",
    };
    return pageNames[location.pathname] || "Dashboard";
  };

  return (
    <>
      <ModalStyle theme={itheme} />
      <TableStyle theme={itheme} />
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
    </>
  );
};

export default Layout;
