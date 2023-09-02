export interface IUser {
    id: string;
    name: string;
    surname: string;
    handle: string;
    alias: string;
    IDValidTo: string | 'indefinite'; // date string
    insurance: boolean;
    age: number;
    cyberwarePercentage: number;
    affiliation: string;
    profession: string;
    reputation: number;
    type: UserTypes;
    netWorth: number;
    assets: string[];
}

export enum UserTypes {
    HUMAN = 'human',
    AI = 'ai',
    //CYBORG = 'cyborg',
    ANDROID = 'android'
}
