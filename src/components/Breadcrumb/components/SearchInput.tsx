import * as Icons from "lucide-react";
import type { BreadcrumbTheme } from "../../../types/Breadcrumb/breadcrumb";

interface SearchInputProps {
  theme: BreadcrumbTheme;
}

const SearchInput = ({ theme }: SearchInputProps) => {
  return (
    <div
      className="flex items-center px-4 py-2 rounded-2xl border-[0.5px] w-48"
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
        className="flex-1 bg-transparent outline-none text-xs"
        style={{
          color: theme.searchInput.textColor,
        }}
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
