export interface ThemeConfig {
  backgroundImage: string;
  containerBg: string;
  textColor: string;
  buttonStyles: {
    backgroundColor: string;
    color: string;
  };
  gradient1: string;
  gradient2: string;
}

export interface Theme {
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
}