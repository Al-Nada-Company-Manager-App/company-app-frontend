import { useSidebar } from "@src/hooks/Sidebar/useSidebar";
import type { SidebarProps } from "@src/types/Sidebar/sidebar";

import HelpSection from "./components/HelpSection";
import NavigationMenu from "./components/NavigationMenu";
import Logo from "./components/Logo";

const Sidebar = ({ isDark, currentPath = "/", onItemClick }: SidebarProps) => {
  console.log("Sidebar");
  const {theme } = useSidebar(isDark, currentPath);

  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <div
      className="fixed left-2.5 top-2.5 w-66 h-[calc(100vh-20px)] z-40"
      style={{
        background: theme.container.background,
        backdropFilter: theme.container.backdropFilter,
        borderRadius: theme.container.borderRadius,
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center mt-4 mb-8">
        <Logo isDark={isDark}  />
      </div>

      {/* Navigation Menu */}
      <NavigationMenu
        isDark={isDark}
        currentPath={currentPath}
        onItemClick={handleItemClick}
      />

      {/* Decorative Circles (optional) */}

      {/* Help Section */}
      <HelpSection isDark={isDark} currentPath={currentPath} />
    </div>
  );
};

export default Sidebar;
