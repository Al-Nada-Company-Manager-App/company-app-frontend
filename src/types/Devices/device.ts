export interface Device {
  p_id: number;
  p_name: string;
  p_status: "Completed" | "Repairing" | "Pending";
  serial_number: string;
}

export interface CreateDeviceInput {
  p_name: string;
  p_status: "Completed" | "Repairing" | "Pending";
  serial_number: string;
}