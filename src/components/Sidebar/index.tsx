import { useSidebar } from "../../hooks/useSidebar";
import type { SidebarProps } from "../../types/Sidebar/sidebar";

import HelpSection from "./components/HelpSection";
import NavigationMenu from "./components/NavigationMenu";
import Logo from "./components/Logo";

const Sidebar = ({ isDark, onItemClick }: SidebarProps) => {
  const { theme } = useSidebar(isDark);

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
        <Logo />
      </div>

      {/* Navigation Menu */}
      <NavigationMenu isDark={isDark} onItemClick={handleItemClick} />

      {/* Decorative Circles (optional) */}

      {/* Help Section */}
      <HelpSection isDark={isDark} />
    </div>
  );
};

export default Sidebar;
