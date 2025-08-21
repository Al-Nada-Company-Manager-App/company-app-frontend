import { message } from "antd";

// Configure message globally
message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
  getContainer: () => document.body,
});

export const useThemedMessage = (isDark: boolean = false) => {
  const showSuccessMessage = (content: string, icon: string = "✅") => {
    message.success({
      content: `${icon} ${content}`,
      style: {
        backgroundColor: isDark ? "#1f4a3c" : "#f6ffed",
        color: isDark ? "#95de64" : "#389e0d",
        border: isDark ? "1px solid #52c41a" : "1px solid #b7eb8f",
        borderRadius: "12px",
        padding: "12px 20px",
        fontSize: "14px",
        fontWeight: "500",
        boxShadow: isDark
          ? "0 8px 32px rgba(0, 0, 0, 0.3)"
          : "0 8px 32px rgba(0, 0, 0, 0.12)",
        backdropFilter: "blur(20px)",
        zIndex: 99999,
      },
      duration: 3,
    });
  };

  const showErrorMessage = (content: string, icon: string = "⚠️") => {
    message.error({
      content: `${icon} ${content}`,
      style: {
        backgroundColor: isDark ? "#4a1f1f" : "#fff2f0",
        color: isDark ? "#ff7875" : "#cf1322",
        border: isDark ? "1px solid #ff4d4f" : "1px solid #ffccc7",
        borderRadius: "12px",
        padding: "12px 20px",
        fontSize: "14px",
        fontWeight: "500",
        boxShadow: isDark
          ? "0 8px 32px rgba(0, 0, 0, 0.3)"
          : "0 8px 32px rgba(0, 0, 0, 0.12)",
        backdropFilter: "blur(20px)",
        zIndex: 99999,
      },
      duration: 4,
    });
  };

  const showWarningMessage = (content: string, icon: string = "⚠️") => {
    message.warning({
      content: `${icon} ${content}`,
      style: {
        backgroundColor: isDark ? "#4a3a1f" : "#fffbe6",
        color: isDark ? "#ffc53d" : "#d48806",
        border: isDark ? "1px solid #faad14" : "1px solid #ffe58f",
        borderRadius: "12px",
        padding: "12px 20px",
        fontSize: "14px",
        fontWeight: "500",
        boxShadow: isDark
          ? "0 8px 32px rgba(0, 0, 0, 0.3)"
          : "0 8px 32px rgba(0, 0, 0, 0.12)",
        backdropFilter: "blur(20px)",
        zIndex: 99999,
      },
      duration: 4,
    });
  };

  return {
    showSuccessMessage,
    showErrorMessage,
    showWarningMessage,
  };
};
