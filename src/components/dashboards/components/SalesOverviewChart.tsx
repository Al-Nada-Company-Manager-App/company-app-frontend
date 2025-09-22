import { Line } from "@ant-design/plots";
import type { SalesOverview } from "@src/types/Dashboard/dashboard";  

const SalesOverviewChart = ({data, isDark}: {data: SalesOverview[], isDark : boolean}) => {

  const config = {
    data,
    xField: "month",
    yField: "total_sales",
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
      <h3>Sales Overview</h3>
      <Line {...config} />
    </div>
  );
};

export default SalesOverviewChart;
