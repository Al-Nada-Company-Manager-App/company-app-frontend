import type { Theme } from "@src/types/theme";

export const lightTheme: Theme = {
  backgroundImage: "/Images/homePage/lightModeBackground.jpg",
  containerBg: "#f5f7fa",
  gradient1:
    "linear-gradient(159.02deg,rgba(255,255,255,0.7) 14.25%,rgba(245,245,245,0.55) 56.45%,rgba(230,230,230,0.4) 86.14%)",
  gradient2:
    "linear-gradient(180deg,rgba(250,250,250,0.6) 23.5%,rgba(255,255,255,0) 100%)",
  button: {
    background: "#6C79F7",
    color: "#fff",
    hoverBackground: "#5A67D8",
    hoverColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 4px 16px rgba(108,121,239,0.12)",
    fontWeight: "550",
    fontSize: "16px",
    padding: "12px 24px",
    border: "none",
    transition: "background 0.2s, color 0.2s",
  },
  container: {
    background:
      "linear-gradient(126.97deg, rgba(255, 255, 255, 0.9) 28.26%, rgba(240, 240, 240, 0.8) 91.2%)",
    borderRadius: "20px",
    backdropFilter: "blur(60px)",
  },
  title: {
    color: "#2D3748",
  },
  headers: {
    color: "#A0AEC0",
  },
  row: {
    borderColor: "#E2E8F0",
    hoverBackground: "rgba(108, 121, 239, 0.08)",
  },
  employee: {
    nameColor: "#2D3748",
    emailColor: "#A0AEC0",
    roleColor: "#2D3748",
    roleSubtextColor: "#A0AEC0",
    dateColor: "#2D3748",
    editColor: "#A0AEC0",
  },
  avatar: {
    background: "#4FD1C5",
  },
  status: {
    online: {
      background: "#01B574",
      color: "#FFFFFF",
    },
    offline: {
      background: "transparent",
      borderColor: "#A0AEC0",
      color: "#A0AEC0",
    },
  },
  modal: {
    background: "rgba(255, 255, 255, 0.95)",
    color: "#2D3748",
    contentColor: "#4A5568",
    iconColor: "#ED8936",
    // Cancel button
    cancelButtonBg: "transparent",
    cancelButtonColor: "#4A5568",
    cancelButtonBorder: "#E2E8F0",
    cancelButtonHoverBg: "#F7FAFC",
    cancelButtonHoverColor: "#2D3748",
    cancelButtonHoverBorder: "#CBD5E0",
    // Confirm button
    confirmButtonBg: "#6C79F7",
    confirmButtonColor: "#FFFFFF",
    confirmButtonHoverBg: "#5A67D8",
    confirmButtonHoverColor: "#FFFFFF",
  },
  notification: {
    container: {
      background: "#FFFFFF",
      border: "#E2E8F0",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    },
    header: {
      background: "#F7FAFC",
      textColor: "#2D3748",
      borderBottom: "#E2E8F0",
    },
    item: {
      background: "#FFFFFF",
      hoverBackground: "#F7FAFC",
      borderBottom: "#E2E8F0",
      nameColor: "#2D3748",
      messageColor: "#718096",
      timeColor: "#A0AEC0",
      deleteButtonColor: "#E53E3E",
      deleteButtonHoverColor: "#C53030",
      leftBorderColor: "#ED1316",
    },
    footer: {
      background: "#EDF3FF",
      textColor: "#2D3748",
      linkColor: "#24BEFE",
      linkHoverColor: "#1E90FF",
    },
    badge: {
      background: "#ED1316",
      textColor: "#FFFFFF",
    },
  },
  profile: {
    card: {
      background: "rgba(255, 255, 255, 0.9)",
      borderColor: "#E2E8F0",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "24px",
    },
    avatar: {
      borderColor: "#E2E8F0",
      background: "#F7FAFC",
      borderWidth: "4px",
    },
    text: {
      primary: "#2D3748",
      secondary: "#718096",
      label: "#A0AEC0",
    },
    header: {
      nameColor: "#2D3748",
      roleColor: "#718096",
    },
    icon: {
      color: "#A0AEC0",
    },
    status: {
      active: "#01B574",
      inactive: "#E53E3E",
      borderColor: "#FFFFFF",
    },
    actions: {
      editButton: {
        background: "#6C79F7",
        color: "#FFFFFF",
        hoverBackground: "#5A67D8",
        hoverColor: "#FFFFFF",
        border: "none",
      },
      changePasswordButton: {
        background: "transparent",
        color: "#2D3748",
        hoverBackground: "#F7FAFC",
        hoverColor: "#2D3748",
        border: "1px solid #E2E8F0",
      },
    },
  },
};

export const darkTheme: Theme = {
  backgroundImage: "/Images/homePage/darkModeBackground.jpg",
  containerBg: "#020515",
  gradient1:
    "linear-gradient(159.02deg,rgba(15,18,59,0.7) 14.25%,rgba(9,13,46,0.55) 56.45%,rgba(2,5,21,0.4) 86.14%)",
  gradient2:
    "linear-gradient(180deg,rgba(6,11,38,0.6) 23.5%,rgba(15,18,59,0) 100%)",
  button: {
    background: "#6C79F7",
    color: "#fff",
    hoverBackground: "#5A67D8",
    hoverColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    fontWeight: "600",
    fontSize: "16px",
    padding: "12px 24px",
    border: "none",
    transition: "background 0.2s, color 0.2s",
  },
  container: {
    background:
      "linear-gradient(126.97deg, rgba(6, 11, 40, 0.95) 28.26%, rgba(10, 14, 35, 0.95) 91.2%)",
    borderRadius: "20px",
    backdropFilter: "blur(60px)",
  },
  title: {
    color: "#FFFFFF",
  },
  headers: {
    color: "#A0AEC0",
  },
  row: {
    borderColor: "#56577A",
    hoverBackground: "rgba(255, 255, 255, 0.05)",
  },
  employee: {
    nameColor: "#FFFFFF",
    emailColor: "#A0AEC0",
    roleColor: "#FFFFFF",
    roleSubtextColor: "#A0AEC0",
    dateColor: "#FFFFFF",
    editColor: "#A0AEC0",
  },
  avatar: {
    background: "#4FD1C5",
  },
  status: {
    online: {
      background: "#01B574",
      color: "#FFFFFF",
    },
    offline: {
      background: "transparent",
      borderColor: "#FFFFFF",
      color: "#FFFFFF",
    },
  },
  modal: {
    background: "rgba(16, 20, 50, 0.95)",
    color: "#FFFFFF",
    contentColor: "#CBD5E0",
    iconColor: "#F6AD55",
    // Cancel button
    cancelButtonBg: "transparent",
    cancelButtonColor: "#CBD5E0",
    cancelButtonBorder: "#56577A",
    cancelButtonHoverBg: "rgba(255, 255, 255, 0.1)",
    cancelButtonHoverColor: "#FFFFFF",
    cancelButtonHoverBorder: "#718096",
    // Confirm button
    confirmButtonBg: "#6C79F7",
    confirmButtonColor: "#FFFFFF",
    confirmButtonHoverBg: "#5A67D8",
    confirmButtonHoverColor: "#FFFFFF",
  },
  notification: {
    container: {
      background: "rgba(16, 20, 50, 0.95)",
      border: "#56577A",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    },
    header: {
      background: "rgba(6, 11, 40, 0.8)",
      textColor: "#FFFFFF",
      borderBottom: "#56577A",
    },
    item: {
      background: "rgba(16, 20, 50, 0.95)",
      hoverBackground: "rgba(255, 255, 255, 0.05)",
      borderBottom: "#56577A",
      nameColor: "#FFFFFF",
      messageColor: "#CBD5E0",
      timeColor: "#A0AEC0",
      deleteButtonColor: "#F56565",
      deleteButtonHoverColor: "#E53E3E",
      leftBorderColor: "#ED1316",
    },
    footer: {
      background: "rgba(6, 11, 40, 0.9)",
      textColor: "#FFFFFF",
      linkColor: "#24BEFE",
      linkHoverColor: "#63B3ED",
    },
    badge: {
      background: "#ED1316",
      textColor: "#FFFFFF",
    },
  },
  profile: {
    card: {
      background: "rgba(16, 20, 50, 0.9)",
      borderColor: "#56577A",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "24px",
    },
    avatar: {
      borderColor: "#56577A",
      background: "rgba(6, 11, 40, 0.8)",
      borderWidth: "4px",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#CBD5E0",
      label: "#A0AEC0",
    },
    header: {
      nameColor: "#FFFFFF",
      roleColor: "#CBD5E0",
    },
    icon: {
      color: "#A0AEC0",
    },
    status: {
      active: "#01B574",
      inactive: "#F56565",
      borderColor: "rgba(16, 20, 50, 0.95)",
    },
    actions: {
      editButton: {
        background: "#6C79F7",
        color: "#FFFFFF",
        hoverBackground: "#5A67D8",
        hoverColor: "#FFFFFF",
        border: "none",
      },
      changePasswordButton: {
        background: "transparent",
        color: "#CBD5E0",
        hoverBackground: "rgba(255, 255, 255, 0.1)",
        hoverColor: "#FFFFFF",
        border: "1px solid #56577A",
      },
    },
  },
};
