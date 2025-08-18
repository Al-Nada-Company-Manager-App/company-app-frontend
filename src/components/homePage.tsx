import { useTheme } from "../hooks/useTheme";
import Sidebar from ".//Sidebar";
import Breadcrumb from "./Breadcrumb";

const HomePage = () => {
  const { isDark, theme, toggleTheme } = useTheme();

  const handleSidebarItemClick = (itemId: string) => {
    console.log("Sidebar item clicked:", itemId);
    // Handle navigation logic here
  };

  const handleBreadcrumbItemClick = (itemId: string) => {
    console.log("Breadcrumb item clicked:", itemId);
    // Handle breadcrumb navigation logic here
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ backgroundColor: theme.containerBg }}
    >
      {/* Sidebar */}
      <Sidebar isDark={isDark} onItemClick={handleSidebarItemClick} />

      {/* Breadcrumb */}
      <Breadcrumb
        isDark={isDark}
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

      {/* Main Content Area (offset for sidebar) */}
      <div
        className="ml-72 relative z-10 flex items-center justify-center h-full"
        style={{ color: theme.textColor }}
      >
        {/* Debug indicator */}
        <div className="absolute bottom-4 left-4 px-2 py-1 text-xs bg-black/50 text-white rounded">
          Mode: {isDark ? "Dark" : "Light"}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
