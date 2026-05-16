import * as functions from 'firebase-functions';

export class WinfError extends functions.https.HttpsError {
    constructor(code: functions.https.FunctionsErrorCode, message: string, public details?: any) {
        super(code, message, details);
    }
}
