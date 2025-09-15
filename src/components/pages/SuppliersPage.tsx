import { useThemeContext } from "@src/contexts/theme";
import SuppliersComponent from "@src/components/Suppliers";
const SuppliersPage = () => {
  const { isDark } = useThemeContext();

  return <SuppliersComponent isDark={isDark} />;
};

export default SuppliersPage;
