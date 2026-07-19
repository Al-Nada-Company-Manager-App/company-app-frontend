import { useState, useEffect } from "react";
import { getBackendUrl, setBackendUrl } from "@src/platform/storage";
import { message } from "antd";
import { X, Server, Wifi } from "lucide-react";

interface ServerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
  isDark: boolean;
}

const ServerSettingsModal = ({
  isOpen,
  onClose,
  theme,
  isDark,
}: ServerSettingsModalProps) => {
  const [backendUrl, setLocalBackendUrl] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadUrl = async () => {
        const url = await getBackendUrl();
        setLocalBackendUrl(url);
      };
      loadUrl();
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
    setIsSaving(true);
    try {
      let url = backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl;
      if (url && url !== "/api" && !url.startsWith("http://") && !url.startsWith("https://")) {
        url = `http://${url}`;
      }
      await setBackendUrl(url);
      message.success("Server settings saved successfully!");
      // Reload window to apply changes across all API instances immediately
      window.location.reload();
    } catch (err) {
      console.error(err);
      message.error("Failed to save settings.");
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden transform transition-all"
        style={{
          background: theme.container?.background || theme.containerBg,
          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"}`,
        }}
      >
        <div
          className="px-6 py-4 flex justify-between items-center border-b"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}
        >
          <div className="flex items-center gap-3">
            <Server size={20} style={{ color: theme.title?.color }} />
            <h2 className="text-lg font-bold" style={{ color: theme.title?.color }}>
              Server Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="hover:opacity-70 transition-opacity"
            style={{ color: theme.title?.color }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2 uppercase tracking-wider"
              style={{ color: theme.title?.color, opacity: 0.8 }}
            >
              Backend API URL
            </label>
            <p className="mb-3 text-xs" style={{ color: theme.title?.color, opacity: 0.6 }}>
              Enter the full URL of your backend server (e.g., http://192.168.1.100:4001). Leave empty or enter /api to use the local dev proxy.
            </p>
            <input
              type="text"
              value={backendUrl}
              onChange={(e) => setLocalBackendUrl(e.target.value)}
              placeholder="e.g. http://192.168.1.100:4001"
              className="w-full px-4 py-3 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500"
              style={{
                background: isDark ? "rgba(255, 255, 255, 0.05)" : "#f8fafc",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                color: theme.title?.color,
              }}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleTestConnection}
              disabled={isTesting || !backendUrl}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200"
              style={{
                background: isDark ? "rgba(130, 140, 232, 0.1)" : "rgba(108, 121, 239, 0.08)",
                color: isDark ? "#828CE8" : "#6C79EF",
                border: `1px solid ${isDark ? "#56577A" : "#E2E8F0"}`,
                opacity: isTesting || !backendUrl ? 0.5 : 1,
                cursor: isTesting || !backendUrl ? "not-allowed" : "pointer",
              }}
            >
              <Wifi size={16} />
              {isTesting ? "Testing..." : "Test Connection"}
            </button>
            <button
              onClick={handleSave}
              disabled={!backendUrl || isSaving}
              className="flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:opacity-90"
              style={{
                background: theme.button?.background || "#6C79EF",
                color: theme.button?.color || "#fff",
                opacity: (!backendUrl || isSaving) ? 0.5 : 1,
                cursor: (!backendUrl || isSaving) ? "not-allowed" : "pointer",
              }}
            >
              {isSaving ? "Saving..." : "Save & Reload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerSettingsModal;
