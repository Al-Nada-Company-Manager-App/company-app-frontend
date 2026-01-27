import { useState } from "react";
import {
  KeyRound,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import type { Theme } from "@src/types/theme";

interface ForgotPasswordFormProps {
  theme: Theme;
  isDark: boolean;
  isLoading: boolean;
  error: string | null;
  onResetPassword: (username: string, newPassword: string) => Promise<boolean>;
  onBackToLogin: () => void;
}

export const ForgotPasswordForm = ({
  theme,
  isDark,
  isLoading,
  error,
  onResetPassword,
  onBackToLogin,
}: ForgotPasswordFormProps) => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!username.trim()) {
      setValidationError("Please enter your username");
      return;
    }

    if (newPassword.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    const result = await onResetPassword(username, newPassword);
    if (result) {
      setSuccess(true);
    }
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

  const displayError = validationError || error;

  if (success) {
    return (
      <div className="text-center py-8 space-y-4">
        <div
          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          }}
        >
          <CheckCircle size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-bold" style={{ color: theme.title.color }}>
          Password Updated!
        </h3>
        <p
          className="text-sm max-w-xs mx-auto"
          style={{ color: theme.headers.color }}
        >
          Your password has been successfully changed. If you are not a manager,
          please wait for your account to be reactivated.
        </p>
        <button
          onClick={onBackToLogin}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
          style={{ color: "#6C79F7" }}
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Info Banner */}
      <div
        className="p-4 rounded-xl text-sm flex items-start gap-3"
        style={{
          background: isDark
            ? "rgba(251, 191, 36, 0.15)"
            : "rgba(245, 158, 11, 0.1)",
          color: isDark ? "#FCD34D" : "#D97706",
          border: `1px solid ${isDark ? "rgba(251, 191, 36, 0.3)" : "rgba(245, 158, 11, 0.2)"}`,
        }}
      >
        <AlertTriangle size={20} className="shrink-0 mt-0.5" />
        <span>
          After password reset, non-manager accounts will be deactivated and
          require manager approval to reactivate.
        </span>
      </div>

      {/* Error Message */}
      {displayError && (
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
          {displayError}
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

      {/* New Password Field */}
      <div className="space-y-2">
        <label
          style={{ color: theme.headers.color }}
          className="text-sm font-medium block"
        >
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
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
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: theme.headers.color }}
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label
          style={{ color: theme.headers.color }}
          className="text-sm font-medium block"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
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
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: theme.headers.color }}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={
          isLoading ||
          !username.trim() ||
          !newPassword.trim() ||
          !confirmPassword.trim()
        }
        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
          boxShadow: "0 4px 20px rgba(245, 158, 11, 0.35)",
        }}
        onMouseOver={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 25px rgba(245, 158, 11, 0.45)";
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 20px rgba(245, 158, 11, 0.35)";
        }}
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Resetting Password...
          </>
        ) : (
          <>
            <KeyRound size={20} />
            Reset Password
          </>
        )}
      </button>

      {/* Back to Login */}
      <div className="text-center">
        <button
          type="button"
          onClick={onBackToLogin}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
          style={{ color: "#6C79F7" }}
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </div>
    </form>
  );
};
