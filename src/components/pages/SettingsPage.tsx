import Settings from "@src/components/Settings";
import { useThemeContext } from "@src/contexts/theme";

const SettingsPage = () => {
  const { isDark } = useThemeContext();

  return <Settings isDark={isDark} />;
};

export default SettingsPage;
