import  { useState } from "react";
import { Button, Space, Card, Divider, Switch } from "antd";
import { Loading, ErrorDisplay } from "./index";

const UIShowcase = () => {
  const [currentDemo, setCurrentDemo] = useState<string>("loading");
  const [isDark, setIsDark] = useState<boolean>(false);

  const demoButtons = [
    { key: "loading", label: "Loading States" },
    { key: "error", label: "Error States" },
    { key: "status", label: "Status Codes" },
  ];

  const renderLoadingDemo = () => (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Small Loading">
        <Loading size="small" message="Loading small..." isDark={isDark} />
      </Card>

      <Card title="Default Loading">
        <Loading message="Loading default..." isDark={isDark} />
      </Card>

      <Card title="Large Loading">
        <Loading size="large" message="Loading large..." isDark={isDark} />
      </Card>

      <Card title="Custom Size Loading">
        <Loading size={48} message="Custom size loading..." isDark={isDark} />
      </Card>

      <Card title="No Message">
        <Loading isDark={isDark} />
      </Card>
    </Space>
  );

  const renderErrorDemo = () => (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Basic Error">
        <ErrorDisplay
          message="Something went wrong"
          onRetry={() => alert("Retry clicked")}
          isDark={isDark}
        />
      </Card>

      <Card title="Error with Details">
        <ErrorDisplay
          title="Validation Failed"
          subTitle="Please fix the following issues:"
          details={[
            "Email field is required",
            "Password must be at least 8 characters",
            "Phone number format is invalid",
          ]}
          onRetry={() => alert("Retry clicked")}
          isDark={isDark}
        />
      </Card>

      <Card title="Warning">
        <ErrorDisplay
          status="warning"
          onRetry={() => alert("Try Again clicked")}
          retryButtonText="Continue"
          isDark={isDark}
        />
      </Card>
    </Space>
  );

  const renderStatusDemo = () => (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="403 Forbidden">
        <ErrorDisplay
          status="403"
          onGoHome={() => alert("Go Home clicked")}
          showHomeButton={true}
          showRetryButton={false}
          isDark={isDark}
        />
      </Card>

      <Card title="404 Not Found">
        <ErrorDisplay
          status="404"
          onGoHome={() => alert("Go Home clicked")}
          showHomeButton={true}
          showRetryButton={false}
          isDark={isDark}
        />
      </Card>

      <Card title="500 Server Error">
        <ErrorDisplay
          status="500"
          onRetry={() => alert("Retry clicked")}
          onGoHome={() => alert("Go Home clicked")}
          showRetryButton={true}
          showHomeButton={true}
          isDark={isDark}
        />
      </Card>
    </Space>
  );

  const renderCurrentDemo = () => {
    switch (currentDemo) {
      case "loading":
        return renderLoadingDemo();
      case "error":
        return renderErrorDemo();
      case "status":
        return renderStatusDemo();
      default:
        return renderLoadingDemo();
    }
  };

  return (
    <div
      className={`p-6 max-w-5xl mx-auto min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1>UI Components Showcase</h1>
      <p>Demonstration of reusable Loading and ErrorDisplay components</p>

      <Divider />

      <Space
        style={{
          marginBottom: "24px",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Space>
          {demoButtons.map((button) => (
            <Button
              key={button.key}
              type={currentDemo === button.key ? "primary" : "default"}
              onClick={() => setCurrentDemo(button.key)}
            >
              {button.label}
            </Button>
          ))}
        </Space>

        <Space align="center">
          <span>Dark Mode:</span>
          <Switch
            checked={isDark}
            onChange={setIsDark}
            checkedChildren="🌙"
            unCheckedChildren="☀️"
          />
        </Space>
      </Space>

      {renderCurrentDemo()}
    </div>
  );
};

export default UIShowcase;
