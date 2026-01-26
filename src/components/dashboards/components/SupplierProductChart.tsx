import ReactECharts from "echarts-for-react";
import MotionChartWrapper from "./MotionChartWrapper";
import { useThemeContext } from "@src/contexts/theme";
import type { SupplierProduct } from "@src/types/Dashboard/dashboard";
import type { Theme } from "@src/types/theme";

const SupplierProductChart = ({
  data,
}: {
  data: SupplierProduct[];
  isDark?: boolean;
}) => {
  const { theme, isDark } = useThemeContext();

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: isDark ? "#333" : "#fff",
      borderColor: isDark ? "#555" : "#ccc",
      textStyle: {
        color: isDark ? "#eee" : "#333",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.suppliername || "Unknown"),
      axisLabel: {
        color: isDark ? "#ccc" : "#666",
        rotate: 30,
      },
      axisLine: {
        lineStyle: {
          color: isDark ? "#555" : "#ccc",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: isDark ? "#ccc" : "#666",
      },
      splitLine: {
        lineStyle: {
          color: isDark ? "#333" : "#eee",
        },
      },
    },
    series: [
      {
        data: data.map((item) => item.productcount),
        type: "bar",
        barWidth: "40%",
        itemStyle: {
          color: "#722ed1",
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
    backgroundColor: "transparent",
  };

  return (
    <MotionChartWrapper
      title="Supplier Products"
      theme={theme as unknown as Theme}
      delay={6}
    >
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        theme={isDark ? "dark" : "light"}
      />
    </MotionChartWrapper>
  );
};

export default SupplierProductChart;
