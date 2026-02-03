export interface Customer {
  c_id: number;
  c_name: string;
  c_address: string;
  c_city: string;
  c_country: string;
  c_zipcode: string;
  c_fax: string;
  c_phone: string;
  c_email: string;
  c_photo: string;
  c_type?: "COMPANY" | "PERSON";
  c_company_id?: number | null;
  company?: { c_id: number; c_name: string } | null;
  employees?: Customer[] | null;
}

export interface CustomerSales {
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
}
