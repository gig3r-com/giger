import { IMedHistory } from '../models/medical';

export const mockMedicalHistory: IMedHistory = {
    userId: '35',
    currentState: 'Healthy',
    drugsPrescribed: [
        {
            id: '1fsdfs',
            name: 'Morphine',
            year: 2071
        },
        {
            id: '2fsdf',
            name: 'Oxycodone',
            year: 2072
        },
        {
            id: '3fsdf',
            name: 'Codeine max ultra neo turbo 9001',
            year: 2072
        },
        {
            id: '4fdsf',
            name: 'Hexa-heroine',
            year: 2072
        }
    ],
    implants: [
        {
            id: 'dsfdsf1',
            name: 'Cybernetic Arm',
            year: 2071,
            status: 'ok'
        },
        {
            id: 'ggdsgsg2',
            name: 'Cybernetic Leg',
            year: 2072,
            status: 'malfunctioning'
        },
        {
            id: 'gfgds3',
            name: 'Cybernetic Eye',
            year: 2072,
            status: 'broken'
        }
    ],
    pastTreatments: [
        {
            id: '1fdsf',
            name: 'Broken leg',
            year: 2071
        },
        {
            id: '2=-3232',
            name: 'Broken arm',
            year: 2072
        },
        {
            id: '-2323',
            name: 'Broken eye',
            year: 2072
        },
        {
            id: '0-22',
            name: 'Frontal lobe reconstruction',
            year: 2072,
            dataUnlockedBy: 'test-frontal-lobe'
        }
    ]
};
