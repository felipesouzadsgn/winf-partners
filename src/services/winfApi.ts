import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../lib/firebase';

/**
 * CENTRAL DE OPERAÇÕES WINF API (ZERO-TRUST)
 * Substitui chamadas diretas no db (client-side) por conexões serverless auditáveis.
 */

// Inicializa a ponte do Functions Serverless
const functions = getFunctions(app);

// Tipagem de chamadas protegidas
interface CompleteInstallationPayload {
    osId: string;
    rollSerialNumber: string;
    areaUsedM2: number;
    photos: string[];
    customerId: string;
}

interface CompleteInstallationResponse {
    success: boolean;
    warranty_id: string;
    coins_earned: number;
    remaining_roll_area: number;
}

interface ConsumeStockPayload {
    osId?: string;
    rollId: string;
    amount: number;
}

interface ConsumeStockResponse {
    success: boolean;
    remaining: number;
}

interface TriggerWarrantyPayload {
    osId: string;
}

interface TriggerWarrantyResponse {
    success: boolean;
    warranty_id: string;
}

export const winfApi = {
    /**
     * Motor atômico que abate estoque físico da bobina, fecha OS e gera Garantia/Coins.
     */
    completeInstallation: async (payload: CompleteInstallationPayload): Promise<CompleteInstallationResponse> => {
        try {
            const callable = httpsCallable<CompleteInstallationPayload, CompleteInstallationResponse>(functions, 'completeInstallation');
            const result = await callable(payload);
            return result.data;
        } catch (error: any) {
            console.error('WINF API - ALERTA NEURAL (completeInstallation):', error.message);
            throw new Error(error.message || 'Falha na Máquina de Transações Winf.');
        }
    },

    /**
     * Motor atômico para consumo de estoque manual (sem geração comercial de OS/Garantia).
     */
    consumeStock: async (payload: ConsumeStockPayload): Promise<ConsumeStockResponse> => {
        try {
            const callable = httpsCallable<ConsumeStockPayload, ConsumeStockResponse>(functions, 'consumeStock');
            const result = await callable(payload);
            return result.data;
        } catch (error: any) {
            console.error('WINF API - ALERTA NEURAL (consumeStock):', error.message);
            throw new Error(error.message || 'Falha no consumo de estoque.');
        }
    },

    /**
     * Motor atômico que dispara a execução da garantia em uma OS já completada.
     */
    triggerWarrantyExecution: async (payload: TriggerWarrantyPayload): Promise<TriggerWarrantyResponse> => {
        try {
            const callable = httpsCallable<TriggerWarrantyPayload, TriggerWarrantyResponse>(functions, 'triggerWarrantyExecution');
            const result = await callable(payload);
            return result.data;
        } catch (error: any) {
            console.error('WINF API - ALERTA NEURAL (triggerWarrantyExecution):', error.message);
            throw new Error(error.message || 'Falha ao acionar Hub Neural de garantia.');
        }
    }
};
