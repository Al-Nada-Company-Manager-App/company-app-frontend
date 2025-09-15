import Repair from "@src/components/Repairs";
import { useThemeContext } from "@src/contexts/theme";

const RepairPage = () => {
  const { isDark } = useThemeContext();

  return <Repair isDark={isDark} />;
};

export default RepairPage;
