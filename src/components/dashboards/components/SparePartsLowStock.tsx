import { Column } from "@ant-design/plots";
import type { LowStockAlert } from "@src/types/Dashboard/dashboard";
// import { useThemeContext } from "@src/contexts/theme";

const SparePartsLowStock = ({data, isDark} : {data: LowStockAlert[], isDark : boolean}) => {
const formattedData = data.map((item) => ({
  type: item.p_name,
  value: item.p_quantity,
}));

const config = {
  data: formattedData,
  xField: "type",
  yField: "value",
  seriesField: "type",
  legend: { position: "top-left" },
  columnWidthRatio: 0.4,
  minColumnWidth: 10,
  maxColumnWidth: 20,
  xAxis: { nice: true, label: { autoHide: true, autoRotate: false } },
  yAxis: { label: { style: { fontSize: 12 } } },
  meta: {
    value: {
      alias: "Quantity",
      formatter: (v: number) => `${v}`,
    },
  },
  theme: { type: isDark ? "dark" : "light" },
};

  return (
    <div className="custom-chart-container">
      <h3>Low Stock Alerts</h3>
      <div style={{ width: "100%", height: "350px", margin: "0 auto" }}>
        <Column {...config} />
      </div>
    </div>
  );
};

export default SparePartsLowStock;
