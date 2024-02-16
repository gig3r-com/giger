import { EventStatus, IMedEvent } from '../models/events';
import { MedicalEventType } from '../models/events';

export const mockMedicalHistory: IMedEvent[] = [
        // Cyberware Events
        {
            
            id: '1',
            name: 'Neural Augmentation',
            timestamp: '2077-01-15T08:30:00Z',
            type: MedicalEventType.CYBERWARE,
            eventDescription:
                'Neural augmentation to enhance cognitive functions.',
            status: EventStatus.CURRENT
        },
        {
            
            id: '2',
            name: 'Optical Enhancement Implants',
            timestamp: '2077-02-25T12:45:00Z',
            type: MedicalEventType.CYBERWARE,
            eventDescription:
                'Installation of optical enhancement implants for improved vision.',
            status: EventStatus.CURRENT
        },
        {
            
            id: '3',
            name: 'Dermal Armor Upgrade',
            timestamp: '2077-04-08T15:20:00Z',
            type: MedicalEventType.CYBERWARE,
            eventDescription:
                'Upgrade to dermal armor for enhanced physical protection.',
            status: EventStatus.CURRENT
        },
        // Medical Procedure Events
        {
            
            id: '4',
            name: 'Synaptic Enhancement Procedure',
            timestamp: '2077-01-02T09:10:00Z',
            type: MedicalEventType.MEDICAL_PROCEDURE,
            eventDescription:
                'Enhancement procedure to boost reflexes and coordination.',
            status: EventStatus.HISTORICAL
        },
        {
            
            id: '5',
            name: 'Bionic Limb Replacement',
            timestamp: '2077-03-17T14:00:00Z',
            type: MedicalEventType.MEDICAL_PROCEDURE,
            eventDescription:
                'Replacement of a damaged limb with a bionic prosthetic.',
            status: EventStatus.HISTORICAL
        },
        {
            
            id: '6',
            name: 'Nano Blood Cleansing',
            timestamp: '2077-05-20T17:45:00Z',
            type: MedicalEventType.MEDICAL_PROCEDURE,
            eventDescription: 'Procedure to cleanse the blood using nanobots.',
            status: EventStatus.HISTORICAL
        },
        // Medical Drug Events
        {
            
            id: '7',
            name: 'Pain Relief Injection',
            timestamp: '2077-02-10T11:30:00Z',
            type: MedicalEventType.MEDICAL_DRUG,
            eventDescription:
                'Injection for pain relief after a high-intensity operation.',
            status: EventStatus.HISTORICAL
        },
        {
            
            id: '8',
            name: 'Neural Relaxant Dose',
            timestamp: '2077-04-25T16:15:00Z',
            type: MedicalEventType.MEDICAL_DRUG,
            eventDescription:
                'Dose of neural relaxant to reduce stress and anxiety.',
            status: EventStatus.HISTORICAL
        },
        {
            
            id: '9',
            name: 'Immune Booster Medication',
            timestamp: '2077-06-30T18:50:00Z',
            type: MedicalEventType.MEDICAL_DRUG,
            eventDescription: 'Medication to boost the immune system.',
            status: EventStatus.HISTORICAL
        },
        // Symptom Events
        {
            
            id: '10',
            name: 'Persistent Migraines',
            timestamp: '2077-03-05T13:40:00Z',
            type: MedicalEventType.SYMPTOM,
            eventDescription:
                'Experiencing persistent migraines, cause unknown.',
            status: EventStatus.HISTORICAL,
            revealCode: 'MIGR-2023' // A code to unlock this information
        },
        {
            
            id: '11',
            name: 'Nanofiber Rejection',
            timestamp: '2077-05-15T14:55:00Z',
            type: MedicalEventType.SYMPTOM,
            eventDescription:
                'Symptoms of nanofiber rejection after recent cyberware upgrades.',
            status: EventStatus.HISTORICAL
        },
        {
            
            id: '12',
            name: 'Memory Flashes',
            timestamp: '2077-07-22T10:25:00Z',
            type: MedicalEventType.SYMPTOM,
            eventDescription:
                'Unexpected memory flashes, potentially related to neural augmentation.',
            status: EventStatus.HISTORICAL
        }
    ]
