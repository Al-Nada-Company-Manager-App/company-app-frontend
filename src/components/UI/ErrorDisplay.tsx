import React from "react";
import { Button, Result } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

type ErrorStatus = "403" | "404" | "500" | "error" | "warning";

interface ErrorDisplayProps {
  status?: ErrorStatus;
  title?: string;
  subTitle?: string;
  message?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  showRetryButton?: boolean;
  showHomeButton?: boolean;
  retryButtonText?: string;
  homeButtonText?: string;
  extraActions?: React.ReactNode[];
  details?: string[];
  className?: string;
  style?: React.CSSProperties;
  isDark?: boolean;
}

const ErrorDisplay = ({
  status = "error",
  title,
  subTitle,
  message,
  onRetry,
  onGoHome,
  showRetryButton = true,
  showHomeButton = false,
  retryButtonText = "Try Again",
  homeButtonText = "Back Home",
  extraActions,
  details,
  className = "",
  style,
  isDark = false,
}: ErrorDisplayProps) => {
  const getDefaultTitle = () => {
    switch (status) {
      case "403":
        return "403";
      case "404":
        return "404";
      case "500":
        return "500";
      case "warning":
        return "Warning";
      default:
        return "Error";
    }
  };

  const getDefaultSubTitle = () => {
    switch (status) {
      case "403":
        return "Sorry, you are not authorized to access this page.";
      case "404":
        return "Sorry, the page you visited does not exist.";
      case "500":
        return "Sorry, something went wrong.";
      case "warning":
        return "There are some problems with your operation.";
      default:
        return message || "An unexpected error occurred.";
    }
  };

  const getActions = () => {
    const actions: React.ReactNode[] = [];

    if (showRetryButton && onRetry) {
      actions.push(
        <Button type="primary" key="retry" onClick={onRetry}>
          {retryButtonText}
        </Button>
      );
    }

    if (showHomeButton && onGoHome) {
      actions.push(
        <Button key="home" onClick={onGoHome}>
          {homeButtonText}
        </Button>
      );
    }

    if (extraActions) {
      actions.push(...extraActions);
    }

    return actions.length > 0 ? actions : undefined;
  };

  const renderDetails = () => {
    if (!details || details.length === 0) return null;

    return (
      <div className="error-details">
        {details.map((detail, index) => (
          <div
            key={index}
            className={`mb-2 ${
              isDark ? "text-gray-400" : "text-gray-700 dark:text-gray-400"
            }`}
          >
            <CloseCircleOutlined className="text-red-500 mr-2" />
            {detail}
          </div>
        ))}
      </div>
    );
  };

  const getContainerStyle = (): React.CSSProperties => ({
    backgroundColor: "transparent",
    ...style,
  });

  return (
    <div
      className={`error-display text-gray-900 dark:text-white ${className}`}
      style={getContainerStyle()}
    >
      <Result
        status={status}
        title={
          <span className={`${isDark ? "text-white" : "text-gray-900"}`}>
            {title || getDefaultTitle()}
          </span>
        }
        subTitle={
          <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {subTitle || getDefaultSubTitle()}
          </span>
        }
        extra={getActions()}
      >
        {renderDetails()}
      </Result>
    </div>
  );
};

export default ErrorDisplay;
