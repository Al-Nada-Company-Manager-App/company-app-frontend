import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";
import CustomerAvatar from "./CustomerAvatar";

interface CustomerInfoProps {
  customer: Customer;
  theme: Theme;
}
const CustomerInfo = ({ customer, theme }: CustomerInfoProps) => {
  return (
    <div className="flex items-center">
      <div className="mr-4">
        <CustomerAvatar customer={customer} theme={theme} />
      </div>
      <div>
        <div style={{ color: theme.employee.nameColor }}>{customer.c_name}</div>
        <div
          style={{
            color: theme.employee.emailColor,
            fontSize: "14px",
          }}
        >
          {customer.c_email || "No email"}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
