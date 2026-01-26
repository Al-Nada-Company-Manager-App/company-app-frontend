export interface Theme {
  backgroundImage: string;
  containerBg: string;
  gradient1: string;
  gradient2: string;
  button: {
    background: string;
    color: string;
    hoverBackground: string;
    hoverColor: string;
    borderRadius: string;
    boxShadow: string;
    fontWeight: string;
    fontSize: string;
    padding: string;
    border: string;
    transition: string;
  };
  container: {
    background: string;
    borderRadius: string;
    backdropFilter: string;
  };
  title: {
    color: string;
  };
  headers: {
    color: string;
  };
  row: {
    borderColor: string;
    hoverBackground?: string;
  };
  employee: {
    nameColor: string;
    emailColor: string;
    roleColor: string;
    roleSubtextColor: string;
    dateColor: string;
    editColor: string;
  };
  avatar: {
    background: string;
  };
  status: {
    online: {
      background: string;
      color: string;
    };
    offline: {
      background: string;
      borderColor: string;
      color: string;
    };
  };
  modal?: {
    background?: string;
    color?: string;
    contentColor?: string;
    iconColor?: string;

    // Cancel button styles
    cancelButtonBg?: string;
    cancelButtonColor?: string;
    cancelButtonBorder?: string;
    cancelButtonHoverBg?: string;
    cancelButtonHoverColor?: string;
    cancelButtonHoverBorder?: string;

    // Confirm button styles
    confirmButtonBg?: string;
    confirmButtonColor?: string;
    confirmButtonHoverBg?: string;
    confirmButtonHoverColor?: string;
  };
  notification?: {
    container: {
      background: string;
      border: string;
      shadow: string;
    };
    header: {
      background: string;
      textColor: string;
      borderBottom: string;
    };
    item: {
      background: string;
      hoverBackground: string;
      borderBottom: string;
      nameColor: string;
      messageColor: string;
      timeColor: string;
      deleteButtonColor: string;
      deleteButtonHoverColor: string;
      leftBorderColor: string;
    };
    footer: {
      background: string;
      textColor: string;
      linkColor: string;
      linkHoverColor: string;
    };
    badge: {
      background: string;
      textColor: string;
    };
  };
  profile?: {
    card: {
      background: string;
      borderColor: string;
      borderRadius: string;
      padding: string;
      marginBottom: string;
    };
    avatar: {
      borderColor: string;
      background: string;
      borderWidth: string;
    };
    text: {
      primary: string;
      secondary: string;
      label: string;
    };
    header: {
      nameColor: string;
      roleColor: string;
    };
    icon: {
      color: string;
    };
    status: {
      active: string;
      inactive: string;
      borderColor: string;
    };
    actions: {
      editButton: {
        background: string;
        color: string;
        hoverBackground: string;
        hoverColor: string;
        border: string;
      };
      changePasswordButton: {
        background: string;
        color: string;
        hoverBackground: string;
        hoverColor: string;
        border: string;
      };
    };
  };
}
