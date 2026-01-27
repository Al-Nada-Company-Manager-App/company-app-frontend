import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Theme } from "@src/types/theme";

interface MotionChartWrapperProps {
  children: ReactNode;
  title?: string;
  theme?: Theme;
  delay?: number;
  className?: string;
}

const MotionChartWrapper = ({
  children,
  title,
  theme,
  delay = 0,
  className = "",
}: MotionChartWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`p-4 rounded-xl shadow-sm h-full ${className}`}
      style={{
        background: theme?.container?.background || "#fff",
        border: `1px solid ${theme?.row?.borderColor || "#f0f0f0"}`,
      }}
    >
      {title && (
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: theme?.title?.color || "#333" }}
        >
          {title}
        </h3>
      )}
      <div className="w-full h-[300px]">{children}</div>
    </motion.div>
  );
};

export default MotionChartWrapper;
