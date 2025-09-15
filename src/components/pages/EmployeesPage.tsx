import { useThemeContext } from "@src/contexts/theme";
import EmployeesComponent from "@src/components/Employees";

const EmployeesPage = () => {
  const { isDark } = useThemeContext();

  return <EmployeesComponent isDark={isDark} />;
};

export default EmployeesPage;
