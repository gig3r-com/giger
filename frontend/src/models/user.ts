import { IMedHistory } from "./medical";

export interface IUserBase {
    id: string,
    name: string,
    handle: string,
    roles?: UserRoles[]
}

export interface IUser extends IUserBase {
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
    medical: IMedHistory;
}

export enum UserTypes {
    HUMAN = 'human',
    AI = 'ai',
    ANDROID = 'android'
}

export enum UserRoles {
    ADMIN = 'admin'
}
