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
}
