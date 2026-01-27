import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@src/hooks/Auth/useAuth";
import { useAuthContext } from "@src/contexts/auth";
import { LoginForm, RegisterForm, ForgotPasswordForm } from "./components";
import { LogIn, UserPlus, KeyRound } from "lucide-react";

interface AuthProps {
  isDark: boolean;
}

type AuthTab = "login" | "register" | "forgot";

const Auth = ({ isDark }: AuthProps) => {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const navigate = useNavigate();
  const {
    theme,
    isLoginLoading,
    isChangePasswordLoading,
    isRegisterLoading,
    login,
    changePassword,
    register,
    refetchSession,
  } = useAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { login: authLogin, isAuthenticated } = useAuthContext();

  // Redirect when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (username: string, password: string) => {
    const result = await login({ username, password });
    if (result.success) {
      // Refetch session to get full user data
      const sessionResult = await refetchSession();
      if (sessionResult.data?.success && sessionResult.data?.user) {
        // Persist to localStorage for Electron race condition safety
        localStorage.setItem(
          "auth_user",
          JSON.stringify(sessionResult.data.user),
        );
        localStorage.setItem("isAuthenticated", "true");

        authLogin({
          e_id: sessionResult.data.user.e_id,
          f_name: sessionResult.data.user.f_name,
          l_name: sessionResult.data.user.l_name,
          birth_date: sessionResult.data.user.birth_date,
          salary: sessionResult.data.user.salary,
          e_role: sessionResult.data.user.e_role,
          e_photo: sessionResult.data.user.e_photo,
          e_address: sessionResult.data.user.e_address,
          e_email: sessionResult.data.user.e_email,
          e_phone: sessionResult.data.user.e_phone,
          e_city: sessionResult.data.user.e_city,
          e_country: sessionResult.data.user.e_country,
          e_zipcode: sessionResult.data.user.e_zipcode,
          e_username: sessionResult.data.user.e_username,
          e_gender: sessionResult.data.user.e_gender,
          e_active: sessionResult.data.user.e_active,
        });
      }
      // Navigation is handled by useEffect
    }
  };

  const handleResetPassword = async (
    username: string,
    newPassword: string,
  ): Promise<boolean> => {
    const result = await changePassword({ username, newPassword });
    return result.success;
  };

  const handleRegister = async (data: {
    f_name: string;
    l_name: string;
    e_email?: string;
    e_phone?: string;
    e_username: string;
    e_password: string;
    e_role?: string;
  }): Promise<boolean> => {
    const result = await register(data);
    return result.success;
  };

  const tabs = [
    { id: "login" as AuthTab, label: "Sign In", icon: LogIn },
    { id: "register" as AuthTab, label: "Register", icon: UserPlus },
    { id: "forgot" as AuthTab, label: "Reset Password", icon: KeyRound },
  ];

  // Use light logo for dark mode, dark logo for light mode
  const logoSrc = isDark
    ? "./Images/logo/alnadadr.png"
    : "./Images/logo/alnada.png";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)"
          : "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #C7D2FE 100%)",
      }}
    >
      {/* Decorative Elements */}
      <div
        className="fixed top-0 left-0 w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #6C79F7 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="fixed bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
          transform: "translate(50%, 50%)",
        }}
      />

      {/* Auth Card */}
      <div
        className="relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
        style={{
          background: theme.container.background,
          backdropFilter: theme.container.backdropFilter,
          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"}`,
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logoSrc}
            alt="Al Nada Scientific Office"
            className="h-20 object-contain"
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: theme.title.color }}
          >
            {activeTab === "login" && "Welcome Back"}
            {activeTab === "register" && "Create Account"}
            {activeTab === "forgot" && "Reset Password"}
          </h1>
          <p className="text-sm" style={{ color: theme.headers.color }}>
            {activeTab === "login" && "Sign in to access your dashboard"}
            {activeTab === "register" &&
              "Request a new account for your organization"}
            {activeTab === "forgot" && "Enter your details to reset password"}
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className="flex gap-1 p-1 rounded-xl mb-6"
          style={{
            background: isDark
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.03)",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background:
                  activeTab === tab.id
                    ? isDark
                      ? "rgba(108, 121, 247, 0.2)"
                      : "rgba(108, 121, 247, 0.1)"
                    : "transparent",
                color: activeTab === tab.id ? "#6C79F7" : theme.headers.color,
                boxShadow:
                  activeTab === tab.id
                    ? "0 2px 8px rgba(108, 121, 247, 0.15)"
                    : "none",
              }}
            >
              <tab.icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="transition-all duration-300">
          {activeTab === "login" && (
            <LoginForm
              theme={theme}
              isDark={isDark}
              isLoading={isLoginLoading}
              error={null}
              onLogin={handleLogin}
              onForgotPassword={() => setActiveTab("forgot")}
            />
          )}
          {activeTab === "register" && (
            <RegisterForm
              theme={theme}
              isDark={isDark}
              isLoading={isRegisterLoading}
              error={null}
              onRegister={handleRegister}
            />
          )}
          {activeTab === "forgot" && (
            <ForgotPasswordForm
              theme={theme}
              isDark={isDark}
              isLoading={isChangePasswordLoading}
              error={null}
              onResetPassword={handleResetPassword}
              onBackToLogin={() => setActiveTab("login")}
            />
          )}
        </div>

        {/* Footer */}
        <div
          className="mt-8 pt-6 border-t text-center"
          style={{
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.05)",
          }}
        >
          <p className="text-xs" style={{ color: theme.headers.color }}>
            Al Nada Scientific Office © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
