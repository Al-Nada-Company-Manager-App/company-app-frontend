export interface ReceiptNoteItem {
  rni_id: number;
  rn_id: number;
  rni_product_name: string;
  rni_serial_number?: string;
  rni_quantity: number;
  rni_model?: string;
  rni_notes?: string;
}

export interface ReceiptNote {
  rn_id: number;
  rn_number: string;
  rn_date: string;
  rn_employee_name: string;
  rn_national_id?: string;
  rn_role?: string;
  rn_notes?: string;
  rn_pdf_data?: string;
  rn_created_at: string;
  c_id: number;
  e_id?: number;
  customer?: {
    c_name: string;
  };
  employee?: {
    f_name: string;
    l_name: string;
  };
  receipt_items?: ReceiptNoteItem[];
}
