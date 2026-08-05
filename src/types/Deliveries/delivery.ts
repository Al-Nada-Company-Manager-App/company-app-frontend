export interface DeliveryNoteItem {
  dni_id: number;
  dn_id: number;
  dni_product_name: string;
  dni_serial_number?: string;
  dni_quantity: number;
  dni_model?: string;
  dni_manf?: string;
  dni_notes?: string;
}

export interface DeliveryNote {
  dn_id: number;
  dn_number: string;
  dn_date: string;
  dn_employee_name?: string;
  dn_receiver_name?: string;
  dn_tax_id?: string;
  dn_phone?: string;
  dn_national_id?: string;
  dn_address?: string;
  dn_notes?: string;
  dn_pdf_data?: string;
  dn_created_at?: string;
  c_id: number;
  e_id?: number;
  customer?: {
    c_name: string;
  };
  employee?: {
    f_name: string;
    l_name: string;
  };
  delivery_items?: DeliveryNoteItem[];
}
