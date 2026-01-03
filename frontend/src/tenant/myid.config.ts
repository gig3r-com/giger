import { MyIdCategory, MyIdSections } from '../apps/myId/myid.model';

export const gigerMyIdItemsByCategory: MyIdCategory[] = [
    {
        name: 'general',
        items: [
            { name: MyIdSections.CONTACTS },
            { name: MyIdSections.MEDICAL },
            { name: MyIdSections.CRIMINAL },
            { name: MyIdSections.PRIVATE_RECORDS }
        ]
    },
    {
        name: 'private',
        items: [
            { name: MyIdSections.CYBERWARE },
            { name: MyIdSections.GOALS },
            { name: MyIdSections.RELATIONS }
        ]
    },
    {
        name: 'meta',
        items: [{ name: 'meta' }, { name: 'code' }, { name: 'log out' }]
    }
];

export const cocMyIdItemsByCategory: MyIdCategory[] = [
    {
        name: 'general',
        items: [
            { name: MyIdSections.CONTACTS },
            { name: MyIdSections.CYBERWARE },
            { name: MyIdSections.CRIMINAL },
            { name: MyIdSections.FIRMWARE },
            { name: MyIdSections.NET }
        ]
    },
    {
        name: 'meta',
        items: [{ name: MyIdSections.META }]
    }
];
