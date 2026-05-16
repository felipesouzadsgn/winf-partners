import * as admin from 'firebase-admin';

export interface SecurityAudit {
  user_id: string;
  target_id: string;
  flag_type: string;
  resolved: boolean;
  timestamp: string;
  details?: any;
}

export const logger = {
    info: (msg: string, data?: any) => console.log(`[WINF INFO] ${msg}`, data || ''),
    error: (msg: string, data?: any) => console.error(`[WINF ERROR] ${msg}`, data || ''),
    logFraudAttempt: async (db: admin.firestore.Firestore, userId: string, targetId: string, flagType: string, details?: any) => {
        const audit: SecurityAudit = {
            user_id: userId,
            target_id: targetId,
            flag_type: flagType,
            timestamp: new Date().toISOString(),
            resolved: false,
            details
        };
        await db.collection('security_audits').add(audit);
        console.warn(`[WINF NEURAL ALERT] Fraud Attempt Tracked: ${flagType} by User ${userId}`);
    }
};
