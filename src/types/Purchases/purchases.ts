
export interface Products {
  p_id: number;
  pch_id: number;
  pi_quantity: number;
  p_costprice: number;
  p_category: string;
  pi_total: number;
  stock: {
    p_name: string;
    p_sellprice: number;
    p_quantity: number;
    p_photo: string;
    p_description: string;
    modal_code: string;
    expire_date: string;
    p_status: string;
    serial_number: string;
  }
};

  
  export interface Purchases {
    pch_id: number;
    pch_date: string;
    pch_total: number;
    pch_tax: number;
    pch_cost: number;
    pch_billnum: number;
    pch_currency: string;
    pch_expense: number;
    pch_customscost: number;
    pch_customsnum: string;
    supplier?: {
      s_id?: number;
      s_name?: string;
      s_email?: string;
      s_photo?: string;
    };
    products?: Partial<Products>[];
  }