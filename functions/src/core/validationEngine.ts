import { WinfError } from '../utils/errors';

export class ValidationEngine {
    static validateAuth(contextAuth: any) {
        if (!contextAuth || !contextAuth.uid) {
            throw new WinfError('unauthenticated', 'Acesso negado: Contexto Neural desconectado.');
        }
        return contextAuth.uid;
    }

    static validateInput(params: any, requiredKeys: string[]) {
        for (const key of requiredKeys) {
            if (params[key] === undefined || params[key] === null) {
                throw new WinfError('invalid-argument', `Payload inválido. Campo obrigatório ausente: ${key}`);
            }
        }
    }
}
