export enum MyIdUncoverableSections {
    META = 'META',
    GOALS = 'GOALS',
    PRIVATE_RECORDS = 'PRIVATE_RECORDS',
    RELATIONS = 'RELATIONS',
    MEDICAL = 'MEDICAL',
    CRIMINAL = 'CRIMINAL',
    CONTACTS = 'CONTACTS',
}

export interface MyIdCategory {
    name: string;
    items: MyIdItem[];
}

export interface MyIdItem {
    name: string;
    isNew?: boolean;
    onClickAction?: () => void;
}

export type MyIdNavigationProps = {
    active?: boolean;
    onItemClick?: (name: string) => void;
};
