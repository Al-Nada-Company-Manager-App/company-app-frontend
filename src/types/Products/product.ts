export interface Product {
  p_id: number;
  p_name: string;
  p_costprice: number;
  p_sellprice: number;
  p_quantity: number;
  p_photo: string | null;
  p_description: string | null;
  p_category: string;
  p_size: string | null;
  model_code: string | null;
  expire_date: string | null;
  p_status: string | null;
  serial_number: string;
  s_id?: number | null;
  supplier?: {
    s_id: number;
    s_name: string;
  } | null;
}
// For creating a new product
export interface CreateProductInput {
  p_name: string;
  p_category: string;
  p_costprice: number;
  p_sellprice: number;
  p_quantity: number;
  model_code?: string;
  p_size?: string;
  p_description?: string;
  expire_date?: string | null;
  p_status?: string | null;
  serial_number: string;
  p_photo?: string;
  s_id?: number | null;
}

// For updating an existing product
export interface UpdateProductInput {
  p_id: number;
  p_name?: string;
  p_costprice?: number;
  p_sellprice?: number;
  p_quantity?: number;
  p_description?: string | null;
  p_category?: string;
  p_size?: string;
  model_code?: string;
  expire_date?: string | null;
  p_status?: string | null;
  p_photo?: string | null;
  s_id?: number | null;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  category?: string;
  status?: string;
}

export interface PaginatedProductResponse {
  data: Product[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
