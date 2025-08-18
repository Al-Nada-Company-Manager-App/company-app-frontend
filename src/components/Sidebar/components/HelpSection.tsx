import { useSidebar } from "../../../hooks/useSidebar";
import * as Icons from "lucide-react";

interface HelpSectionProps {
  isDark: boolean;
}

const HelpSection = ({ isDark }: HelpSectionProps) => {
  const { theme } = useSidebar(isDark);
  return (
    <div className="absolute bottom-8 left-8 right-8">
      <div
        className="relative rounded-2xl p-6 overflow-hidden"
        style={{
          background: theme.helpSection.background,
        }}
      >
        {/* Decorative circles (optional) */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-white/20 opacity-20" />
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border border-white/20 opacity-20" />

        <div className="relative z-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
            style={{
              background: theme.helpSection.iconBackground,
              color: theme.helpSection.iconColor,
            }}
          >
            <Icons.HelpCircle size={24} />
          </div>

          <div
            className="text-sm font-bold mb-2"
            style={{ color: theme.helpSection.textColor }}
          >
            Need help?
          </div>

          <div
            className="text-xs mb-4"
            style={{ color: theme.helpSection.textColor }}
          >
            Please check our docs
          </div>

          <button
            className="px-2 py-1.5 rounded-xl text-xs font-bold text-white"
            style={{
              background: theme.helpSection.buttonBackground,
              backdropFilter: "blur(5px)",
            }}
          >
            DOCUMENTATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
