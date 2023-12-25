export interface IMedHistory {
    userId: string;
    drugsPrescribed: IObscurableMedInfo[];
    implants: IImplant[];
    pastTreatments: IObscurableMedInfo[];
    currentState: string; //? awaiting clarification
}

/**
 * some information may be unknown to the player until they unlock it by performing a specific action ingame.
 * they will be given a QR code (TBD) to scan, which will unlock the information.
 */
export interface IObscurableMedInfo {
    id: string;
    name: string;
    dataUnlockedBy?: string;
    year: number;
}

export interface IImplant extends IObscurableMedInfo {
    status: 'ok' | 'broken' | 'malfunctioning';
}

