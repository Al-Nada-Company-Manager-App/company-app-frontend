import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorDisplay } from "../UI";
import { useTheme } from "../../hooks/useTheme";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <ErrorDisplay
        status="404"
        title="404 - Page Not Found"
        subTitle="Sorry, the page you are looking for does not exist."
        showRetryButton={false}
        showHomeButton={true}
        homeButtonText="Go to Dashboard"
        onGoHome={handleGoHome}
        isDark={isDark}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

export default NotFoundPage;
