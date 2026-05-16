import * as admin from 'firebase-admin';

export class CoinService {
    static issueInstallationCoins(transaction: admin.firestore.Transaction, db: admin.firestore.Firestore, userId: string, osId: string, areaM2: number) {
        const coinsEarned = Math.floor(areaM2 * 10);
        const coinRef = db.collection('coin_ledger').doc();
        transaction.set(coinRef, {
            id: coinRef.id,
            user_id: userId,
            amount: coinsEarned,
            type: 'credit',
            source: 'installation',
            reference_id: osId,
            created_at: new Date().toISOString()
        });
        return coinsEarned;
    }
}
