import { IUserBase } from "../../models/user";

export interface IUserSelectProps {
    onSelection: (users: IUserBase[]) => void;
    mode?: 'single' | 'multi';
}
