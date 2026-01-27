import ReactECharts from "echarts-for-react";
import MotionChartWrapper from "./MotionChartWrapper";
import { useThemeContext } from "@src/contexts/theme";
import type { TopRepairedProduct } from "@src/types/Dashboard/dashboard";
import type { Theme } from "@src/types/theme";

const TopRepairedProductsChart = ({
  data,
}: {
  data: TopRepairedProduct[];
  isDark?: boolean;
}) => {
  const { theme, isDark } = useThemeContext();

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: isDark ? "#1f1f1f" : "#fff",
      borderColor: isDark ? "#333" : "#ccc",
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
    yAxis: {
      type: "category",
      data: data.map((item) => item.p_name),
      axisLabel: {
        color: isDark ? "#ccc" : "#666",
        width: 100,
        overflow: "truncate",
      },
      axisLine: {
        lineStyle: {
          color: isDark ? "#555" : "#ccc",
        },
      },
    },
    series: [
      {
        name: "Repairs",
        type: "bar",
        data: data.map((item) => item.repair_count),
        itemStyle: {
          color: "#cf1322",
          borderRadius: [0, 4, 4, 0],
        },
        label: {
          show: true,
          position: "right",
          color: isDark ? "#ccc" : "#666",
        },
      },
    ],
  };

  return (
    <MotionChartWrapper
      title="Top Repaired Products"
      theme={theme as unknown as Theme}
      delay={5}
    >
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        theme={isDark ? "dark" : "light"}
      />
    </MotionChartWrapper>
  );
};

export default TopRepairedProductsChart;
