import { useProfile } from "@src/hooks/Profile/useProfile";
import { ErrorDisplay } from "@src/components/UI";
import { ProfileHeader, ProfileCards } from "./components";

interface ProfileProps {
  isDark: boolean;
}

const Profile = ({ isDark }: ProfileProps) => {
  const { user, theme } = useProfile(isDark);

  if (!user) {
    return (
      <div className="p-6">
        <div 
          className="w-full rounded-2xl"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "400px",
          }}
        >
          <ErrorDisplay
            status="error"
            title="No User Data"
            subTitle="User information is not available."
            message="Please log in to view your profile."
            onRetry={() => window.location.reload()}
            showRetryButton={true}
            showHomeButton={false}
            isDark={isDark}
            style={{
              background: "transparent",
              minHeight: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div 
        className="w-full rounded-2xl p-6"
        style={{
          background: theme.container.background,
          backdropFilter: theme.container.backdropFilter,
        }}
      >
        {/* Title */}
        <div className="mb-6">
          <h2 
            className="text-lg font-bold"
            style={{ color: theme.title.color }}
          >
            Profile
          </h2>
        </div>

        {/* Profile Content */}
        <div className="max-w-6xl mx-auto">
          <ProfileHeader user={user} theme={theme} isDark={isDark} />
          <ProfileCards user={user} theme={theme} isDark={isDark} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
