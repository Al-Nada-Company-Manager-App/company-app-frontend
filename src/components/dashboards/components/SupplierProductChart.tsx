
import { Bar } from "@ant-design/plots";
import type { SupplierProduct } from "@src/types/Dashboard/dashboard";

const SupplierProductChart = ({data, isDark} : {data: SupplierProduct[], isDark : boolean}) => {
const formattedData = data.map((item) => ({
  type: item.suppliername,
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
    theme: { type: isDark ? "dark" : "light" },
  };

  return (
    <div className="custom-chart-container">
      <h3>Supplier Products</h3>
      <Bar {...config} />
    </div>
  );
};

export default SupplierProductChart;
