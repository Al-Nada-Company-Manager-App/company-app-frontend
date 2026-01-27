import { useState } from "react";
import { UserPlus, Loader2, Info, Eye, EyeOff } from "lucide-react";
import type { Theme } from "@src/types/theme";

interface RegisterFormProps {
  theme: Theme;
  isDark: boolean;
  isLoading: boolean;
  error: string | null;
  onRegister: (data: {
    f_name: string;
    l_name: string;
    e_email?: string;
    e_phone?: string;
    e_username: string;
    e_password: string;
    e_role?: string;
  }) => Promise<boolean>;
}

export const RegisterForm = ({
  theme,
  isDark,
  isLoading,
  error,
  onRegister,
}: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    e_email: "",
    e_phone: "",
    e_username: "",
    e_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onRegister({
      ...formData,
      e_role: "Employee",
    });
    if (success) {
      setSubmitted(true);
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

  if (submitted) {
    return (
      <div className="text-center py-8 space-y-4">
        <div
          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          }}
        >
          <UserPlus size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-bold" style={{ color: theme.title.color }}>
          Account Created!
        </h3>
        <p
          className="text-sm max-w-xs mx-auto"
          style={{ color: theme.headers.color }}
        >
          Your account has been created successfully. Please wait for the
          manager to activate your account before you can log in.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              f_name: "",
              l_name: "",
              e_email: "",
              e_phone: "",
              e_username: "",
              e_password: "",
            });
          }}
          className="text-sm font-medium transition-colors hover:underline"
          style={{ color: "#6C79F7" }}
        >
          Create another account
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
            ? "rgba(96, 165, 250, 0.15)"
            : "rgba(59, 130, 246, 0.1)",
          color: isDark ? "#93C5FD" : "#2563EB",
          border: `1px solid ${isDark ? "rgba(96, 165, 250, 0.3)" : "rgba(59, 130, 246, 0.2)"}`,
        }}
      >
        <Info size={20} className="shrink-0 mt-0.5" />
        <span>
          New accounts require manager activation. You will be able to log in
          once your account is activated.
        </span>
      </div>

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

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            style={{ color: theme.headers.color }}
            className="text-sm font-medium block"
          >
            First Name *
          </label>
          <input
            type="text"
            name="f_name"
            value={formData.f_name}
            onChange={handleChange}
            placeholder="John"
            disabled={isLoading}
            required
            style={inputStyles}
            onFocus={(e) => Object.assign(e.target.style, focusStyles)}
            onBlur={(e) => {
              e.target.style.borderColor = isDark ? "#56577A" : "#E2E8F0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
        <div className="space-y-2">
          <label
            style={{ color: theme.headers.color }}
            className="text-sm font-medium block"
          >
            Last Name *
          </label>
          <input
            type="text"
            name="l_name"
            value={formData.l_name}
            onChange={handleChange}
            placeholder="Doe"
            disabled={isLoading}
            required
            style={inputStyles}
            onFocus={(e) => Object.assign(e.target.style, focusStyles)}
            onBlur={(e) => {
              e.target.style.borderColor = isDark ? "#56577A" : "#E2E8F0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          style={{ color: theme.headers.color }}
          className="text-sm font-medium block"
        >
          Email Address
        </label>
        <input
          type="email"
          name="e_email"
          value={formData.e_email}
          onChange={handleChange}
          placeholder="john.doe@company.com"
          disabled={isLoading}
          style={inputStyles}
          onFocus={(e) => Object.assign(e.target.style, focusStyles)}
          onBlur={(e) => {
            e.target.style.borderColor = isDark ? "#56577A" : "#E2E8F0";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label
          style={{ color: theme.headers.color }}
          className="text-sm font-medium block"
        >
          Phone Number
        </label>
        <input
          type="tel"
          name="e_phone"
          value={formData.e_phone}
          onChange={handleChange}
          placeholder="+20 123 456 7890"
          disabled={isLoading}
          style={inputStyles}
          onFocus={(e) => Object.assign(e.target.style, focusStyles)}
          onBlur={(e) => {
            e.target.style.borderColor = isDark ? "#56577A" : "#E2E8F0";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Username Field */}
      <div className="space-y-2">
        <label
          style={{ color: theme.headers.color }}
          className="text-sm font-medium block"
        >
          Username *
        </label>
        <input
          type="text"
          name="e_username"
          value={formData.e_username}
          onChange={handleChange}
          placeholder="johndoe"
          disabled={isLoading}
          required
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
          Password *
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="e_password"
            value={formData.e_password}
            onChange={handleChange}
            placeholder="Create a password"
            disabled={isLoading}
            required
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={
          isLoading ||
          !formData.f_name.trim() ||
          !formData.l_name.trim() ||
          !formData.e_username.trim() ||
          !formData.e_password.trim()
        }
        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          boxShadow: "0 4px 20px rgba(16, 185, 129, 0.35)",
        }}
        onMouseOver={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 25px rgba(16, 185, 129, 0.45)";
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 20px rgba(16, 185, 129, 0.35)";
        }}
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            <UserPlus size={20} />
            Create Account
          </>
        )}
      </button>
    </form>
  );
};
