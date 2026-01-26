import { useThemeContext } from "@src/contexts/theme";
import Auth from "@src/components/Auth";

const AuthPage = () => {
  const { isDark } = useThemeContext();

  return <Auth isDark={isDark} />;
};

export default AuthPage;
