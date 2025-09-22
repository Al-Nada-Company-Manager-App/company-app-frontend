import { Bar } from "@ant-design/plots";
import type { TopCustomer } from "@src/types/Dashboard/dashboard";

const TopCustomerChart = ({data, isDark} : {data: TopCustomer[], isDark : boolean}) => {

const formattedData = data.map((item) => ({
  type: item.c_name,
  value: item.total_paid,
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
      <h3>Top Customers</h3>
      <Bar {...config} />
    </div>
  );
};

export default TopCustomerChart;
