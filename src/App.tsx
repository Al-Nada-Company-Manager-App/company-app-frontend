import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@src/contexts/ThemeContext";
// import Layout from "@src/components/Layout";
// import ManagerDashboards from "@src/components/dashboards/managerDashboards";
// import EmployeesPage from "@src/components/pages/EmployeesPage";
// import CustomersPage from "@src/components/pages/CustomersPage";
// import StockPage from "@src/components/pages/StockPage";
// import SalesPage from "@src/components/pages/SalesPage";
// import PurchasesPage from "@src/components/pages/PurchasesPage";
// import SuppliersPage from "@src/components/pages/SuppliersPage";
// import NotFoundPage from "@src/components/NotFoundPage";
// import Login from "@src/components/Sign/Login";
// import ForgotPassword from "./components/Sign/ForgotPassword";
// import SignUp from "./components/Sign/SignUp";
import Login from "./components/Sign/Login";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Layout />}>
            <Route index element={<ManagerDashboards />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="stock" element={<StockPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="purchases" element={<PurchasesPage />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route> */}
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
