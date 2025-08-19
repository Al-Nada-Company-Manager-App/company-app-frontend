import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import Sidebar from ".//Sidebar";
import Breadcrumb from "./Breadcrumb";
import Employees from "./Employees";

const HomePage = () => {
  const { isDark, theme, toggleTheme } = useTheme();
  const [currentRoute, setCurrentRoute] = useState("/");

  const handleSidebarItemClick = (itemId: string) => {
    // Route mapping
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
    setCurrentRoute(newRoute);

    // Update browser URL without page refresh
    window.history.pushState({}, "", newRoute);
  };

  const handleBreadcrumbItemClick = (itemId: string) => {
    console.log("Breadcrumb item clicked:", itemId);
  };

  const renderContent = () => {
    switch (currentRoute) {
      case "/employees":
        return <Employees isDark={isDark} />;
      case "/users":
        return (
          <div className="absolute left-[298px] top-[101px] w-[1600px] h-[488.5px] flex items-center justify-center">
            <div
              className="text-2xl font-bold"
              style={{ color: theme.textColor }}
            >
              Users Page - Coming Soon
            </div>
          </div>
        );
      case "/customers":
        return (
          <div className="absolute left-[298px] top-[101px] w-[1600px] h-[488.5px] flex items-center justify-center">
            <div
              className="text-2xl font-bold"
              style={{ color: theme.textColor }}
            >
              Customers Page - Coming Soon
            </div>
          </div>
        );
      case "/stock":
        return (
          <div className="absolute left-[298px] top-[101px] w-[1600px] h-[488.5px] flex items-center justify-center">
            <div
              className="text-2xl font-bold"
              style={{ color: theme.textColor }}
            >
              Stock Page - Coming Soon
            </div>
          </div>
        );
      case "/sales":
        return (
          <div className="absolute left-[298px] top-[101px] w-[1600px] h-[488.5px] flex items-center justify-center">
            <div
              className="text-2xl font-bold"
              style={{ color: theme.textColor }}
            >
              Sales Page - Coming Soon
            </div>
          </div>
        );
      case "/purchases":
        return (
          <div className="absolute left-[298px] top-[101px] w-[1600px] h-[488.5px] flex items-center justify-center">
            <div
              className="text-2xl font-bold"
              style={{ color: theme.textColor }}
            >
              Purchases Page - Coming Soon
            </div>
          </div>
        );
      case "/suppliers":
        return (
          <div className="absolute left-[298px] top-[101px] w-[1600px] h-[488.5px] flex items-center justify-center">
            <div
              className="text-2xl font-bold"
              style={{ color: theme.textColor }}
            >
              Suppliers Page - Coming Soon
            </div>
          </div>
        );
      case "/":
      default:
        return (
          <div className="absolute left-[298px] top-[101px] w-[1600px] h-[488.5px] flex items-center justify-center">
            <div
              className="text-2xl font-bold"
              style={{ color: theme.textColor }}
            >
              Dashboard - Welcome to Company Manager
            </div>
          </div>
        );
    }
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
    return pageNames[currentRoute] || "Dashboard";
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
        currentPath={currentRoute}
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
        {/* Background with state-driven image */}
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-[30px]"
          style={{ backgroundImage: `url(${theme.backgroundImage})` }}
        />
        {/* Gradient overlay 1 */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: theme.gradient1 }}
        />
        {/* Gradient overlay 2 */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: theme.gradient2 }}
        />
      </div>

      {/* Scrollable Content Area */}
      <div className="scrollable-content fixed left-[298px] top-0 right-0 bottom-0 overflow-y-auto pt-[101px]">
        {renderContent()}
      </div>

      {/* Debug indicator */}
      <div className="fixed bottom-4 left-4 px-2 py-1 text-xs bg-black/50 text-white rounded z-50">
        Mode: {isDark ? "Dark" : "Light"} | Route: {currentRoute}
      </div>
    </div>
  );
};

export default HomePage;
