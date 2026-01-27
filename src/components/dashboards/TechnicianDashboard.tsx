import { Row, Col } from "antd";
import {
  ToolOutlined,
  FileOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useDashboard } from "@src/hooks/Dashboards/useDashboard";
import StatisticsCard from "@src/components/UI/StatisticsCard";
import ChartStyle from "@src/components/UI/ChartStyle";
import { useThemeContext } from "@src/contexts/theme";
import RepairsOverTimeChart from "./components/RepairsOverTimeChart";
import SparePartsLowStock from "./components/SparePartsLowStock";
import RepairStatusChart from "./components/RepairStatusChart";
import TopRepairedProductsChart from "./components/TopRepairedProductsChart";
import SparePartsUsedChart from "./components/SparePartsUsedChart";

const TechnicianDashboard = () => {
  const { isDark } = useThemeContext();
  const { theme, data, isLoading, error } = useDashboard(isDark);

  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        Error loading dashboard: {error.message}
      </div>
    );
  }

  return (
    <>
      <ChartStyle theme={theme} />
      <div
        style={{
          padding: "20px",
          minHeight: "100vh",
          background: theme.container?.background || "transparent",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <StatisticsCard
              title="Total Repairs"
              value={data.totalRepairs}
              color="#52c41a"
              icon={<ToolOutlined />}
              theme={theme}
            />
          </Col>
          <Col span={6}>
            <StatisticsCard
              title="Total Devices"
              value={data.totalDUM}
              color="#1677ff"
              icon={<FileOutlined />}
              theme={theme}
            />
          </Col>
          <Col span={6}>
            <StatisticsCard
              title="Total Spare Parts"
              value={data.totalSpareParts}
              color="#cf1322"
              icon={<ToolOutlined />}
              theme={theme}
            />
          </Col>
          <Col span={6}>
            <StatisticsCard
              title="Total Pending"
              value={data.totalPending}
              color="#FA7800"
              icon={<ClockCircleOutlined />}
              theme={theme}
            />
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <RepairsOverTimeChart data={data.repairsOverTime} isDark={isDark} />
          </Col>
          <Col span={12}>
            <RepairStatusChart data={data.repairStatus} isDark={isDark} />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <SparePartsLowStock data={data.lowStockAlerts} isDark={isDark} />
          </Col>
          <Col span={12}>
            <TopRepairedProductsChart
              data={data.topRepairedProducts}
              isDark={isDark}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <SparePartsUsedChart data={data.sparePartsUsed} isDark={isDark} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TechnicianDashboard;
