import { useThemeContext } from "@src/contexts/useThemeContext";

const ManagerDashboards = () => {
  const { theme } = useThemeContext();

  return (
    <div className="absolute left-0 top-0 w-[1600px] h-[488.5px] flex items-center justify-center">
      <div className="text-2xl font-bold" style={{ color: theme.textColor }}>
        Dashboard - Welcome to Company Manager
      </div>
    </div>
  );
};

export default ManagerDashboards;
