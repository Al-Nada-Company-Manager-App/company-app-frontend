import * as Icons from "lucide-react";
import type { BreadcrumbTheme } from "@src/types/Breadcrumb/breadcrumb";
import { useSearchContext } from "@src/contexts/search";

interface SearchInputProps {
  theme: BreadcrumbTheme;
}

const SearchInput = ({ theme }: SearchInputProps) => {
  const { searchQuery, setSearchQuery } = useSearchContext();

  const handleChange = (searchInput: string) => {
    setSearchQuery(searchInput);
    console.log("Search Input:", searchInput); // Debugging line
  }
  return (
    <div
      className="flex items-center px-4 py-2 rounded-2xl border-[0.5px] w-60"
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
  );
};

export default SearchInput;
