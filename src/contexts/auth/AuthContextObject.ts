import { createContext } from "react";
import type { Employee } from "@src/types/Employees/employee";

export interface AuthContextType {
  user: Employee | null;
  isAuthenticated: boolean;
  login: (user: Employee) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
