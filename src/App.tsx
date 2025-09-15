import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@src/contexts/theme/ThemeContext";
import { SearchProvider, useSearchContext } from "@src/contexts/search";
import Layout from "@src/components/Layout";
import ManagerDashboards from "@src/components/dashboards/managerDashboards";
import EmployeesPage from "@src/components/pages/EmployeesPage";
import CustomersPage from "@src/components/pages/CustomersPage";
import StockPage from "@src/components/pages/StockPage";
import SalesPage from "@src/components/pages/SalesPage";
import PurchasesPage from "@src/components/pages/PurchasesPage";
import SuppliersPage from "@src/components/pages/SuppliersPage";
import NotFoundPage from "@src/components/NotFoundPage";
import ProductPage from "@src/components/pages/ProductPage";
import RepairPage from "@src/components/pages/RepairPage";

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
      <Route path="/" element={<Layout />}>
        <Route index element={<ManagerDashboards />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="stock" element={<StockPage />}>
          <Route path="products" element={<ProductPage />} />
          <Route path="repairs" element={<RepairPage />} />
        </Route>
        <Route path="sales" element={<SalesPage />} />
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
      <SearchProvider>
        <Router>
          <RouteHandler />
        </Router>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
