export interface Notification {
  n_id: number;
  n_date: string; // ISO date string
  n_type: string;
  n_message: string;
  n_status: "Pending" | "Read" | "Archived";
  e_id: number | null;
  p_id: number | null;
  d_id: number | null;
  sl_id: number | null;
  pch_id: number | null;
  stock?: {
    p_photo?: string;
    p_name?: string;
  } | null;
  employee?: {
    f_name: string;
    l_name: string;
    e_photo: string;
  } | null;
  sales?: {
    customer?: {
      c_photo?: string;
      c_name?: string;
    };
  } | null;
  purchase?: {
    supplier?: {
      s_photo?: string;
      s_name?: string;
    };
  } | null;
  debts?: {
    sales?: {
      customer?: {
        c_photo?: string;
        c_name?: string;
      };
    };
  } | null;
}
  

