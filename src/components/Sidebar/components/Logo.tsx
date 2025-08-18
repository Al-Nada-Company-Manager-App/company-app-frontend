import { useSidebar } from "../../../hooks/useSidebar";

const Logo = () => {
  const { theme } = useSidebar(false);

  return (
    <div className="flex justify-center pt-11">
      <div
        className="text-sm font-normal tracking-[0.18em] text-center"
        style={{
          background: theme.logo.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Company Manager
      </div>
    </div>
  );
};

export default Logo;
