import type { StockSummary } from "@src/types/Dashboard/dashboard";
import { Pie } from "@ant-design/plots";

const StockCategoryChart = ({ data, isDark }: { data: StockSummary [], isDark : boolean}) => {


  const formattedData = data.map((item) => ({
    type: item.p_category,
    value: item.total_quantity,
  }));

  const config = {
    data: formattedData,
    angleField: "value",
    colorField: "type",
    legend: { position: "right" },
    label: { type: "outer" },
    theme: { type: isDark ? "dark" : "light" },
  };

  return (
    <div className="custom-chart-container">
      <h3>Stock Category Distribution</h3>
      <Pie {...config} />
    </div>
  );
};

export default StockCategoryChart;
