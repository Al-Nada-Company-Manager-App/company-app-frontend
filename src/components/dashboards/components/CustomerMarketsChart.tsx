import { Bar } from "@ant-design/plots";
import type { CustomerMarket } from "@src/types/Dashboard/dashboard";


const CustomerMarketsChart = ({data, isDark} : {data : CustomerMarket[], isDark : boolean}) => {

  const formattedData = (data ?? []).map((d) => ({
    type: d.c_name ?? "Unknown",
    value: Number(d.marketing_count ?? 0),
  }));

  const config = {
    data: formattedData,
    xField: "type",
    yField: "value",
    seriesField: "type",
    legend: { position: "top-left" },
    xAxis: { label: { autoRotate: false, autoHide: true } },
    yAxis: { label: { style: { fontSize: 12 } } },
    theme: { type: isDark ? "dark" : "light" },
  };

  return (
    <div className="custom-chart-container">
      <h3>Customer Markets</h3>
      <Bar {...config} />
    </div>
  );
};

export default CustomerMarketsChart;
