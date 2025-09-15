import { useThemeContext } from "@src/contexts/theme";
import CustomersComponent from "@src/components/Customers";
const CustomersPage = () => {
  const { isDark } = useThemeContext();

  return <CustomersComponent isDark={isDark} />;
};

export default CustomersPage;
