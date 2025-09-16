import { useState } from "react";
import { useProfile } from "@src/hooks/Profile/useProfile";
import { ErrorDisplay } from "@src/components/UI";
import {
  ProfileHeader,
  ProfileCards,
  UpdateProfileModal,
  ChangePasswordModal,
} from "./components";

interface ProfileProps {
  isDark: boolean;
}

const Profile = ({ isDark }: ProfileProps) => {
  const { user, theme } = useProfile(isDark);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

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
          <ProfileCards
            user={user}
            theme={theme}
            isDark={isDark}
            onEditProfile={() => setShowEditModal(true)}
            onChangePassword={() => setShowChangePasswordModal(true)}
          />
        </div>
      </div>
      <UpdateProfileModal
        modalOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        theme={theme}
      />
      <ChangePasswordModal
        modalOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        theme={theme}
      />
    </div>
  );
};

export default Profile;
