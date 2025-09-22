import { Line } from "@ant-design/plots";
import type { PurchaseOverview } from "@src/types/Dashboard/dashboard";

const PurchaseOverviewChart = ({data, isDark} : {data: PurchaseOverview[], isDark: boolean}) => {
  const config = {
    data,
    xField: "month",
    yField: "total_purchases",
    seriesField: "type",
    legend: { position: "top-left" },
    xAxis: {
      nice: true,
      label: { autoHide: true, autoRotate: false },
    },
    yAxis: {
      label: { style: { fontSize: 12 } },
    },
    theme: { type: isDark ? "dark" : "light" },
  };

  return (
    <div className="custom-chart-container">
      <h3>Purchase Overview</h3>
      <Line {...config} />
    </div>
  );
};

export default PurchaseOverviewChart;
