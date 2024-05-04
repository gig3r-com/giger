import { useDispatch, useSelector } from 'react-redux';
import {
    selectRelations,
    selectMeta,
    selectPrivateRecords,
    selectGoals
} from '../../../store/events.selectors';
import {
    IGoal,
    IMeta,
    IPrivateRecord,
    IRelation,
    UserRecordTypes
} from '../../../models/user';
import { useApiService } from '../../../shared/services/api.service';
import { useUserService } from '../../../shared/services/user.service';
import { setRecords } from '../../../store/events.slice';

export const useUserRecordsService = () => {
    const dispatch = useDispatch();
    const { api } = useApiService();
    const { currentUser } = useUserService();
    const relations = useSelector(selectRelations);
    const metas = useSelector(selectMeta);
    const privateRecords = useSelector(selectPrivateRecords);
    const goals = useSelector(selectGoals);

    const getRecords = (type: UserRecordTypes) => {
        switch (type) {
            case UserRecordTypes.GOAL:
                return goals;
            case UserRecordTypes.META:
                return metas;
            case UserRecordTypes.PRIVATE_RECORD:
                return privateRecords;
            case UserRecordTypes.RELATION:
                return relations;
            default:
                return [];
        }
    };

    const fetchRecords = async (type: UserRecordTypes) => {
        if (!currentUser) return;
        let records;

        switch (type) {
            case UserRecordTypes.GOAL:
                records = await api
                    .get(`User/${currentUser.id}/goals`)
                    .json<IGoal[]>();
                break;
            case UserRecordTypes.META:
                records = await api
                    .get(`User/${currentUser.id}/metas`)
                    .json<IMeta[]>();
                break;
            case UserRecordTypes.PRIVATE_RECORD:
                records = await api
                    .get(`User/${currentUser.id}/privateRecords`)
                    .json<IPrivateRecord[]>();
                break;
            case UserRecordTypes.RELATION:
                records = await api
                    .get(`User/${currentUser.id}/relations`)
                    .json<IRelation[]>();
                break;
            default:
                records = [] as
                    | IRelation[]
                    | IPrivateRecord[]
                    | IMeta[]
                    | IGoal[];
        }

        dispatch(setRecords({ type, records }));
    };

    return {
        getRecords,
        fetchRecords
    };
};
