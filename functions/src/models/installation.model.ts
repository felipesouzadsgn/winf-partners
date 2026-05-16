export interface Installation {
  id: string;
  os_id: string;
  user_id: string;
  vehicle_id?: string;
  roll_serial: string;
  area_m2: number;
  status: 'pending' | 'completed' | 'flagged';
  flags?: string[];
  created_at: string;
  completed_at?: string;
  vehicle_plate?: string;
  customer_id?: string;
}
