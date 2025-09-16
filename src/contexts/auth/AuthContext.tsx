import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContextObject";
import type { Employee } from "@src/types/Employees/employee";

interface AuthProviderProps {
  children: ReactNode;
}

// Dummy user data for development
const dummyUser: Employee = {
  e_id: 1,
  f_name: "Ahmed",
  l_name: "Fathy",
  birth_date: "1990-05-15",
  salary: 5000,
  e_role: "Manager",
  e_photo: "/public/Images/employees/1.jpg",
  e_address: "123 Main St",
  e_email: "ahmed.fathy@company.com",
  e_phone: "+1234567890",
  e_city: "Cairo",
  e_country: "Egypt",
  e_zipcode: "12345",
  e_username: "ahmed.fathy",
  e_gender: "Male",
  e_active: true,
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Employee | null>(dummyUser); // Set dummy user for now
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Set to true for development

  const login = (userData: Employee) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
