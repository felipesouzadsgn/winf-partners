import * as admin from 'firebase-admin';

export class TransactionEngine {
    constructor(private db: admin.firestore.Firestore) {}

    async executeAtomic<T>(operation: (transaction: admin.firestore.Transaction) => Promise<T>): Promise<T> {
        try {
            return await this.db.runTransaction(async (transaction) => {
                return await operation(transaction);
            });
        } catch (error: any) {
            // Repasse do WINF Error lançado nas functions internas
            throw error;
        }
    }
}
