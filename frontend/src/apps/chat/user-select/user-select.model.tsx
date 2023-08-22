import { IUser } from "../../../models/user";

export interface IUserSelectProps {
    searchString: string;
    selected: IUser[];
    onValueUpdate: (searchString: string) => void;
}
