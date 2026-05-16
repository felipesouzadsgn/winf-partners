import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { TransactionEngine } from '../core/transactionEngine';
import { ValidationEngine } from '../core/validationEngine';
import { Installation } from '../models/installation.model';
import { WinfError } from '../utils/errors';

export const buildTriggerWarranty = (db: admin.firestore.Firestore) => {
    const transactionEngine = new TransactionEngine(db);

    return functions.https.onCall(async (data, context) => {
        const userId = ValidationEngine.validateAuth(context.auth);
        ValidationEngine.validateInput(data, ['osId']);
        
        const { osId } = data;

        return await transactionEngine.executeAtomic(async (transaction) => {
            const instRef = db.collection('installations').doc(osId);
            const instDoc = await transaction.get(instRef);

            if (!instDoc.exists) throw new WinfError('not-found', 'Instalação não localizada.');
            const inst = instDoc.data() as Installation;

            if (inst.user_id !== userId) throw new WinfError('permission-denied', 'Registro operacional de terceira licença não autorizado.');
            if (inst.status !== 'completed') throw new WinfError('failed-precondition', 'Instalação pendente de comprovação. Não é possível emitir garantia.');

            // Verify if already issued
            const warrantiesQuery = await db.collection('warranties').where('os_id', '==', osId).get();
            if (!warrantiesQuery.empty) {
                throw new WinfError('already-exists', 'A Garantia Neural já foi estabelecida e selada para esta O.S.');
            }

            const warrantyRef = db.collection('warranties').doc();
            transaction.set(warrantyRef, {
                 id: warrantyRef.id,
                 os_id: osId,
                 user_id: userId,
                 customer_id: inst.customer_id || 'unregistered',
                 roll_serial: inst.roll_serial,
                 status: 'active',
                 created_at: new Date().toISOString()
            });

            return { success: true, warranty_id: warrantyRef.id };
        });
    });
};
