export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

export interface SidebarTheme {
  container: {
    background: string;
    backdropFilter: string;
    borderRadius: string;
  };
  item: {
    normal: {
      background: string;
      iconBackground: string;
      iconColor: string;
      textColor: string;
    };
    active: {
      background: string;
      iconBackground: string;
      iconColor: string;
      textColor: string;
    };
  };
  helpSection: {
    background: string;
    iconBackground: string;
    iconColor: string;
    textColor: string;
    buttonBackground: string;
  };
  logo: {
    textColor: string;
    gradient: string;
  };
}

export interface SidebarProps {
  isDark: boolean;
  onItemClick?: (itemId: string) => void;
}

export interface SidebarMenuItemProps {
  item: SidebarItem;
  theme: SidebarTheme;
  onClick: () => void;
  getIcon: (iconName: string) => React.ReactNode;
}
