export interface Roll {
  id: string; // Serial Number do Rolo
  product_id: string; // Referência da linha (ex: AeroCore)
  assigned_to: string; // userId do Franqueado
  total_area_m2: number;
  used_area_m2: number;
  status: 'active' | 'depleted' | 'flagged';
  created_at: string;
}

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
}

export interface Warranty {
  id: string;
  os_id: string;
  user_id: string; // ID do Franqueado que emitiu
  customer_id: string;
  roll_serial: string;
  status: 'active' | 'void';
  created_at: string;
}

export interface CoinLedger {
  id: string;
  user_id: string;
  amount: number;
  type: 'credit' | 'debit';
  source: 'installation' | 'academy' | 'store_purchase';
  reference_id: string;
  created_at: string;
}

export interface SecurityAudit {
  id?: string;
  user_id: string;
  target_id: string; // OS ID ou Serial
  flag_type: string;
  resolved: boolean;
  timestamp: string;
}
