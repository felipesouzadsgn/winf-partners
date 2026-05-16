export interface CoinLedger {
  id: string;
  user_id: string;
  amount: number;
  type: 'credit' | 'debit';
  source: 'installation' | 'academy' | 'store_purchase';
  reference_id: string; // OS ID, academy module ID, etc.
  created_at: string;
}
