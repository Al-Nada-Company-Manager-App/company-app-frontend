import { useThemeContext } from "../../contexts/useThemeContext";

const SalesPage = () => {
  const { theme } = useThemeContext();

  return (
    <div className="absolute left-0 top-0 w-[1600px] h-[488.5px] flex items-center justify-center">
      <div className="text-2xl font-bold" style={{ color: theme.textColor }}>
        Sales Page - Coming Soon
      </div>
    </div>
  );
};

export default SalesPage;
