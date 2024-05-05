import { IUserPrivate } from './user';

export interface ILocalStorage {
    loggedInUser?: IUserPrivate;
    authToken?: string;
    version?: number;
}
