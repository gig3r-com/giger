import { IAccount } from "../../../models/banking";

export interface ICardsProps {
    accounts: IAccount[];
    onAccountChange: (account: IAccount) => void;
}
