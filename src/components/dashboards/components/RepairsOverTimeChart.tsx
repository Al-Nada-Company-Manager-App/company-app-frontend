
import { Line } from "@ant-design/plots";
import type { RepairOverTime } from "@src/types/Dashboard/dashboard";

const RepairsOverTimeChart = ({data, isDark} : {data: RepairOverTime[], isDark: boolean}) => {


  // const config = {
  //   data: repairsOverTime,
  //   xField: "rep_date",
  //   yField: "repairs_count",
  //   point: { size: 5, shape: "circle" },
  //   color: isDark ? "#fa8c16" : "#1890ff", // Adjust color based on theme
  //   theme: isDark ? "dark" : "light",
  // };

  const config = {
    data,
    xField: 'rep_date',
    yField: 'repairs_count',
    legend: { position: 'top-left' },
    xAxis: { nice: true, label: { autoHide: true, autoRotate: false } },
    yAxis: { label: { style: { fontSize: 12 } } },
    theme: {type: isDark? "dark" : "ligth"}
  };

  return (
    <div className="custom-chart-container">
      <h3>Repairs Over Time</h3>
      <Line {...config} />
    </div>
  );
};

export default RepairsOverTimeChart;
