import { useBreadcrumb } from "../../hooks/Breadcrumb/useBreadcrumb";
import SearchInput from "./components/SearchInput";
import UserMenu from "./components/UserMenu";
import { useState, useEffect } from "react";

interface BreadcrumbProps {
  isDark: boolean;
  currentPage?: string;
  breadcrumbPath?: string;
  onThemeToggle?: () => void;
  onMenuItemClick?: (itemId: string) => void;
}

const Breadcrumb = ({
  isDark,
  currentPage = "Tables",
  breadcrumbPath = "Breadcrumb",
  onThemeToggle,
  onMenuItemClick,
}: BreadcrumbProps) => {
  const { theme, userMenuItems, scrolledTheme } = useBreadcrumb(isDark);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableElement = document.querySelector(".scrollable-content");
      if (scrollableElement) {
        const scrollTop = scrollableElement.scrollTop;
        setIsScrolled(scrollTop > 50); // Change background after 50px scroll
      }
    };

    const scrollableElement = document.querySelector(".scrollable-content");
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
      return () =>
        scrollableElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const currentTheme = isScrolled ? scrolledTheme : theme;

  const handleMenuItemClick = (itemId: string) => {
    if (itemId === "theme" && onThemeToggle) {
      onThemeToggle();
    } else if (onMenuItemClick) {
      onMenuItemClick(itemId);
    }
  };

  return (
    <div
      className="fixed left-[322px] top-6 right-6 flex items-center justify-between z-30 transition-all duration-300"
      style={{
        background: currentTheme.container.background,
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
        padding: isScrolled ? "12px 16px" : "0",
        borderRadius: isScrolled ? "12px" : "0",
      }}
    >
      {/* Left side - Breadcrumb */}
      <div className="flex flex-col">
        <div className="mb-1">
          <span
            className="text-xs font-normal"
            style={{ color: currentTheme.breadcrumbText.color }}
          >
            {breadcrumbPath}
          </span>
        </div>
        <div>
          <span
            className="text-sm font-normal"
            style={{ color: currentTheme.title.color }}
          >
            {currentPage}
          </span>
        </div>
      </div>

      {/* Right side - Search and Menu */}
      <div className="flex items-center gap-6">
        <SearchInput theme={currentTheme} />
        <UserMenu
          theme={currentTheme}
          items={userMenuItems}
          onItemClick={handleMenuItemClick}
          isDark={isDark}
        />
      </div>
    </div>
  );
};

export default Breadcrumb;
