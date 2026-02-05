import user from '@/configs/entities/user';

/*
 * ***********************************************
 *                 HARD RECORDS
 * ***********************************************
 */

export const privateFiles = {
    name: 'privateFiles',
    title: 'PRIVATE FILES',
    description: 'Opis co to jest i jak działa',
    icons: {
        PRIVATE_RECORD: '',
        PROGRAM: '',
    }
};

export const criminalRecords = {
    name: 'criminalRecords',
    title: 'CRIMINAL RECORDS',
    description: 'Opis co to jest i jak działa',
    icons: user.criminalIconsBySubcategories,
};