import { useThemeContext } from "../../contexts/useThemeContext";
import EmployeesComponent from "./index";

const EmployeesWrapper = () => {
  const { isDark } = useThemeContext();


  return <EmployeesComponent isDark={isDark} />;
};

export default EmployeesWrapper;
