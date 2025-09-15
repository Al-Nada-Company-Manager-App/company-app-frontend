import { createContext } from "react";

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);
