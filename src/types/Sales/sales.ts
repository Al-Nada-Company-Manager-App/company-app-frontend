
export interface Sales {
  sl_id: number;
  sl_date: string;
  sl_total: number;
  sl_discount: number;
  sl_tax: number;
  sl_status: string;
  sl_type: string;
  sl_inamount: number;
  sl_cost: number;
  sl_billnum: number;
  sl_payed: number;
  sl_currency: string;
  c_id: number;
  customer?: {
    c_name: string;
    c_photo: string;
};
}

export interface Products {
  p_id: number;
  sl_id: number;
  stock: {
    p_name: string;
    serial_number: string;
  }
};
