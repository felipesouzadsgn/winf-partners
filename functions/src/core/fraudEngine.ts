import * as admin from 'firebase-admin';
import { logger } from '../utils/logger';
import { WinfError } from '../utils/errors';
import { Roll } from '../models/roll.model';
import { Installation } from '../models/installation.model';

export const FLAGS = {
    YIELD_ABUSE: 'FLAG_YIELD_ABUSE',
    GHOST_INSTALL: 'FLAG_GHOST_INSTALL',
    VELOCITY_BREACH: 'FLAG_VELOCITY_BREACH',
    STOLEN_ROLL: 'FLAG_STOLEN_ROLL'
};

const MAX_INSTALLS_PER_HOUR = 4;
const ROLL_TOLERANCE_MARGIN = 1.05; // 5% tolerância
const MAX_AREA_PER_INSTALL = 10; // 10 m2 é o limite superior realista pra um carro, por exemplo.

export class FraudEngine {
    constructor(private db: admin.firestore.Firestore) {}

    async validateGhostInstall(userId: string, osId: string, photos: string[], customerId?: string, vehiclePlate?: string) {
        if (!photos || photos.length === 0 || !customerId) {
            await logger.logFraudAttempt(this.db, userId, osId, FLAGS.GHOST_INSTALL, { photosCount: photos?.length, customerId });
            throw new WinfError('failed-precondition', 'Ghost Install detectada: Faltam fotos de comprovação ou cliente.');
        }
    }

    async validateVelocity(userId: string, osId: string) {
        const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
        const userInstallsQuery = await this.db.collection('installations')
            .where('user_id', '==', userId)
            .where('completed_at', '>=', oneHourAgo)
            .get();

        if (userInstallsQuery.size >= MAX_INSTALLS_PER_HOUR) {
            await logger.logFraudAttempt(this.db, userId, osId, FLAGS.VELOCITY_BREACH, { installCount1Hr: userInstallsQuery.size });
            throw new WinfError('resource-exhausted', 'Velocity Breach detectada: Operações humanamente impossíveis neste intervalo.');
        }
    }

    async validateYield(userId: string, targetId: string, roll: Roll, newUsedAreaM2: number, areaToAdd: number) {
        if (roll.assigned_to !== userId) {
            await logger.logFraudAttempt(this.db, userId, targetId, FLAGS.STOLEN_ROLL, { assignedTo: roll.assigned_to });
            throw new WinfError('permission-denied', 'Bobina não pertence à sua licença.');
        }

        if (areaToAdd > MAX_AREA_PER_INSTALL) {
             await logger.logFraudAttempt(this.db, userId, targetId, FLAGS.YIELD_ABUSE, { areaToAdd });
             throw new WinfError('out-of-range', 'Yield Abuse: Área acima do fisicamente viável.');
        }

        if (newUsedAreaM2 > roll.total_area_m2 * ROLL_TOLERANCE_MARGIN) {
            await logger.logFraudAttempt(this.db, userId, targetId, FLAGS.YIELD_ABUSE, { newUsedAreaM2, totalArea: roll.total_area_m2 });
            throw new WinfError('out-of-range', 'Yield Abuse: Consumo ultrapassa área matemática máxima suportada.');
        }
    }
}
