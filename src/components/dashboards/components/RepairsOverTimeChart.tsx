import ReactECharts from "echarts-for-react";
import MotionChartWrapper from "./MotionChartWrapper";
import { useThemeContext } from "@src/contexts/theme";
import type { RepairOverTime } from "@src/types/Dashboard/dashboard";
import type { Theme } from "@src/types/theme";

const RepairsOverTimeChart = ({
  data,
}: {
  data: RepairOverTime[];
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
      data: data.map((item) => item.rep_date),
      axisLabel: {
        color: isDark ? "#ccc" : "#666",
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
        data: data.map((item) => item.repairs_count),
        type: "line",
        smooth: true,
        itemStyle: {
          color: "#fa8c16",
        },
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(250, 140, 22, 0.5)",
              },
              {
                offset: 1,
                color: "rgba(250, 140, 22, 0.01)",
              },
            ],
          },
        },
      },
    ],
  };

  return (
    <MotionChartWrapper
      title="Repairs Over Time"
      theme={theme as unknown as Theme}
      delay={8}
    >
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        theme={isDark ? "dark" : "light"}
      />
    </MotionChartWrapper>
  );
};

export default RepairsOverTimeChart;
