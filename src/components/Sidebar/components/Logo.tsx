
interface LogoProps {
  isDark: boolean;
}

const Logo = ({ isDark }: LogoProps) => {

  return (
    <div className="flex justify-center pt-11">
      <img
        src={isDark ? "/Images/logo/alnadadr.png" : "/Images/logo/alnada.png"}
        alt="Company Manager"
        className="object-contain"
        style={{
          filter: isDark ? "none" : "none",
          height: "100px",
          width: "200px",
        }}
      />
    </div>
  );
};

export default Logo;
