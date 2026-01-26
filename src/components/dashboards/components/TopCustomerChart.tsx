import ReactECharts from "echarts-for-react";
import MotionChartWrapper from "./MotionChartWrapper";
import { useThemeContext } from "@src/contexts/theme";
import type { TopCustomer } from "@src/types/Dashboard/dashboard";
import type { Theme } from "@src/types/theme";

const TopCustomerChart = ({
  data,
}: {
  data: TopCustomer[];
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
      data: data.map((item) => item.c_name),
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
        data: data.map((item) => item.total_paid),
        type: "bar",
        barWidth: "40%",
        itemStyle: {
          color: "#FAAD14",
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  return (
    <MotionChartWrapper
      title="Top Customers"
      theme={theme as unknown as Theme}
      delay={11}
    >
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        theme={isDark ? "dark" : "light"}
      />
    </MotionChartWrapper>
  );
};

export default TopCustomerChart;
