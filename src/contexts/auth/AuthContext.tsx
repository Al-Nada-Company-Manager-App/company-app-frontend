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
  // Do NOT seed user from localStorage — wait for the server session check.
  // This prevents expired tokens from letting users bypass authentication.
  const [user, setUser] = useState<Employee | null>(null);

  useEffect(() => {
    if (sessionData?.success && sessionData.user) {
      setUser(sessionData.user as unknown as Employee);
    } else if (sessionData !== undefined && !sessionData.success) {
      // Token expired or rejected by the server — wipe every auth artifact
      localStorage.removeItem("auth_user");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("authToken");
      setUser(null);
    }
  }, [sessionData]);

  const login = (userData: Employee) => {
    setUser(userData);
    refetch(); // Ensure session is fresh
  };

  const logout = () => {
    localStorage.removeItem("authToken");
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
