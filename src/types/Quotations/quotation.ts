export interface QuotationItem {
  qi_product_name: string;
  qi_description?: string;
  qi_quantity: number;
  qi_unit_price: number;
  qi_total: number;
}

export interface Quotation {
  q_id: number;
  q_ref_code: string;
  q_customer_name: string;
  q_valid_until: string;
  q_total_amount: number;
  q_pdf_path: string;
  q_created_at: string;
  quotation_items?: QuotationItem[];
}

export interface CreateQuotationInput {
  customerName: string;
  validUntil?: string | null;
  items: {
    productName: string;
    description?: string;
    quantity: number;
    price: number;
  }[];
}
