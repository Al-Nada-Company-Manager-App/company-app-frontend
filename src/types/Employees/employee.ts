export interface Employee {
  e_id: number;
  f_name: string;
  l_name: string;
  birth_date: string;
  salary: number;
  e_role: string;
  e_photo: string;
  e_address: string;
  e_email: string | null;
  e_phone: string | null;
  e_city: string;
  e_country: string;
  e_zipcode: string;
  e_username: string;
  e_gender: string;
  e_active: boolean;
}

export interface EmployeeTheme {
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


export interface EmployeePermissions {
  users_page: boolean;
  users_add: boolean;
  users_edit: boolean;
  users_delete: boolean;
  users_view: boolean;
  products_page: boolean;
  products_add: boolean;
  products_edit: boolean;
  products_delete: boolean;
  products_view: boolean;
  repaire_page: boolean;
  repaire_add: boolean;
  repaire_edit: boolean;
  repaire_delete: boolean;
  repaire_view: boolean;
  repaire_adddum: boolean;
  sales_page: boolean;
  sales_add: boolean;
  sales_edit: boolean;
  sales_delete: boolean;
  sales_view: boolean;
  price_page: boolean;
  price_add: boolean;
  price_edit: boolean;
  price_delete: boolean;
  price_view: boolean;
  debts_page: boolean;
  debts_add: boolean;
  debts_edit: boolean;
  debts_delete: boolean;
  debts_view: boolean;
  purchase_page: boolean;
  purchase_add: boolean;
  purchase_edit: boolean;
  purchase_delete: boolean;
  purchase_view: boolean;
  customer_page: boolean;
  customer_add: boolean;
  customer_edit: boolean;
  customer_delete: boolean;
  customer_view: boolean;
  supplier_page: boolean;
  supplier_add: boolean;
  supplier_edit: boolean;
  supplier_delete: boolean;
  supplier_view: boolean;
}

