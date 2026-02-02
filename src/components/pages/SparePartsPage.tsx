import SpareParts from "@src/components/SpareParts";
import { useThemeContext } from "@src/contexts/theme";

const SparePartsPage = () => {
  const { isDark } = useThemeContext();

  return <SpareParts isDark={isDark} />;
};

export default SparePartsPage;
