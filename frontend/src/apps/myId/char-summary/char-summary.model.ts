import { IUserPublic } from '../../../models/user';

export interface ICharSummaryProps {
    mode: 'public' | 'private';
    userData?: IUserPublic;
}
