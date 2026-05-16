export interface Roll {
  id: string; // Serial Number
  product_id: string;
  assigned_to: string; // userId do Franqueado
  total_area_m2: number;
  used_area_m2: number;
  status: 'active' | 'depleted' | 'flagged';
  created_at: string;
}
