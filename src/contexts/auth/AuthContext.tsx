import type { ReactNode } from "react";
import { AuthContext } from "./AuthContextObject";
import { useGetSession } from "@src/queries/Auth";
import { Loading } from "@src/components/UI";
import { useEffect, useState } from "react";
import type { Employee } from "@src/types/Employees/employee";
import { useThemeContext } from "@src/contexts/theme";
import { ServerSettingsModal } from "@src/components/Auth/components";
import { Settings } from "lucide-react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: sessionData, isLoading, refetch } = useGetSession();
  // Do NOT seed user from localStorage — wait for the server session check.
  // This prevents expired tokens from letting users bypass authentication.
  const [user, setUser] = useState<Employee | null>(null);
  const { theme, isDark } = useThemeContext();
  const [showSettings, setShowSettings] = useState(false);
  const [loadingTooLong, setLoadingTooLong] = useState(false);
  
  // Track if this is the very first time we are loading the session
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Once isLoading is false for the first time, we lock in isInitialLoad to false
  if (isInitialLoad && !isLoading) {
    setIsInitialLoad(false);
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => {
        setLoadingTooLong(true);
      }, 5000);
    } else {
      setLoadingTooLong(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

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

  // Only block the entire app tree during the INITIAL load.
  // If we background refetch later (e.g. GuestGuard mounting), do NOT unmount the tree.
  if (isInitialLoad) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center relative p-4"
        style={{ background: theme.containerBg }}
      >
        <Loading />
        
        {loadingTooLong && (
          <div className="mt-8 flex flex-col items-center gap-4 animate-in fade-in duration-500">
            <p className="text-center max-w-md" style={{ color: theme.headers?.color || '#666' }}>
              Connection is taking longer than usual. The server might be unreachable or offline.
            </p>
            <button
              onClick={() => setShowSettings(true)}
              className="px-6 py-2.5 rounded-xl transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
              style={{
                background: theme.button?.background || '#1677ff',
                color: '#fff',
                border: 'none',
              }}
            >
              <Settings size={18} />
              Open Server Settings
            </button>
          </div>
        )}

        <ServerSettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          theme={theme}
          isDark={isDark}
        />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isInitialLoad || isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
