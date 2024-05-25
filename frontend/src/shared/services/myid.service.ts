import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { MyIdUncoverableSections } from '../../apps/myId/myid.model';
import {
    selectCriminalEventsHash,
    selectGoalsHash,
    selectMedicalEventsHash,
    selectPrivateRecordsHash,
    selectRelationsHash
} from '../../store/events.selectors';
import { useApiService } from './api.service';
import { useMemo } from 'react';
import {
    RecordHashTypes,
    setAllHashes,
    setSeenHash
} from '../../store/events.slice';

export function useMyIdService() {
    const dispatch = useDispatch();
    const { api } = useApiService();
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const medicalEventsHash = useSelector(selectMedicalEventsHash);
    const criminalEventsHash = useSelector(selectCriminalEventsHash);
    const goalsHash = useSelector(selectGoalsHash);
    const relationsHash = useSelector(selectRelationsHash);
    const privateRecordsHash = useSelector(selectPrivateRecordsHash);

    const enterRevealCode = (code: string): Promise<'success' | 'wrongCode'> =>
        new Promise((resolve) => {
            api.url('Reveal/code')
                .query({ revealCode: code })
                .patch()
                .res()
                .then(() => {
                    fetchRecordHashes();
                    resolve('success');
                })
                .catch(() => resolve('wrongCode'));
        });

    const fetchRecordHashes = () => {
        api.url('User/simple/hashes/byId')
            .query({ id: currentUser!.id })
            .get()
            .json<Record<string, number>>()
            .then((hashes) => {
                dispatch(setAllHashes(hashes));
            });
    };

    const setLastSeenHash = (sectionType: RecordHashTypes) => {
        switch (sectionType) {
            case RecordHashTypes.MEDICAL:
                dispatch(
                    setSeenHash({
                        type: sectionType,
                        hash: medicalEventsHash.current
                    })
                );
                break;
            case RecordHashTypes.CRIMINAL:
                dispatch(
                    setSeenHash({
                        type: sectionType,
                        hash: criminalEventsHash.current
                    })
                );
                break;
            case RecordHashTypes.RELATION:
                dispatch(
                    setSeenHash({
                        type: sectionType,
                        hash: relationsHash.current
                    })
                );
                break;
            case RecordHashTypes.PRIVATE_RECORD:
                dispatch(
                    setSeenHash({
                        type: sectionType,
                        hash: privateRecordsHash.current
                    })
                );
                break;
            case RecordHashTypes.GOAL:
                dispatch(
                    setSeenHash({ type: sectionType, hash: goalsHash.current })
                );
                break;
        }
    };

    const hasNewEntries = (sectionType?: MyIdUncoverableSections): boolean => {
        if (!sectionType) {
            return (
                hasNewMedicalEvents ||
                hasNewCriminalEvents ||
                hasNewRelations ||
                hasNewPrivateRecords ||
                hasNewGoals
            );
        }

        switch (sectionType) {
            case MyIdUncoverableSections.MEDICAL:
                return hasNewMedicalEvents;
            case MyIdUncoverableSections.CRIMINAL:
                return hasNewCriminalEvents;
            case MyIdUncoverableSections.RELATIONS:
                return hasNewRelations;
            case MyIdUncoverableSections.PRIVATE_RECORDS:
                return hasNewPrivateRecords;
            case MyIdUncoverableSections.GOALS:
                return hasNewGoals;
            default:
                return false;
        }
    };

    const hasNewPrivateRecords = useMemo(() => {
        return privateRecordsHash.lastSeen !== privateRecordsHash.current;
    }, [privateRecordsHash]);

    const hasNewGoals = useMemo(() => {
        return goalsHash.lastSeen !== goalsHash.current;
    }, [goalsHash]);

    const hasNewRelations = useMemo(() => {
        return relationsHash.lastSeen !== relationsHash.current;
    }, [relationsHash]);

    const hasNewMedicalEvents = useMemo(() => {
        return medicalEventsHash.lastSeen !== medicalEventsHash.current;
    }, [medicalEventsHash]);

    const hasNewCriminalEvents = useMemo(() => {
        return criminalEventsHash.lastSeen !== criminalEventsHash.current;
    }, [criminalEventsHash]);

    return {
        enterRevealCode,
        hasNewEntries,
        fetchRecordHashes,
        setLastSeenHash
    };
}
