import { Row, Col } from "antd";
import {
  RiseOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useDashboard } from "@src/hooks/Dashboards/useDashboard";
import StatisticsCard from "@src/components/UI/StatisticsCard";
import ChartStyle from "@src/components/UI/ChartStyle";
import SalesOverviewChart from "./components/SalesOverviewChart";
import PurchaseOverviewChart from "./components/PurchaseOverviewChart";
import DebtsOverviewChart from "./components/DebtsOverviewChart";
import TopProductChart from "./components/TopProductChart";
import CustomerProductChart from "./components/CustomerProductChart";
import SupplierProductChart from "./components/SupplierProductChart";
import ProfitOverviewChart from "./components/ProfitOverviewChart";
import TopRepairedProductsChart from "./components/TopRepairedProductsChart";
import { useThemeContext } from "@src/contexts/theme";

const ManagerDashboard = () => {
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
          <Col xs={24} sm={12} md={6}>
            <StatisticsCard
              title="Total Stock"
              value={data.totalStock}
              color="#1677ff"
              icon={<RiseOutlined />}
              theme={theme}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatisticsCard
              title="Total Sales"
              value={data.totalSales.toFixed(2)}
              color="#52c41a"
              icon={<DollarOutlined />}
              theme={theme}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatisticsCard
              title="Total Purchase"
              value={data.totalPurchase.toFixed(2)}
              color="#FA7800"
              icon={<ShoppingCartOutlined />}
              theme={theme}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatisticsCard
              title="Total Debts"
              value={data.totalDebts.toFixed(2)}
              color="#cf1322"
              icon={<WarningOutlined />}
              theme={theme}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={24}>
            <ProfitOverviewChart
              salesData={data.salesOverview}
              purchasesData={data.purchasesOverview}
              isDark={isDark}
            />
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} md={12}>
            <SalesOverviewChart data={data.salesOverview} isDark={isDark} />
          </Col>
          <Col xs={24} md={12}>
            <PurchaseOverviewChart
              data={data.purchasesOverview}
              isDark={isDark}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} md={12}>
            <DebtsOverviewChart data={data.debtsOverview} isDark={isDark} />
          </Col>
          <Col xs={24} md={12}>
            <TopRepairedProductsChart
              data={data.topRepairedProducts}
              isDark={isDark}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} md={12}>
            <TopProductChart data={data.topProducts} isDark={isDark} />
          </Col>
          <Col xs={24} md={12}>
            <SupplierProductChart
              data={data.supplierProducts}
              isDark={isDark}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} md={12}>
            <CustomerProductChart
              data={data.customerProducts}
              isDark={isDark}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ManagerDashboard;
