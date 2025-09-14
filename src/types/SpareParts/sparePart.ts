export interface SparePart {
  p_id: number;
  p_name: string;
  p_quantity: number;
  model_code: string | null;
  serial_number: string | null;
}

export interface SelectedSparePart {
  sp_id: number | null;
  sp_quantity: number;
}

// Input for creating a spare part
export interface CreateSparePartInput {
  name: string;
  quantity: number;
  price: number;
  description?: string | null;
}

// Input for updating a spare part
export interface UpdateSparePartInput {
  id: number;
  name?: string;
  quantity?: number;
  price?: number;
  description?: string | null;
}
