import type { CustomerProduct } from "@src/types/Dashboard/dashboard";
import { Bar } from "@ant-design/plots";

const CustomerProductChart = ({data, isDark} : {data: CustomerProduct[], isDark:boolean}) => {

  const formattedData = data.map((item) => ({
    type: item.customername,
    value: item.productcount,
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
    theme: { type: isDark ? "dark" : "light"},
  };

  return (
    <div className="custom-chart-container">
      <h3>Customer Products</h3>
      <Bar {...config} />
    </div>
  );
};

export default CustomerProductChart;