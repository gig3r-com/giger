import { IUserBase } from "../../../models/user";

export interface IUserSelectProps {
    searchString: string;
    selected: IUserBase[];
    onValueUpdate: (searchString: string) => void;
}
