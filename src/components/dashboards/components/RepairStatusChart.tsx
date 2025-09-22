
import { Pie } from "@ant-design/plots";
import type { RepairStatus } from "@src/types/Dashboard/dashboard";


const RepairStatusChart = ({data, isDark} : {data: RepairStatus[]; isDark: boolean}) => {

  const config = {
    data,
    angleField: "status_count",
    colorField: "p_status",
    radius: 0.8,
    label: {
      type: "inner",
      offset: "-30%",
      // content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    },
    interactions: [{ type: "element-active" }],
    theme: { type: isDark? "dark" : "light" },
  };

  return (
    <div className="custom-chart-container">
      <h3>Repair Status</h3>
      <Pie {...config} />
    </div>
  );
};

export default RepairStatusChart;
