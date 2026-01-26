import ReactECharts from "echarts-for-react";
import MotionChartWrapper from "./MotionChartWrapper";
import { useThemeContext } from "@src/contexts/theme";
import type { RepairStatus } from "@src/types/Dashboard/dashboard";
import type { Theme } from "@src/types/theme";

const RepairStatusChart = ({
  data,
}: {
  data: RepairStatus[];
  isDark?: boolean;
}) => {
  const { theme, isDark } = useThemeContext();

  const option = {
    tooltip: {
      trigger: "item",
      backgroundColor: isDark ? "#333" : "#fff",
      borderColor: isDark ? "#555" : "#ccc",
      textStyle: {
        color: isDark ? "#eee" : "#333",
      },
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        color: isDark ? "#ccc" : "#666",
      },
    },
    series: [
      {
        name: "Repair Status",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: isDark ? "#1f1f1f" : "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
            color: isDark ? "#fff" : "#333",
          },
        },
        labelLine: {
          show: false,
        },
        data: data.map((item) => ({
          value: item.status_count,
          name: item.p_status,
        })),
      },
    ],
  };

  return (
    <MotionChartWrapper
      title="Repair Status"
      theme={theme as unknown as Theme}
      delay={9}
    >
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        theme={isDark ? "dark" : "light"}
      />
    </MotionChartWrapper>
  );
};

export default RepairStatusChart;
