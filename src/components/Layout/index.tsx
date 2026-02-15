import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "@src/contexts/theme";
import { useAuthContext } from "@src/contexts/auth";
import Sidebar from "@src/components/Sidebar";
import Breadcrumb from "@src/components/Breadcrumb";
import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";
import { useMemo, useState } from "react";
import ModalStyle from "../UI/ModalStyle";
import TableStyle from "../UI/TableStyle";
import { useLogout } from "@src/queries/Auth";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const Layout = () => {
  const { isDark, theme, toggleTheme } = useThemeContext();
  const { logout: authLogout } = useAuthContext();
  const logoutMutation = useLogout(isDark);
  const itheme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      tasks: "/tasks",
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
      "/tasks": "Tasks",
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
        {/* Mobile Hamburger Button - Visible only on small screens */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <Button
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuOpen(true)}
            style={{
              background: theme.containerBg,
              color: isDark ? "#fff" : "#000",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          />
        </div>

        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar
            isDark={isDark}
            onItemClick={handleSidebarItemClick}
            currentPath={location.pathname}
          />
        </div>

        {/* Mobile Sidebar Drawer */}
        <Drawer
          placement="left"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          styles={{ body: { padding: 0, background: "transparent" } }}
          width={280}
          closable={false}
          style={{ background: "transparent" }}
        >
          <div style={{ height: "100%", padding: "10px" }}>
            <Sidebar
              isDark={isDark}
              onItemClick={(id) => {
                handleSidebarItemClick(id);
                setMobileMenuOpen(false);
              }}
              currentPath={location.pathname}
              mobile={true}
            />
          </div>
        </Drawer>

        {/* Breadcrumb */}
        <div className="md:pl-[298px] transition-all duration-300">
          <Breadcrumb
            isDark={isDark}
            currentPage={getCurrentPageName()}
            onThemeToggle={toggleTheme}
            onMenuItemClick={handleBreadcrumbItemClick}
          />
        </div>

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
        <div className="scrollable-content fixed left-0 md:left-[298px] top-0 right-0 bottom-0 overflow-y-auto pt-[101px] transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
