
import { Bar } from "@ant-design/plots";
import type { TopProduct } from "@src/types/Dashboard/dashboard";

const TopProductChart = ({data, isDark} : {data: TopProduct[], isDark : boolean}) => {

const formattedData = data.map((item) => ({
  type: item.p_name,
  value: item.total_sale,
}));

  const config = {
    data: formattedData,
    xField: "p_name",
    yField: "total_sale",
    seriesField: "p_name",
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
      <h3>Top Products</h3>
      <Bar {...config} />
    </div>
  );
};

export default TopProductChart;
