import Profile from "@src/components/Profile";
import { useThemeContext } from "@src/contexts/theme";

const ProfilePage = () => {
  const { isDark } = useThemeContext();

  return <Profile isDark={isDark} />;
};

export default ProfilePage;
