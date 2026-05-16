import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { TransactionEngine } from '../core/transactionEngine';
import { FraudEngine } from '../core/fraudEngine';
import { ValidationEngine } from '../core/validationEngine';
import { Roll } from '../models/roll.model';
import { Installation } from '../models/installation.model';
import { WinfError } from '../utils/errors';
import { CoinService } from '../modules/coin.service';

export const buildCompleteInstallation = (db: admin.firestore.Firestore) => {
    const transactionEngine = new TransactionEngine(db);
    const fraudEngine = new FraudEngine(db);

    return functions.https.onCall(async (data, context) => {
        const userId = ValidationEngine.validateAuth(context.auth);
        ValidationEngine.validateInput(data, ['osId', 'rollSerialNumber', 'areaUsedM2', 'photos', 'customerId']);
        
        const { osId, rollSerialNumber, areaUsedM2, photos, customerId, vehiclePlate } = data;

        // Validations outside transaction (for reads that don't need locks)
        await fraudEngine.validateVelocity(userId, osId);

        return await transactionEngine.executeAtomic(async (transaction) => {
            const rollRef = db.collection('rolls').doc(rollSerialNumber);
            const instRef = db.collection('installations').doc(osId);

            const [rollDoc, instDoc] = await Promise.all([
                transaction.get(rollRef),
                transaction.get(instRef)
            ]);

            // Ghost Install Validation - Note: This could theoretically trigger outside logic, 
            // but we run it inside to ensure state hasn't changed if needed.
            await fraudEngine.validateGhostInstall(userId, osId, photos, customerId, vehiclePlate);

            if (!rollDoc.exists) throw new WinfError('not-found', 'Rolo não localizado no WINF.OS.');
            const roll = rollDoc.data() as Roll;

            const inst = instDoc.data() as Installation;
            if (instDoc.exists && inst.status === 'completed') {
                throw new WinfError('already-exists', 'A Instalação já foi completada.');
            }

            const newUsedArea = roll.used_area_m2 + areaUsedM2;

            // Yield Abuse Validation
            await fraudEngine.validateYield(userId, osId, roll, newUsedArea, areaUsedM2);

            // Writes
            transaction.update(rollRef, { 
                used_area_m2: newUsedArea,
                status: newUsedArea >= roll.total_area_m2 ? 'depleted' : 'active'
            });

            const completionData: Partial<Installation> = {
                status: 'completed',
                roll_serial: rollSerialNumber,
                area_m2: areaUsedM2,
                completed_at: new Date().toISOString(),
                customer_id: customerId,
                vehicle_plate: vehiclePlate
            };

            // Using set with merge to handle cases where OS document was just stubbed
            transaction.set(instRef, completionData, { merge: true });

            const warrantyRef = db.collection('warranties').doc();
            transaction.set(warrantyRef, {
                id: warrantyRef.id,
                os_id: osId,
                user_id: userId,
                customer_id: customerId,
                roll_serial: rollSerialNumber,
                status: 'active',
                created_at: new Date().toISOString()
            });

            const coinsEarned = CoinService.issueInstallationCoins(transaction, db, userId, osId, areaUsedM2);

            return { 
                success: true, 
                warranty_id: warrantyRef.id, 
                coins_earned: coinsEarned,
                remaining_roll_area: roll.total_area_m2 - newUsedArea
            };
        });
    });
};
