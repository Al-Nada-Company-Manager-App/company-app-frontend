import * as Icons from "lucide-react";
import type { BreadcrumbTheme } from "@src/types/Breadcrumb/breadcrumb";
import { useSearchContext } from "@src/contexts/search";
import { useState } from "react";

interface SearchInputProps {
  theme: BreadcrumbTheme;
}

const SearchInput = ({ theme }: SearchInputProps) => {
  const { searchQuery, setSearchQuery } = useSearchContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (searchInput: string) => {
    setSearchQuery(searchInput);
    console.log("Search Input:", searchInput); // Debugging line
  };

  return (
    <>
      {/* Mobile: Icon-only button */}
      <button
        className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl border-[0.5px] cursor-pointer"
        style={{
          background: theme.searchInput.background,
          borderColor: theme.searchInput.borderColor,
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Toggle search"
      >
        <Icons.Search size={16} color={theme.searchInput.iconColor} />
      </button>

      {/* Mobile: Expandable search overlay */}
      {isExpanded && (
        <div
          className="sm:hidden fixed left-2 right-2 top-16 z-50 flex items-center px-4 py-3 rounded-2xl border-[0.5px] shadow-lg"
          style={{
            background: theme.searchInput.background,
            borderColor: theme.searchInput.borderColor,
          }}
        >
          <div className="mr-2">
            <Icons.Search size={15} color={theme.searchInput.iconColor} />
          </div>
          <input
            type="text"
            placeholder="Type here..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{
              color: theme.searchInput.textColor,
            }}
            value={searchQuery}
            onChange={(e) => handleChange(e.target.value)}
            autoFocus
          />
          <button
            className="ml-2 cursor-pointer"
            onClick={() => setIsExpanded(false)}
            aria-label="Close search"
          >
            <Icons.X size={16} color={theme.searchInput.iconColor} />
          </button>
        </div>
      )}

      {/* Desktop: Full search input */}
      <div
        className="hidden sm:flex items-center px-4 py-2 rounded-2xl border-[0.5px] w-60"
        style={{
          background: theme.searchInput.background,
          borderColor: theme.searchInput.borderColor,
        }}
      >
        <div className="mr-2">
          <Icons.Search size={15} color={theme.searchInput.iconColor} />
        </div>
        <input
          type="text"
          placeholder="Type here..."
          className="flex-1 bg-transparent outline-none text-xs overflow-hidden text-ellipsis whitespace-nowrap"
          style={{
            color: theme.searchInput.textColor,
          }}
          value={searchQuery}
          onChange={(e) => handleChange(e.target.value)}
        />
        <style>{`
        ::placeholder {
          color: ${theme.searchInput.placeholderColor};
        }
        `}</style>
      </div>
    </>
  );
};

export default SearchInput;
