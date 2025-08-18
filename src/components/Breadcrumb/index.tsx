import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import SearchInput from "./components/SearchInput";
import UserMenu from "./components/UserMenu";

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
  const { theme, userMenuItems } = useBreadcrumb(isDark);

  const handleMenuItemClick = (itemId: string) => {
    if (itemId === "theme" && onThemeToggle) {
      onThemeToggle();
    } else if (onMenuItemClick) {
      onMenuItemClick(itemId);
    }
  };

  return (
    <div className="absolute left-80 top-6 right-6 flex items-center justify-between z-30">
      {/* Left side - Breadcrumb */}
      <div className="flex flex-col">
        <div className="mb-1">
          <span
            className="text-xs font-normal"
            style={{ color: theme.breadcrumbText.color }}
          >
            {breadcrumbPath}
          </span>
        </div>
        <div>
          <span
            className="text-sm font-normal"
            style={{ color: theme.title.color }}
          >
            {currentPage}
          </span>
        </div>
      </div>

      {/* Right side - Search and Menu */}
      <div className="flex items-center gap-6">
        <SearchInput theme={theme} />
        <UserMenu
          theme={theme}
          items={userMenuItems}
          onItemClick={handleMenuItemClick}
          isDark={isDark}
        />
      </div>
    </div>
  );
};

export default Breadcrumb;
