import type { ReactNode } from "react";
import { AuthContext } from "./AuthContextObject";
import { useGetSession } from "@src/queries/Auth";
import { Loading } from "@src/components/UI";
import { useEffect, useState } from "react";
import type { Employee } from "@src/types/Employees/employee";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: sessionData, isLoading, refetch } = useGetSession();
  const [user, setUser] = useState<Employee | null>(() => {
    // Initialize from localStorage for Electron persistence
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (sessionData?.success && sessionData.user) {
      setUser(sessionData.user as unknown as Employee);
    }
    // If session check fails but we have valid local storage, trust local storage
  }, [sessionData]);

  const login = (userData: Employee) => {
    setUser(userData);
    refetch(); // Ensure session is fresh
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("isAuthenticated");
    setUser(null);
    refetch(); // Ensure session is cleared
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
