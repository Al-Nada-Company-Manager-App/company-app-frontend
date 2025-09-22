import { Row, Col } from "antd";
import {
  PoundOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useDashboard } from "@src/hooks/Dashboards/useDashboard";
import StatisticsCard from "@src/components/UI/StatisticsCard"; 
import ChartStyle from "@src/components/UI/ChartStyle"; 
import SalesOverviewChart from "./components/SalesOverviewChart";
import CustomerMarketsChart from "./components/CustomerMarketsChart";
import CustomerSalesChart from "./components/CustomerSalesChart";
import { useThemeContext } from "@src/contexts/theme";
import TopCustomerChart from "./components/TopCustomerChart";

const SalesManDashboard = () => {
  const { isDark } = useThemeContext();
  const { theme, data, isLoading, error } = useDashboard(isDark);
  const totalMarketingCount = data.customerMarkets.reduce(
    (sum, m) => sum + (Number(m.marketing_count ?? 0) || 0),
    0
  );

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
          <Col span={8}>
            <StatisticsCard
              title="Total Sales"
              value={data.totalSales.toFixed(2)}
              color="#52c41a"
              icon={<DollarOutlined />}
              theme={theme}
            />
          </Col>
          <Col span={8}>
            <StatisticsCard
              title="Marketing Count"
              value={totalMarketingCount}
              color="#1677ff"
              icon={<PoundOutlined />}
              theme={theme}
            />
          </Col>
          <Col span={8}>
            <StatisticsCard
              title="Customers Count"
              value={data.customersCount}
              color="#FA7800"
              icon={<UsergroupAddOutlined />}
              theme={theme}
            />
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <CustomerSalesChart data={data.customerSales} isDark={isDark} />
          </Col>
          <Col span={12}>
            <CustomerMarketsChart data={data.customerMarkets} isDark={isDark} />
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <TopCustomerChart data={data.topCustomers} isDark={isDark} />
          </Col>
          <Col span={12}>
            <SalesOverviewChart data={data.salesOverview} isDark={isDark} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SalesManDashboard;
