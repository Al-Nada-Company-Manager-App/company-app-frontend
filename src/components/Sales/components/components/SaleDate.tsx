import type { Theme } from "@src/types/theme";

interface SaleDateProps {
  date: string;
  theme: Theme;
}

const SaleDate = ({ date, theme }: SaleDateProps) => {
  return (
    <div style={{ color: theme.employee.dateColor }}>
      {new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })}
    </div>
  );
};

export default SaleDate;
