import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@src/contexts/theme/ThemeContext";
import { AuthProvider } from "@src/contexts/auth";
import { SearchProvider, useSearchContext } from "@src/contexts/search";
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
import AuthPage from "@src/components/pages/AuthPage";
import { AuthGuard, GuestGuard } from "@src/components/Auth/AuthGuard";
// import TechnicianDashboard from "./components/dashboards/technicianDashboard";
// import SecartaryDashboard from "./components/dashboards/SecartaryDashboard";
// import AccountantDashboard from "./components/dashboards/AccountantDashboard";
// import SalesManDashboard from "./components/dashboards/SalesManDashboard";

// Component to handle route changes and clear search
function RouteHandler() {
  const location = useLocation();
  const { setSearchQuery } = useSearchContext();

  useEffect(() => {
    // Clear search query whenever route changes
    setSearchQuery("");
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
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="stock" element={<StockPage />}>
          <Route path="products" element={<ProductPage />} />
          <Route path="repairs" element={<RepairPage />} />
        </Route>
        <Route path="sales" element={<SalesPage />} />
        <Route path="debts" element={<DebtsPage />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SearchProvider>
          <Router
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <RouteHandler />
          </Router>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
