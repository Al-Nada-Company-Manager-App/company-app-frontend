import { useBreadcrumb } from "@src/hooks/Breadcrumb/useBreadcrumb";
import SearchInput from "./components/SearchInput";
import UserMenu from "./components/UserMenu";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ROUTES } from "@src/config/routes";

interface BreadcrumbProps {
  isDark: boolean;
  onThemeToggle?: () => void;
  onMenuItemClick?: (itemId: string) => void;
}

const Breadcrumb = ({
  isDark,
  onThemeToggle,
  onMenuItemClick,
}: BreadcrumbProps) => {
  const { theme, userMenuItems, scrolledTheme } = useBreadcrumb(isDark);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  // Derive breadcrumbs dynamically
  let currentRouteMeta = undefined;
  for (const key in ROUTES) {
    if (ROUTES[key].path === location.pathname) {
      currentRouteMeta = ROUTES[key];
      break;
    }
  }

  const currentPage = currentRouteMeta?.title || "Dashboard";
  
  let breadcrumbPath = "";
  if (currentRouteMeta?.parent && ROUTES[currentRouteMeta.parent]) {
    breadcrumbPath = `${ROUTES[currentRouteMeta.parent].title} / ${currentRouteMeta.title}`;
  } else {
    breadcrumbPath = currentRouteMeta?.title || "Dashboard";
  }

  const showSearch = !!currentRouteMeta?.searchable;

  return (
    <div
      className="fixed left-14 md:left-[322px] top-4 sm:top-6 right-2 sm:right-6 flex items-center justify-end sm:justify-between z-30 transition-all duration-300"
      style={{
        background: currentTheme.container.background,
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
        padding: isScrolled ? "8px 12px" : "0",
        borderRadius: isScrolled ? "12px" : "0",
      }}
    >
      {/* Left side - Breadcrumb */}
      <div className="hidden sm:flex flex-col">
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
            aria-current="page"
          >
            {currentPage}
          </span>
        </div>
      </div>

      {/* Right side - Search and Menu */}
      <div className="flex items-center gap-2 sm:gap-6">
        {showSearch && <SearchInput theme={currentTheme} />}
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
