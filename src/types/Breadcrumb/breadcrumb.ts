export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface BreadcrumbTheme {
  container: {
    background: string;
    textColor: string;
  };
  searchInput: {
    background: string;
    borderColor: string;
    textColor: string;
    placeholderColor: string;
    iconColor: string;
  };
  userMenu: {
    textColor: string;
    iconColor: string;
  };
  userProfile: {
    nameColor: string;
    imageBorder: string;
    containerBackground: string;
    containerBorder: string;
  };
  title: {
    color: string;
  };
  breadcrumbText: {
    color: string;
  };
}

export interface UserMenuItem {
  id: string;
  label: string;
  icon: string;
  image?: string;
  isProfile?: boolean;
}
