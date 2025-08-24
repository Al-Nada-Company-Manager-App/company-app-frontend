import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";
interface CustomerAvatarProps {
  customer: Customer;
  theme: Theme;
}

const CustomerAvatar = ({ customer, theme }: CustomerAvatarProps) => {
  return (
    <div
      className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
      style={{
        background: customer.c_photo ? "transparent" : theme.avatar.background,
        boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
      }}
    >
      <img
        src={
          customer.c_photo
            ? `/Images/customers/${customer.c_photo}`
            : "/Images/customers/placeholder.jpg"
        }
        alt={customer.c_name}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/Images/customers/placeholder.jpg";
          target.parentElement!.style.background = theme.avatar.background;
        }}
      />
    </div>
  );
};

export default CustomerAvatar;
