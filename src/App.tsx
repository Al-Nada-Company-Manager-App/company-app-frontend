import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import ManagerDashboards from "./components/dashboards/managerDashboards";
import EmployeesWrapper from "./components/Employees/EmployeesWrapper";
import CustomersPage from "./components/pages/CustomersPage";
import StockPage from "./components/pages/StockPage";
import SalesPage from "./components/pages/SalesPage";
import PurchasesPage from "./components/pages/PurchasesPage";
import SuppliersPage from "./components/pages/SuppliersPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ManagerDashboards />} />
            <Route path="employees" element={<EmployeesWrapper />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="stock" element={<StockPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="purchases" element={<PurchasesPage />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
