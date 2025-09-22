// import { useSparePartsUsed } from "@src/queries/Dashboards/dashboardQueries";
// import { Bar } from "@ant-design/plots";
// import { useThemeContext } from "@src/contexts/theme";

// const SparePartsChart = () => {
//   const { data: sparePartsUsed = [] } = useSparePartsUsed();
//   const { isDark } = useThemeContext();

//   const config = {
//     data: sparePartsUsed,
//     xField: "spare_part_name",
//     yField: "total_used",
//     seriesField: "total_used",
//     color: isDark ? "#1890ff" : "#fa8c16",
//     barWidthRatio: 0.4,
//     minBarWidth: 10,
//     maxBarWidth: 20,
//     padding: [20, 30, 20, 30],
//     xAxis: { nice: true, label: { autoHide: true, autoRotate: false } },
//     yAxis: { label: { style: { fontSize: 12 } } },
//     theme: isDark ? "dark" : "light",
//   };

//   return (
//     <div className="custom-chart-container">
//       <h3>Spare Parts Used</h3>
//       <Bar {...config} />
//     </div>
//   );
// };

// export default SparePartsChart;
