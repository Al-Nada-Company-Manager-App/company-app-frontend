import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@src/contexts/theme/ThemeContext";
import { useThemeContext } from "@src/contexts/theme";
import { AuthProvider } from "@src/contexts/auth";
import { SearchProvider, useSearchContext } from "@src/contexts/search";
import { ConfigProvider, theme as antTheme } from "antd";
import Layout from "@src/components/Layout";
import ManagerDashboard from "@src/components/dashboards/ManagerDashboard";
import EmployeesPage from "@src/components/pages/EmployeesPage";
import CustomersPage from "@src/components/pages/CustomersPage";
import StockPage from "@src/components/pages/StockPage";
import SalesPage from "@src/components/pages/SalesPage";
import PurchasesPage from "@src/components/pages/PurchasesPage";
import SuppliersPage from "@src/components/pages/SuppliersPage";
import ProfilePage from "@src/components/pages/ProfilePage";
import NotFoundPage from "@src/components/NotFoundPage";
import ProductPage from "@src/components/pages/ProductPage";
import RepairPage from "@src/components/pages/RepairPage";
import DebtsPage from "@src/components/pages/DebtsPage";
import SparePartsPage from "@src/components/pages/SparePartsPage";
import AuthPage from "@src/components/pages/AuthPage";
import QuotationsPage from "@src/components/pages/QuotationsPage";
import TasksPage from "@src/components/pages/TasksPage";
import { AuthGuard, GuestGuard } from "@src/components/Auth/AuthGuard";
import { PermissionGuard } from "@src/components/Auth/PermissionGuard";
import { ROUTES } from "@src/config/routes";

// Component to handle route changes and clear search
function RouteHandler() {
  const location = useLocation();
  const { setSearchQuery } = useSearchContext();

  useEffect(() => {
    // Clear search query whenever route changes
    setSearchQuery("");

    // Scroll to top
    const scrollableElement = document.querySelector(".scrollable-content");
    if (scrollableElement) {
      scrollableElement.scrollTo(0, 0);
    }
  }, [location.pathname, setSearchQuery]);

  return (
    <Routes>
      {/* Auth route - accessible only when NOT logged in */}
      <Route
        path="/login"
        element={
          <GuestGuard>
            <AuthPage />
          </GuestGuard>
        }
      />

      {/* Main app routes - require authentication */}
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route index element={<ManagerDashboard />} />
        <Route
          path="employees"
          element={
            <PermissionGuard requiredPermission={ROUTES.employees.permission} fallback={<NotFoundPage />}>
              <EmployeesPage />
            </PermissionGuard>
          }
        />
        <Route
          path="customers"
          element={
            <PermissionGuard requiredPermission={ROUTES.customers.permission} fallback={<NotFoundPage />}>
              <CustomersPage />
            </PermissionGuard>
          }
        />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="stock" element={<StockPage />}>
          <Route index element={<Navigate to="products" replace />} />
          <Route
            path="products"
            element={
              <PermissionGuard requiredPermission={ROUTES.products.permission} fallback={<NotFoundPage />}>
                <ProductPage />
              </PermissionGuard>
            }
          />
          <Route
            path="spare-parts"
            element={
              <PermissionGuard requiredPermission={ROUTES["spare-parts"].permission} fallback={<NotFoundPage />}>
                <SparePartsPage />
              </PermissionGuard>
            }
          />
        </Route>
        <Route
          path="repairs"
          element={
            <PermissionGuard requiredPermission={ROUTES.repairs.permission} fallback={<NotFoundPage />}>
              <RepairPage />
            </PermissionGuard>
          }
        />
        <Route
          path="sales"
          element={
            <PermissionGuard requiredPermission={ROUTES.sales.permission} fallback={<NotFoundPage />}>
              <SalesPage />
            </PermissionGuard>
          }
        />
        <Route
          path="debts"
          element={
            <PermissionGuard requiredPermission={ROUTES.debts.permission} fallback={<NotFoundPage />}>
              <DebtsPage />
            </PermissionGuard>
          }
        />
        <Route
          path="purchases"
          element={
            <PermissionGuard requiredPermission={ROUTES.purchases.permission} fallback={<NotFoundPage />}>
              <PurchasesPage />
            </PermissionGuard>
          }
        />
        <Route
          path="suppliers"
          element={
            <PermissionGuard requiredPermission={ROUTES.suppliers.permission} fallback={<NotFoundPage />}>
              <SuppliersPage />
            </PermissionGuard>
          }
        />
        <Route
          path="quotations"
          element={
            <PermissionGuard requiredPermission={ROUTES.quotations.permission} fallback={<NotFoundPage />}>
              <QuotationsPage />
            </PermissionGuard>
          }
        />
        <Route
          path="tasks"
          element={
            <PermissionGuard requiredPermission={ROUTES.tasks.permission} fallback={<NotFoundPage />}>
              <TasksPage />
            </PermissionGuard>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function AppConfigProvider({ children }: { children: React.ReactNode }) {
  const { isDark, theme } = useThemeContext();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: theme.button?.background,
          colorBgBase: theme.containerBg,
          colorBgContainer: theme.modal?.background || theme.containerBg,
          colorText: theme.title?.color,
          colorBorder: theme.row?.borderColor,
          borderRadius: 8,
        },
        components: {
          Modal: {
            contentBg: theme.modal?.background,
            headerBg: 'transparent',
            titleColor: theme.modal?.color,
          },
          Table: {
            headerBg: 'transparent',
            headerColor: theme.headers?.color,
            rowHoverBg: theme.row?.hoverBackground,
            borderColor: theme.row?.borderColor,
          },
          Button: {
            colorPrimary: theme.button?.background,
            colorPrimaryHover: theme.button?.hoverBackground,
            colorPrimaryActive: theme.button?.hoverBackground,
          },
          Input: {
            colorBgContainer: theme.modal?.background || '#fff',
            colorText: theme.modal?.color || '#222',
            colorBorder: theme.row?.borderColor || '#d9d9d9',
          },
          Select: {
            colorBgContainer: theme.modal?.background || '#fff',
            colorText: theme.modal?.color || '#222',
            colorBorder: theme.row?.borderColor || '#d9d9d9',
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SearchProvider>
          <AppConfigProvider>
            <Router
              future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
            >
              <RouteHandler />
            </Router>
          </AppConfigProvider>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
