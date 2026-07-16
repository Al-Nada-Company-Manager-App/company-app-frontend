import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "@src/contexts/theme";
import { useAuthContext } from "@src/contexts/auth";
import Sidebar from "@src/components/Sidebar";
import Breadcrumb from "@src/components/Breadcrumb";
import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";
import { useMemo, useState, useEffect } from "react";
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

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleBreadcrumbItemClick = async (itemId: string) => {
    console.log("Breadcrumb item clicked:", itemId);

    // Handle profile navigation
    if (itemId === "profile" || itemId === "settings") {
      navigate("/profile");
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

  return (
    <>
      <ModalStyle />
      <TableStyle theme={itheme} />
      <div
        className="relative w-screen h-screen"
        style={{ backgroundColor: theme.containerBg }}
      >
        {/* Mobile Hamburger Button - Visible only on small screens */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <Button
            aria-label="Open navigation"
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
          closable={true}
          style={{ background: "transparent" }}
        >
          <div style={{ height: "100%", padding: "10px" }}>
            <Sidebar
              isDark={isDark}
              currentPath={location.pathname}
              mobile={true}
            />
          </div>
        </Drawer>

        {/* Breadcrumb */}
        <div className="md:pl-[298px] transition-all duration-300">
          <Breadcrumb
            isDark={isDark}
            onThemeToggle={toggleTheme}
            onMenuItemClick={handleBreadcrumbItemClick}
          />
        </div>

        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur-[10px]"
            style={{ backgroundImage: `url(${theme.backgroundImage})` }}
          />
        </div>

        {/* Scrollable Content Area */}
        <div className="scrollable-content fixed left-0 md:left-[298px] top-[101px] right-0 bottom-0 overflow-y-auto transition-all duration-300 p-4 md:p-6 md:pr-8">
          <div className="w-full min-h-full rounded-3xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
