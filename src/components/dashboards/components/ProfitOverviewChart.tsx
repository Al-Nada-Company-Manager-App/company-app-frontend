import ReactECharts from "echarts-for-react";
import MotionChartWrapper from "./MotionChartWrapper";
import { useThemeContext } from "@src/contexts/theme";
import type {
  SalesOverview,
  PurchaseOverview,
} from "@src/types/Dashboard/dashboard";
import type { Theme } from "@src/types/theme";

interface ProfitOverviewProps {
  salesData: SalesOverview[];
  purchasesData: PurchaseOverview[];
  isDark?: boolean;
}

const ProfitOverviewChart = ({
  salesData,
  purchasesData,
}: ProfitOverviewProps) => {
  const { theme, isDark } = useThemeContext();

  // Collect all unique dates (months) from both datasets
  const allDates = Array.from(
    new Set([
      ...salesData.map((d) => d.month),
      ...purchasesData.map((d) => d.month),
    ]),
  ).sort();

  // Calculate cumulative profit
  let runningTotalSales = 0;
  let runningTotalPurchases = 0;

  // Merge data based on all unique dates
  const mergedData = allDates.map((date) => {
    const sale = salesData.find((s) => s.month === date) || { total_sales: 0 };
    const purchase = purchasesData.find((p) => p.month === date) || {
      total_purchases: 0,
    };

    const monthlySales = Number(sale.total_sales);
    const monthlyPurchases = Number(purchase.total_purchases);

    runningTotalSales += monthlySales;
    runningTotalPurchases += monthlyPurchases;

    return {
      month: date,
      sales: monthlySales,
      purchases: monthlyPurchases * -1,
      profit: runningTotalSales - runningTotalPurchases,
    };
  });

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: isDark ? "#1f1f1f" : "#fff",
      borderColor: isDark ? "#333" : "#ccc",
      textStyle: {
        color: isDark ? "#eee" : "#333",
      },
    },
    legend: {
      data: ["Sales", "Purchases", "Profit"],
      textStyle: {
        color: isDark ? "#fff" : "#333",
      },
      bottom: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: mergedData.map((item) => item.month),
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
        name: "Sales",
        type: "bar",
        data: mergedData.map((item) => item.sales),
        itemStyle: { color: "#52c41a" },
      },
      {
        name: "Purchases",
        type: "bar",
        data: mergedData.map((item) => item.purchases),
        itemStyle: { color: "#FA7800" },
      },
      {
        name: "Profit",
        type: "line",
        yAxisIndex: 0,
        data: mergedData.map((item) => item.profit),
        itemStyle: { color: "#1677ff" },
        smooth: true,
        lineStyle: { width: 3 },
      },
    ],
  };

  return (
    <MotionChartWrapper
      title="Profit Overview"
      theme={theme as unknown as Theme}
      delay={4}
    >
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        theme={isDark ? "dark" : "light"}
      />
    </MotionChartWrapper>
  );
};

export default ProfitOverviewChart;
