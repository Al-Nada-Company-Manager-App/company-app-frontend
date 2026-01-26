import type { Employee } from "@src/types/Employees/employee";
import type { Theme } from "@src/types/theme";
import { getImageUrl, getPlaceholderUrl } from "@src/config/api";

interface ProfileHeaderProps {
  user: Employee;
  theme: Theme;
  isDark: boolean;
}

const ProfileHeader = ({ user, theme }: ProfileHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="relative inline-block mb-4">
        <img
          src={getImageUrl("employees", user.e_photo)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getPlaceholderUrl("employees");
          }}
          alt={`${user.f_name} ${user.l_name}`}
          className="w-32 h-32 rounded-full object-cover mx-auto transition-all duration-200"
          style={{
            border: `${theme.profile?.avatar.borderWidth} solid ${theme.profile?.avatar.borderColor}`,
            backgroundColor: theme.profile?.avatar.background,
          }}
        />
        <div
          className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-2"
          style={{
            backgroundColor: user.e_active
              ? theme.profile?.status.active
              : theme.profile?.status.inactive,
            borderColor: theme.profile?.status.borderColor,
          }}
        />
      </div>
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: theme.profile?.header.nameColor }}
      >
        {user.f_name} {user.l_name}
      </h1>
      <p
        className="text-lg font-medium"
        style={{ color: theme.profile?.header.roleColor }}
      >
        {user.e_role}
      </p>
    </div>
  );
};

export default ProfileHeader;
