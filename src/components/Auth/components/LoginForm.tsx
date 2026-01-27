import { useState } from "react";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import type { Theme } from "@src/types/theme";

interface LoginFormProps {
  theme: Theme;
  isDark: boolean;
  isLoading: boolean;
  error: string | null;
  onLogin: (username: string, password: string) => Promise<void>;
  onForgotPassword: () => void;
}

export const LoginForm = ({
  theme,
  isDark,
  isLoading,
  error,
  onLogin,
  onForgotPassword,
}: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    await onLogin(username, password);
  };

  const inputStyles = {
    background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
    border: `1px solid ${isDark ? "#56577A" : "#E2E8F0"}`,
    color: theme.title.color,
    borderRadius: "12px",
    padding: "14px 16px",
    width: "100%",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
  };

  const focusStyles = {
    borderColor: "#6C79F7",
    boxShadow: "0 0 0 3px rgba(108, 121, 247, 0.15)",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div
          className="p-4 rounded-xl text-sm"
          style={{
            background: isDark
              ? "rgba(239, 68, 68, 0.15)"
              : "rgba(239, 68, 68, 0.1)",
            color: isDark ? "#F87171" : "#DC2626",
            border: `1px solid ${isDark ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.2)"}`,
          }}
        >
          {error}
        </div>
      )}

      {/* Username Field */}
      <div className="space-y-2">
        <label
          style={{ color: theme.headers.color }}
          className="text-sm font-medium block"
        >
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          disabled={isLoading}
          style={inputStyles}
          onFocus={(e) => Object.assign(e.target.style, focusStyles)}
          onBlur={(e) => {
            e.target.style.borderColor = isDark ? "#56577A" : "#E2E8F0";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label
          style={{ color: theme.headers.color }}
          className="text-sm font-medium block"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={isLoading}
            style={{ ...inputStyles, paddingRight: "48px" }}
            onFocus={(e) => Object.assign(e.target.style, focusStyles)}
            onBlur={(e) => {
              e.target.style.borderColor = isDark ? "#56577A" : "#E2E8F0";
              e.target.style.boxShadow = "none";
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: theme.headers.color }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-2 accent-[#6C79F7]"
            style={{
              borderColor: isDark ? "#56577A" : "#E2E8F0",
            }}
          />
          <span style={{ color: theme.headers.color }} className="text-sm">
            Remember me
          </span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm font-medium transition-colors hover:underline"
          style={{ color: "#6C79F7" }}
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !username.trim() || !password.trim()}
        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #6C79F7 0%, #5A67D8 100%)",
          boxShadow: "0 4px 20px rgba(108, 121, 247, 0.35)",
        }}
        onMouseOver={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 25px rgba(108, 121, 247, 0.45)";
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 20px rgba(108, 121, 247, 0.35)";
        }}
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <LogIn size={20} />
            Sign In
          </>
        )}
      </button>
    </form>
  );
};
