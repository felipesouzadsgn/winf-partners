import * as admin from 'firebase-admin';
import { buildCompleteInstallation } from './triggers/completeInstallation';
import { buildConsumeStock } from './triggers/consumeStock';
import { buildTriggerWarranty } from './triggers/triggerWarranty';

admin.initializeApp();
const db = admin.firestore();

export const completeInstallation = buildCompleteInstallation(db);
export const consumeStock = buildConsumeStock(db);
export const triggerWarrantyExecution = buildTriggerWarranty(db);
