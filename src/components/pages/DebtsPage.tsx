import DebtsPage from "../Debts";
import { useThemeContext } from "@src/contexts/theme";

const DebtsPageWrapper = () => {
  const { isDark } = useThemeContext();
  return <DebtsPage isDark={isDark} />;
};

export default DebtsPageWrapper;
