import type { Theme } from "@src/types/theme";

interface SupplierDateProps {
  date: string;
  theme: Theme;
}

  const SupplierDate = ({ date, theme }: SupplierDateProps) => {
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

  export default SupplierDate;
