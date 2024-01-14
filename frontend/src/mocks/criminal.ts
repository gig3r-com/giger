import {
    ICriminalRecord,
    EventStatus,
    CriminalEventType
} from '../models/events';

export const mockCriminalRecord: (userId: string) => ICriminalRecord = (
    userId
) => ({
    userId,
    entries: [
        // Victim Entries
        {
            id: '1',
            userId,
            name: 'Assault',
            eventDescription: 'Assault at Night City Bar',
            status: EventStatus.CURRENT,
            timestamp: '2077-01-20T21:15:00Z',
            type: CriminalEventType.VICTIM
        },
        {
            id: '2',
            userId,
            name: 'Robbery',
            eventDescription: 'Robbery Incident in Heywood',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-03-10T18:30:00Z',
            type: CriminalEventType.VICTIM,
            revealCode: 'ROB-2023' // A code to unlock this information
        },
        {
            id: '3',
            userId,
            name: 'Vandalism',
            eventDescription: 'Vandalism of Personal Property',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-05-05T14:50:00Z',
            type: CriminalEventType.VICTIM
        },
        // Suspect Entries
        {
            id: '4',
            userId,
            name: 'Illegal Augmentation',
            eventDescription: 'Suspicion of Illegal Augmentation',
            status: EventStatus.CURRENT,
            timestamp: '2077-02-02T09:40:00Z',
            type: CriminalEventType.SUSPECT
        },
        {
            id: '5',
            userId,
            name: 'Corporate Espionage',
            eventDescription: 'Possible Involvement in Corporate Espionage',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-04-15T12:25:00Z',
            type: CriminalEventType.SUSPECT
        },
        {
            id: '6',
            userId,
            name: 'Illegal Fighting',
            eventDescription: 'Connection to Underground Fight Club',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-06-20T17:15:00Z',
            type: CriminalEventType.SUSPECT
        },
        // Wanted Entries
        {
            id: '7',
            userId,
            name: 'Data Theft',
            eventDescription: 'Wanted for Data Theft',
            status: EventStatus.CURRENT,
            timestamp: '2077-03-28T15:55:00Z',
            type: CriminalEventType.WANTED
        },
        {
            id: '8',
            userId,
            name: 'Corporate Arrest Warrant',
            eventDescription: 'Evasion of Corporate Arrest Warrant',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-05-12T11:10:00Z',
            type: CriminalEventType.WANTED
        },
        {
            id: '9',
            userId,
            name: 'Illegal Cyberware Modification',
            eventDescription: 'Illegal Modification of Cyberware',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-07-30T20:40:00Z',
            type: CriminalEventType.WANTED
        },
        // Witness Entries
        {
            id: '10',
            userId,
            name: 'Cyberattack on Arasaka Network',
            eventDescription: 'Witness to Cyberattack on Arasaka Network',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-04-05T16:30:00Z',
            type: CriminalEventType.WITNESS,
            revealCode: 'WIT-2023' // A code to unlock this information
        },
        {
            id: '11',
            userId,
            name: 'Gang Activity in Pacifica',
            eventDescription: 'Observation of Gang Activity in Pacifica',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-06-10T14:20:00Z',
            type: CriminalEventType.WITNESS
        },
        {
            id: '12',
            userId,
            name: 'Illegal Substance Trade',
            eventDescription: 'Knowledge of Illegal Substance Trade',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-08-18T19:00:00Z',
            type: CriminalEventType.WITNESS
        },
        // Punishment Entries
        {
            id: '13',
            userId,
            name: 'Public Disturbance',
            eventDescription: 'Community Service for Public Disturbance',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-05-25T13:45:00Z',
            type: CriminalEventType.PUNISHMENT
        },
        {
            id: '14',
            userId,
            name: 'Traffic Violation',
            eventDescription: 'Fine for Traffic Violation',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-07-15T10:35:00Z',
            type: CriminalEventType.PUNISHMENT
        },
        {
            id: '15',
            userId,
            name: 'Illegal Street Racing',
            eventDescription: 'Probation for Illegal Street Racing',
            status: EventStatus.HISTORICAL,
            timestamp: '2077-09-05T22:10:00Z',
            type: CriminalEventType.PUNISHMENT
        }
    ]
});
