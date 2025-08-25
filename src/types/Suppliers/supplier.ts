export interface Supplier {
  s_id: number;
  s_name: string;
  s_address: string;
  s_city: string;
  s_country: string;
  s_zipcode: string;
  s_fax: string;
  s_phone: string;
  s_email: string;
  s_photo: string;
}

export interface SupplierPurchases {
  pch_id: number;
  pch_date: string;
  pch_total: number;
  pch_tax: number;
  pch_cost: number;
  pch_billnum: number;
  pch_currency: string;
  pch_expense: string;
  pch_customscost: string;
  pch_customsnum: number;
}
