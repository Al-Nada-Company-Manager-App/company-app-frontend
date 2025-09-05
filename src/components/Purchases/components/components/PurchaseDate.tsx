import type { Theme } from "@src/types/theme";

interface PurchaseDateProps {
  date: string;
  theme: Theme;
}

const PurchaseDate = ({ date, theme }: PurchaseDateProps) => {
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

export default PurchaseDate;
