import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { TransactionEngine } from '../core/transactionEngine';
import { FraudEngine } from '../core/fraudEngine';
import { ValidationEngine } from '../core/validationEngine';
import { Roll } from '../models/roll.model';
import { WinfError } from '../utils/errors';

export const buildConsumeStock = (db: admin.firestore.Firestore) => {
    const transactionEngine = new TransactionEngine(db);
    const fraudEngine = new FraudEngine(db);

    return functions.https.onCall(async (data, context) => {
        const userId = ValidationEngine.validateAuth(context.auth);
        ValidationEngine.validateInput(data, ['rollId', 'amount']);
        
        const { osId, rollId, amount } = data;

        return await transactionEngine.executeAtomic(async (transaction) => {
            const rollRef = db.collection('rolls').doc(rollId);
            const rollDoc = await transaction.get(rollRef);

            if (!rollDoc.exists) throw new WinfError('not-found', 'Bobina não encontrada.');
            const roll = rollDoc.data() as Roll;

            const newUsedArea = roll.used_area_m2 + amount;

            // Yield Abuse Validation
            await fraudEngine.validateYield(userId, osId || rollId, roll, newUsedArea, amount);

            transaction.update(rollRef, {
                used_area_m2: newUsedArea,
                status: newUsedArea >= roll.total_area_m2 ? 'depleted' : 'active'
            });

            if (osId) {
                const auditRef = db.collection('stock_mutations').doc();
                transaction.set(auditRef, {
                    os_id: osId, roll_id: rollId, amount, user_id: userId, timestamp: new Date().toISOString()
                });
            }

            return { success: true, remaining: roll.total_area_m2 - newUsedArea };
        });
    });
};
