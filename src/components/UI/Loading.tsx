import React from "react";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingProps {
  size?: "small" | "default" | "large" | number;
  message?: string;
  containerStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  className?: string;
  isDark?: boolean;
}

const Loading = ({
  size = "default",
  message = "Loading...",
  containerStyle,
  textStyle,
  className = "",
  isDark = false,
}: LoadingProps) => {
  const getSpinSize = () => {
    if (typeof size === "number") {
      return {
        fontSize: size,
        color: isDark ? "#ffffff" : "#1890ff",
      };
    }
    return {
      color: isDark ? "#ffffff" : "#1890ff",
    };
  };

  const getSpinProps = () => {
    if (typeof size === "number") {
      return {
        indicator: <LoadingOutlined style={getSpinSize()} spin />,
      };
    }
    return {
      indicator: <LoadingOutlined style={getSpinSize()} spin />,
      size: size,
    };
  };

  return (
    <Flex
      align="center"
      justify="center"
      vertical
      gap="middle"
      className={`min-h-[200px] p-5 ${isDark ? "dark" : ""} ${className}`}
      style={containerStyle}
    >
      <Spin {...getSpinProps()} />
      {message && (
        <div
          className="text-sm text-gray-600 dark:text-gray-400"
          style={textStyle}
        >
          {message}
        </div>
      )}
    </Flex>
  );
};

export default Loading;
