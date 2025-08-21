import { useThemeContext } from "@src/contexts/useThemeContext";
import EmployeesComponent from "@src/components/Employees";

const EmployeesPage = () => {
  const { isDark } = useThemeContext();

  return <EmployeesComponent isDark={isDark} />;
};

export default EmployeesPage;
