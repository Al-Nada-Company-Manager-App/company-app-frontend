import { Bar } from "@ant-design/plots";
import type { DebtOverview } from "@src/types/Dashboard/dashboard";

const DebtsOverviewChart = ({data, isDark} : {data: DebtOverview[], isDark: boolean}) => {
  const formattedData = data.map((item) => ({
    type: item.d_type,
    value: item.total_debt,
  }));

  const config = {
    data: formattedData,
    xField: "type",
    yField: "value",
    seriesField: "type",
    legend: { position: "top-left" },
    barWidthRatio: 0.4,
    minBarWidth: 10,
    maxBarWidth: 20,
    xAxis: { nice: true, label: { autoHide: true, autoRotate: false } },
    yAxis: { label: { style: { fontSize: 12 } } },
    theme: { type: isDark ? "dark" : "light" },
  };

  return (
    <div className="custom-chart-container">
      <h3>Debts Overview</h3>
      <Bar {...config} />
    </div>
  );
};

export default DebtsOverviewChart;
