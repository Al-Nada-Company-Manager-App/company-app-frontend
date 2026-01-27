import { Row, Col } from "antd";
import {
  WarningOutlined,
  AppstoreOutlined,
  TeamOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import { useDashboard } from "@src/hooks/Dashboards/useDashboard";
import StatisticsCard from "@src/components/UI/StatisticsCard"; 
import ChartStyle from "@src/components/UI/ChartStyle"; 
import { useThemeContext } from "@src/contexts/theme";
import SalesOverviewChart from "./components/SalesOverviewChart";
import SupplierProductChart from "./components/SupplierProductChart";
import CustomerProductChart from "./components/CustomerProductChart";
import PurchaseOverviewChart from "./components/PurchaseOverviewChart";

const SecartaryDashboard = () => {
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
              title="Products Count"
              value={data.productsCount}
              color="#52c41a"
              icon={<AppstoreOutlined />}
              theme={theme}
            />
          </Col>
          <Col span={6}>
            <StatisticsCard
              title="Suppliers Count"
              value={data.suppliersCount}
              color="#1677ff"
              icon={<TeamOutlined />}
              theme={theme}
            />
          </Col>
          <Col span={6}>
            <StatisticsCard
              title="Total Debts"
              value={data.totalDebts.toFixed(2)}
              color="#cf1322"
              icon={<WarningOutlined />}
              theme={theme}
            />
          </Col>
          <Col span={6}>
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
            <SalesOverviewChart data={data.salesOverview} isDark={isDark} />
          </Col>
          <Col span={12}>
            <PurchaseOverviewChart data={data.purchasesOverview} isDark={isDark} />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <CustomerProductChart
              data={data.customerProducts}
              isDark={isDark}
            />
          </Col>
          <Col span={12}>
            <SupplierProductChart
              data={data.supplierProducts}
              isDark={isDark}
              />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SecartaryDashboard;
