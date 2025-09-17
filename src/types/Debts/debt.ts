

export interface Debt {
  d_id: number;
  d_date: string; // ISO date string
  d_type: "DEBT_IN" | "DEBT_OUT" | "INSURANCE";
  d_amount: number;
  d_currency: string;
  sl_id: number;
  sales: {
    sl_id: number;
    sl_date: string; // ISO date string
    sl_total: number;
    sl_discount: number;
    sl_tax: number;
    sl_status: "Pending" | "Completed" | "Cancelled";
    sl_type: "REPAIR" | "SALE" | "SERVICE";
    sl_inamount: number;
    sl_cost: number;
    sl_billnum: number;
    sl_payed: number;
    sl_currency: string;
    c_id: number;
    customer: {
      c_name: string;
      c_photo: string; // URL or path to photo
    } | null;
  };
}
