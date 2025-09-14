export interface RepairProcess {
  stock: {
    p_id: number;
    p_name: string | null;
    p_costprice: number | null;
    p_sellprice: number | null;
    p_quantity: number | null;
    p_photo: string | null;
    p_description: string | null;
    p_category: string | null;
    model_code: string | null;
    expire_date: string | null;
    p_status: "Pending" | "Repairing" | "Completed" | null;
    serial_number: string | null;
  };
}

export interface Repair {
  rep_id: number;
  rep_date: string;
  remarks: string;
  stock: {
    p_id: number;
    p_name: string;
    p_status: "Pending" | "Repairing" | "Completed";
    serial_number: string;
  };
  repair_process: RepairProcess[];
}

export interface CreateRepairInput {
  p_id: number;
  remarks: string;
  rep_date: string;
  stock?: {
    serial_number: string;
    p_name: string;
    p_status: "Pending" | "Repairing" | "Completed";
  };
  spare_parts: { sp_id: number; sp_quantity: number }[];
}
