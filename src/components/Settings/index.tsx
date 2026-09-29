import { useState, useEffect } from "react";
import { useAuthContext } from "@src/contexts/auth";
import { getBackendUrl, setBackendUrl } from "@src/platform/storage";
import { ChangePasswordModal } from "./components";
import { useThemeContext } from "@src/contexts/theme";
import { message, InputNumber } from "antd";
import {
  useGetVisitSettings,
  useUpdateVisitSettings,
  useRunAutoReset,
} from "@src/queries/Visits/visitQueries";

interface SettingsProps {
  isDark: boolean;
}

const Settings = ({ isDark }: SettingsProps) => {
  const { theme } = useThemeContext();
  const { logout } = useAuthContext();
  const [backendUrl, setLocalBackendUrl] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Visit settings state
  const { data: visitSettings } = useGetVisitSettings();
  const updateVisitSettings = useUpdateVisitSettings(isDark);
  const runAutoReset = useRunAutoReset(isDark);
  const [resetMonths, setResetMonths] = useState<number>(3);

  useEffect(() => {
    if (visitSettings?.visit_reset_months) {
      setResetMonths(parseInt(visitSettings.visit_reset_months));
    }
  }, [visitSettings]);

  useEffect(() => {
    const loadUrl = async () => {
      const url = await getBackendUrl();
      setLocalBackendUrl(url);
    };
    loadUrl();
  }, []);

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      let url = backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl;
      if (url && url !== "/api" && !url.startsWith("http://") && !url.startsWith("https://")) {
        url = `http://${url}`;
      }
      const res = await fetch(`${url}/health`);
      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          message.success("Connection successful!");
        } else {
          message.warning("Connection reached, but health check failed.");
        }
      } else {
        message.error("Failed to connect to the server.");
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to connect. Make sure the URL is correct.");
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = async () => {
    try {
      let url = backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl;
      if (url && url !== "/api" && !url.startsWith("http://") && !url.startsWith("https://")) {
        url = `http://${url}`;
      }
      await setBackendUrl(url);
      message.success("Settings saved successfully. Please log in again.");
      
      // Clear auth to enforce new backend URL
      logout();
      window.location.href = "/#/login"; // hard redirect to clear all states
    } catch (err) {
      console.error(err);
      message.error("Failed to save settings.");
    }
  };

  return (
    <div className="p-6">
      <div
        className="w-full rounded-2xl p-6"
        style={{
          background: theme.containerBg,
          minHeight: "400px",
        }}
      >
        <div className="mb-6">
          <h2 className="text-lg font-bold" style={{ color: theme.title?.color }}>
            Settings
          </h2>
        </div>

        <div className="max-w-2xl">
          {/* Server Settings */}
          <div
            className="rounded-xl p-6 mb-6 transition-all duration-200 hover:transform hover:-translate-y-1"
            style={{
              background: theme.modal?.background || theme.containerBg,
              border: `1px solid ${theme.row?.borderColor}`,
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: theme.title?.color }}
            >
              Server Connection
            </h2>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2 uppercase tracking-wider"
                style={{ color: theme.title?.color, opacity: 0.8 }}
              >
                Backend API URL
              </label>
              <p className="mb-2 text-xs" style={{ color: theme.title?.color, opacity: 0.6 }}>
                Enter the full URL of your backend server (e.g., http://192.168.1.100:4000). Leave empty to use the default http://192.168.1.100:4000.
              </p>
              <input
                type="text"
                value={backendUrl}
                onChange={(e) => setLocalBackendUrl(e.target.value)}
                placeholder="e.g. http://192.168.1.100:4000"
                className="w-full px-4 py-2 rounded-lg outline-none"
                style={{
                  background: isDark ? "rgba(255, 255, 255, 0.05)" : "#f8fafc",
                  border: `1px solid ${theme.row?.borderColor}`,
                  color: theme.title?.color,
                }}
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleTestConnection}
                disabled={isTesting || !backendUrl}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                style={{
                  background: isDark ? "rgba(130, 140, 232, 0.1)" : "rgba(108, 121, 239, 0.08)",
                  color: isDark ? "#828CE8" : "#6C79EF",
                  border: `1px solid ${isDark ? "#56577A" : "#E2E8F0"}`,
                  opacity: isTesting || !backendUrl ? 0.5 : 1,
                  cursor: isTesting || !backendUrl ? "not-allowed" : "pointer",
                }}
              >
                {isTesting ? "Testing..." : "Test Connection"}
              </button>
              <button
                onClick={handleSave}
                disabled={!backendUrl}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
                style={{
                  background: theme.button?.background,
                  color: theme.button?.color || "#fff",
                  opacity: !backendUrl ? 0.5 : 1,
                  cursor: !backendUrl ? "not-allowed" : "pointer",
                }}
              >
                Save & Restart
              </button>
            </div>
          </div>

          {/* Visit Auto-Reset Settings */}
          <div
            className="rounded-xl p-6 mb-6 transition-all duration-200 hover:transform hover:-translate-y-1"
            style={{
              background: theme.modal?.background || theme.containerBg,
              border: `1px solid ${theme.row?.borderColor}`,
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: theme.title?.color }}
            >
              📅 Visit Auto-Reset
            </h2>
            <p className="mb-4 text-sm" style={{ color: theme.title?.color, opacity: 0.8 }}>
              Customers will automatically be marked as <strong>unvisited</strong> if their last visit was more than the configured number of months ago. The reset runs automatically every day at midnight.
            </p>
            {visitSettings?.visit_reset_last_run && (
              <p className="mb-4 text-xs" style={{ color: theme.title?.color, opacity: 0.6 }}>
                Last auto-reset ran: {new Date(visitSettings.visit_reset_last_run).toLocaleString()}
              </p>
            )}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2 uppercase tracking-wider"
                style={{ color: theme.title?.color, opacity: 0.8 }}
              >
                Reset Period (Months)
              </label>
              <InputNumber
                min={1}
                max={24}
                value={resetMonths}
                onChange={(val) => setResetMonths(val || 3)}
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc",
                  border: `1px solid ${theme.row?.borderColor}`,
                  color: theme.title?.color,
                  width: 120,
                }}
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => updateVisitSettings.mutate(resetMonths)}
                disabled={updateVisitSettings.isPending}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
                style={{
                  background: theme.button?.background,
                  color: theme.button?.color || "#fff",
                  opacity: updateVisitSettings.isPending ? 0.5 : 1,
                  cursor: updateVisitSettings.isPending ? "not-allowed" : "pointer",
                }}
              >
                {updateVisitSettings.isPending ? "Saving..." : "Save Reset Period"}
              </button>
              <button
                onClick={() => runAutoReset.mutate()}
                disabled={runAutoReset.isPending}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                style={{
                  background: isDark ? "rgba(130, 140, 232, 0.1)" : "rgba(108, 121, 239, 0.08)",
                  color: isDark ? "#828CE8" : "#6C79EF",
                  border: `1px solid ${isDark ? "#56577A" : "#E2E8F0"}`,
                  opacity: runAutoReset.isPending ? 0.5 : 1,
                  cursor: runAutoReset.isPending ? "not-allowed" : "pointer",
                }}
              >
                {runAutoReset.isPending ? "Running..." : "🔄 Run Auto-Reset Now"}
              </button>
            </div>
          </div>

          {/* Account Settings */}
          <div
            className="rounded-xl p-6 transition-all duration-200 hover:transform hover:-translate-y-1"
            style={{
              background: theme.modal?.background || theme.containerBg,
              border: `1px solid ${theme.row?.borderColor}`,
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: theme.title?.color }}
            >
              Account Security
            </h2>
            <p className="mb-4 text-sm" style={{ color: theme.title?.color, opacity: 0.8 }}>
              Update your account password to ensure your account remains secure.
            </p>
            <button
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
              style={{
                background: isDark ? "rgba(130, 140, 232, 0.1)" : "rgba(108, 121, 239, 0.08)",
                color: isDark ? "#828CE8" : "#6C79EF",
                border: `1px solid ${isDark ? "#56577A" : "#E2E8F0"}`,
              }}
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        modalOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        // @ts-ignore - The component uses theme but some types might mismatch slightly due to refactoring
        theme={theme}
      />
    </div>
  );
};

export default Settings;
