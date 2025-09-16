import { useAuthContext } from "@src/contexts/auth";
import { useThemeContext } from "@src/contexts/theme";
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  Building2,
  Hash,
} from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuthContext();
  const { isDark } = useThemeContext();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No user data available</p>
      </div>
    );
  }

  const profileContainerStyle = {
    position: "absolute" as const,
    width: "1282px",
    height: "856px",
    left: "118px",
    top: "136px",
    background: isDark ? "#1f2937" : "#FFFFFF",
    borderRadius: "10px",
    boxShadow: isDark
      ? "0 4px 6px rgba(0, 0, 0, 0.3)"
      : "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    overflow: "auto",
  };

  const cardStyle = {
    backgroundColor: isDark ? "#374151" : "#f9fafb",
    border: `1px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
    borderRadius: "8px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  };

  const labelStyle = {
    color: isDark ? "#9ca3af" : "#6b7280",
    fontSize: "0.875rem",
    fontWeight: "500",
    marginBottom: "0.25rem",
  };

  const valueStyle = {
    color: isDark ? "#f9fafb" : "#111827",
    fontSize: "1rem",
    fontWeight: "400",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const InfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string | number;
  }) => (
    <div className="flex items-start gap-3 mb-4">
      <div className="flex-shrink-0 mt-1">
        <Icon size={20} color={isDark ? "#9ca3af" : "#6b7280"} />
      </div>
      <div className="flex-1">
        <p style={labelStyle}>{label}</p>
        <p style={valueStyle}>{value}</p>
      </div>
    </div>
  );

  return (
    <div style={profileContainerStyle}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <img
              src={user.e_photo || "/public/Images/employees/placeholder.jpg"}
              alt={`${user.f_name} ${user.l_name}`}
              className="w-32 h-32 rounded-full object-cover mx-auto"
              style={{
                border: `4px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
                backgroundColor: isDark ? "#374151" : "#f9fafb",
              }}
            />
            <div
              className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-2"
              style={{
                backgroundColor: user.e_active ? "#10b981" : "#ef4444",
                borderColor: isDark ? "#1f2937" : "#ffffff",
              }}
            />
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: isDark ? "#f9fafb" : "#111827" }}
          >
            {user.f_name} {user.l_name}
          </h1>
          <p
            className="text-lg"
            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
          >
            {user.e_role}
          </p>
        </div>

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div style={cardStyle}>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: isDark ? "#f9fafb" : "#111827" }}
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
          <div style={cardStyle}>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: isDark ? "#f9fafb" : "#111827" }}
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
          <div style={cardStyle}>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: isDark ? "#f9fafb" : "#111827" }}
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
          <div style={cardStyle}>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: isDark ? "#f9fafb" : "#111827" }}
            >
              Actions
            </h2>
            <div className="space-y-3">
              <button
                className="w-full px-4 py-2 rounded-md transition-colors"
                style={{
                  backgroundColor: isDark ? "#3b82f6" : "#2563eb",
                  color: "#ffffff",
                  border: "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = isDark
                    ? "#2563eb"
                    : "#1d4ed8";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = isDark
                    ? "#3b82f6"
                    : "#2563eb";
                }}
              >
                Edit Profile
              </button>
              <button
                className="w-full px-4 py-2 rounded-md transition-colors"
                style={{
                  backgroundColor: "transparent",
                  color: isDark ? "#f9fafb" : "#111827",
                  border: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = isDark
                    ? "#374151"
                    : "#f3f4f6";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
