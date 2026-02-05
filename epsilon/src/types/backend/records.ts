export type RecordType = {
    id: string;
    type: string;
    category?: string;
    subCategory?: string;
    title: string;
    data: string;
    timestamp?: string;
    isReveled: boolean;
    revealCode?: string;
    isEncrypted: boolean;
    encryptionCode: string;
    hackData?: string;
}