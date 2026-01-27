import ReactECharts from "echarts-for-react";
import MotionChartWrapper from "./MotionChartWrapper";
import { useThemeContext } from "@src/contexts/theme";
import type { DebtOverview } from "@src/types/Dashboard/dashboard";

const DebtsOverviewChart = ({
  data,
}: {
  data: DebtOverview[];
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
      data: data.map((item) => item.d_type),
      axisLabel: {
        color: isDark ? "#ccc" : "#666",
        interval: 0,
        rotate: 30, // Rotate labels if long
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
        data: data.map((item) => item.total_debt),
        type: "bar",
        barWidth: "40%",
        itemStyle: {
          color: "#cf1322",
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  return (
    <MotionChartWrapper title="Debts Overview" theme={theme} delay={3}>
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        theme={isDark ? "dark" : "light"}
      />
    </MotionChartWrapper>
  );
};

export default DebtsOverviewChart;
