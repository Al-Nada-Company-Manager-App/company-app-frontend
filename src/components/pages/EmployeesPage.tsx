import { useThemeContext } from "../../contexts/useThemeContext";
import EmployeesComponent from "../Employees";

const EmployeesPage = () => {
  const { isDark } = useThemeContext();

  return <EmployeesComponent isDark={isDark} />;
};

export default EmployeesPage;
