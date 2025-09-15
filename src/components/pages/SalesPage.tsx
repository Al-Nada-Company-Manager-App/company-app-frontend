import { useThemeContext } from "@src/contexts/theme";
import SalesComponent from "@src/components/Sales";

const SalesPage = () => {
  const { isDark } = useThemeContext();
  return <SalesComponent isDark={isDark} />;
};

export default SalesPage;
