import { useThemeContext } from "@src/contexts/theme";
import PurchasesComponent from "@src/components/Purchases";
const PurchasesPage = () => {
  const { isDark } = useThemeContext();

  return <PurchasesComponent isDark={isDark} />;
};

export default PurchasesPage;
