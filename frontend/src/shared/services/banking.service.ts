import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setAccount, setBusinessAccount } from "../../store/bank.slice";
import { account as mockAccount, accountBusiness } from "../../mocks/banking";

export function useBankingService() {
    const dispatch = useDispatch();
    const accounts = useSelector((state: RootState) => ({
        private: state.bank.account,
        business: state.bank.businessAccount
    }));
    const fetchAccounts = () => {
        dispatch(setAccount(mockAccount));
        dispatch(setBusinessAccount(accountBusiness));
    }

    return {
        accounts,
        fetchAccounts
    }
}
