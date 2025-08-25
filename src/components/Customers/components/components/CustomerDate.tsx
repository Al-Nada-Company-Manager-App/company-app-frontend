import type { Theme } from "@src/types/theme";

interface CustomerDateProps {
  date: string;
  theme: Theme;
}

const CustomerDate = ({ date, theme }: CustomerDateProps) => {
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

export default CustomerDate;
