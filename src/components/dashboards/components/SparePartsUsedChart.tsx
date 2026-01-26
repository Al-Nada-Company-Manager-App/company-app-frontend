import ReactECharts from "echarts-for-react";
import MotionChartWrapper from "./MotionChartWrapper";
import { useThemeContext } from "@src/contexts/theme";
import type { SparePartUsed } from "@src/types/Dashboard/dashboard";
import type { Theme } from "@src/types/theme";

const SparePartsUsedChart = ({
  data,
}: {
  data: SparePartUsed[];
  isDark?: boolean;
}) => {
  const { theme, isDark } = useThemeContext();

  const option = {
    tooltip: {
      trigger: "item",
      backgroundColor: isDark ? "#1f1f1f" : "#fff",
      borderColor: isDark ? "#333" : "#ccc",
      textStyle: {
        color: isDark ? "#eee" : "#333",
      },
    },
    legend: {
      orient: "vertical",
      left: "left",
      type: "scroll",
      textStyle: {
        color: isDark ? "#fff" : "#666",
      },
    },
    series: [
      {
        name: "Spare Parts Used",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["60%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
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
            fontSize: 14,
            fontWeight: "bold",
            color: isDark ? "#fff" : "#333",
          },
        },
        labelLine: {
          show: false,
        },
        data: data.map((item) => ({
          value: item.total_used,
          name: item.spare_part_name,
        })),
      },
    ],
    backgroundColor: "transparent",
  };

  return (
    <MotionChartWrapper
      title="Spare Parts Usage"
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

export default SparePartsUsedChart;
