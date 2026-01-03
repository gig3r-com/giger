export enum MyIdUncoverableSections {
    META = 'META',
    GOALS = 'GOALS',
    PRIVATE_RECORDS = 'PRIVATE_RECORDS',
    RELATIONS = 'RELATIONS',
    MEDICAL = 'MEDICAL',
    CRIMINAL = 'CRIMINAL',
    CONTACTS = 'CONTACTS',
    PROFILE = 'PROFILE'
}

export enum MyIdSections {
    META = 'meta',
    GOALS = 'goals',
    PRIVATE_RECORDS = 'private-records',
    RELATIONS = 'relations',
    MEDICAL = 'medical',
    CRIMINAL = 'criminal',
    CONTACTS = 'contacts',
    CYBERWARE = 'cyberware',
    NET = 'net',
    FAQ = 'faq',
    FIRMWARE = 'firmware',
    VIBE = 'vibe'
}

export interface MyIdCategory {
    name: string;
    hidden?: boolean;
    items: MyIdItem[];
}

export interface MyIdItem {
    name: string;
    url?: string;
    isNew?: boolean;
    hidden?: boolean;
    onClickAction?: () => void;
}

export type MyIdNavigationProps = {
    onItemClick?: (name: string) => void;
};
