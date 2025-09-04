export interface Product {
  p_id: number;
  p_name: string;
  p_costprice: number;
  p_sellprice: number;
  p_quantity: number;
  p_photo: string | null;
  p_description: string | null;
  p_category: string;
  model_code: string | null;
  expire_date: string | null;
  p_status: string | null;
  serial_number: string;
}
// For creating a new product
export interface CreateProductInput {
  p_name: string;
  p_category: string;
  p_costprice: number;
  p_sellprice: number;
  p_quantity: number;
  model_code?: string;
  p_description?: string;
  expire_date?: string | null;
  p_status?: string | null;
  serial_number: string;
  p_photo?: string;
}

// For updating an existing product
export interface UpdateProductInput {
  p_id: number;
  p_name?: string;
  p_costprice?: number;
  p_sellprice?: number;
  p_quantity?: number;
  p_description?: string;
  p_category?: string;
  model_code?: string;
  expire_date?: string | null;
  p_status?: string | null;
  p_photo?: string;
}
