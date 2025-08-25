import type { Supplier } from "@src/types/Suppliers/supplier";
import type { Theme } from "@src/types/theme";
import SupplierAvatar from "./SupplierAvatar";

interface SupplierInfoProps {
  supplier: Supplier;
  theme: Theme;
}
const SupplierInfo = ({ supplier, theme }: SupplierInfoProps) => {
  return (
    <div className="flex items-center">
      <div className="mr-4">
        <SupplierAvatar supplier={supplier} theme={theme} />
      </div>
      <div>
        <div style={{ color: theme.employee.nameColor }}>{supplier.s_name}</div>
        <div
          style={{
            color: theme.employee.emailColor,
            fontSize: "14px",
          }}
        >
          {supplier.s_email || "No email"}
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;
