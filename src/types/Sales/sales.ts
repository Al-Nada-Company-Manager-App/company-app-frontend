
export interface Sales {
  sl_id: number;
  sl_date: string;
  sl_total: number;
  sl_discount: number;
  sl_tax: number;
  sl_status: "PENDING" | "COMPLETED" | "CANCELLED";
  sl_type: "REPAIR" | "SELLITEMS" | "SERVICE";
  sl_inamount: number;
  sl_cost: number;
  sl_billnum: number;
  sl_payed: number;
  sl_currency: string;
  due_date: string;
  in_due_date: string;
  adddum?: { [key: string]: number };
  customer?: {
    c_id?: number;
    c_name?: string;
    c_email?: string;
    c_photo?: string;
  };
}

export interface Products {
  p_id: number;
  sl_id: number;
  si_quantity: number;
  si_total: number;
  stock: {
    p_name: string;
    p_photo: string;
    p_costprice: number;
    serial_number: string;
  }
};
