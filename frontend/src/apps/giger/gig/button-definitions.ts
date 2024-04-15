import { GigStatus } from "../../../models/gig";

interface IButtonDefinition {
    label: string;
    action: string;
    color: 'primary' | 'secondary' | 'accent' | 'accent2';
    disabled?: boolean;
}

export enum GigRelation {
    POSTED_BY_ME = 'POSTED_BY_ME',
    TAKEN_BY_ME = 'TAKE_BY_ME',
    MODERATED_BY_ME = 'MODERATED_BY_ME'
}

export const buttonDefinitions: {
    status: GigStatus;
    relation: GigRelation;
    buttons: IButtonDefinition[];
}[] = [
    {
        status: GigStatus.AVAILABLE,
        relation: GigRelation.POSTED_BY_ME,
        buttons: []
    }
];
