import { useThemeContext } from "@src/contexts/theme";
import Quotations from "@src/components/Quotations";

const QuotationsPage = () => {
  const { isDark } = useThemeContext();
  return <Quotations isDark={isDark} />;
};

export default QuotationsPage;
