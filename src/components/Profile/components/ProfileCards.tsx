import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  Building2,
  Hash,
} from "lucide-react";
import type { Employee } from "@src/types/Employees/employee";
import type { Theme } from "@src/types/theme";

interface ProfileCardsProps {
  user: Employee;
  theme: Theme;
  isDark: boolean;
}

const ProfileCards = ({ user, theme }: ProfileCardsProps) => {
  const InfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    label: string;
    value: string | number;
  }) => (
    <div className="flex items-start gap-3 mb-4">
      <div className="flex-shrink-0 mt-1">
        <Icon size={20} color={theme.profile?.icon.color} />
      </div>
      <div className="flex-1">
        <p
          className="text-sm font-medium mb-1 uppercase tracking-wider"
          style={{ color: theme.profile?.text.label }}
        >
          {label}
        </p>
        <p className="text-base" style={{ color: theme.profile?.text.primary }}>
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Personal Information */}
      <div
        className="rounded-xl p-6 transition-all duration-200 hover:transform hover:-translate-y-1"
        style={{
          background: theme.profile?.card.background,
          border: `1px solid ${theme.profile?.card.borderColor}`,
        }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: theme.profile?.text.primary }}
        >
          Personal Information
        </h2>
        <InfoItem
          icon={User}
          label="Full Name"
          value={`${user.f_name} ${user.l_name}`}
        />
        <InfoItem
          icon={Calendar}
          label="Birth Date"
          value={new Date(user.birth_date).toLocaleDateString()}
        />
        <InfoItem icon={Hash} label="Employee ID" value={user.e_id} />
        <InfoItem icon={User} label="Gender" value={user.e_gender} />
        <InfoItem icon={User} label="Username" value={user.e_username} />
      </div>

      {/* Contact Information */}
      <div
        className="rounded-xl p-6 transition-all duration-200 hover:transform hover:-translate-y-1"
        style={{
          background: theme.profile?.card.background,
          border: `1px solid ${theme.profile?.card.borderColor}`,
        }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: theme.profile?.text.primary }}
        >
          Contact Information
        </h2>
        <InfoItem
          icon={Mail}
          label="Email"
          value={user.e_email || "Not provided"}
        />
        <InfoItem
          icon={Phone}
          label="Phone"
          value={user.e_phone || "Not provided"}
        />
        <InfoItem icon={MapPin} label="Address" value={user.e_address} />
        <InfoItem icon={MapPin} label="City" value={user.e_city} />
        <InfoItem icon={MapPin} label="Country" value={user.e_country} />
        <InfoItem icon={MapPin} label="Zip Code" value={user.e_zipcode} />
      </div>

      {/* Work Information */}
      <div
        className="rounded-xl p-6 transition-all duration-200 hover:transform hover:-translate-y-1"
        style={{
          background: theme.profile?.card.background,
          border: `1px solid ${theme.profile?.card.borderColor}`,
        }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: theme.profile?.text.primary }}
        >
          Work Information
        </h2>
        <InfoItem icon={Building2} label="Role" value={user.e_role} />
        <InfoItem
          icon={Hash}
          label="Salary"
          value={`$${user.salary.toLocaleString()}`}
        />
        <InfoItem
          icon={User}
          label="Status"
          value={user.e_active ? "Active" : "Inactive"}
        />
      </div>

      {/* Additional Actions */}
      <div
        className="rounded-xl p-6 transition-all duration-200 hover:transform hover:-translate-y-1"
        style={{
          background: theme.profile?.card.background,
          border: `1px solid ${theme.profile?.card.borderColor}`,
        }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: theme.profile?.text.primary }}
        >
          Actions
        </h2>
        <div className="space-y-3">
          <button
            className="w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5"
            style={{
              background: theme.profile?.actions.editButton.background,
              color: theme.profile?.actions.editButton.color,
              border: theme.profile?.actions.editButton.border,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background =
                theme.profile?.actions.editButton.hoverBackground || "";
              e.currentTarget.style.color =
                theme.profile?.actions.editButton.hoverColor || "";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background =
                theme.profile?.actions.editButton.background || "";
              e.currentTarget.style.color =
                theme.profile?.actions.editButton.color || "";
            }}
          >
            Edit Profile
          </button>
          <button
            className="w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5"
            style={{
              background:
                theme.profile?.actions.changePasswordButton.background,
              color: theme.profile?.actions.changePasswordButton.color,
              border: theme.profile?.actions.changePasswordButton.border,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background =
                theme.profile?.actions.changePasswordButton.hoverBackground ||
                "";
              e.currentTarget.style.color =
                theme.profile?.actions.changePasswordButton.hoverColor || "";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background =
                theme.profile?.actions.changePasswordButton.background || "";
              e.currentTarget.style.color =
                theme.profile?.actions.changePasswordButton.color || "";
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCards;
