import { useEffect, useMemo } from 'react';
import { IUserRecordsProps, modeMap } from './user-records.model';
import {
    IRelation,
    IMeta,
    IPrivateRecord,
    IGoal,
    UserRecordTypes
} from '../../../models/user';
import { NewRecord } from './new-record/new-record';
import { GoalEntry } from './goal-entry/goal-entry';
import { MetaEntry } from './meta-entry/meta-entry';
import { PrivateRecordEntry } from './private-record-entry/private-record-entry';
import { RelationEntry } from './relation-entry/relation-entry';
import { LockedEntry } from '../../../shared/components/locked-entry/locked-entry';
import { useUserRecordsService } from './user-records.service';
import { useUserService } from '../../../shared/services/user.service';
import { FormattedMessage } from 'react-intl';
import { isIObscurableInfo } from '../../../models/general';
import { Controls } from '../../../shared/components/controls/controls';
import { SectionBody } from '../../../shared/components/section-body/section-body';
import { useMyIdService } from '../../../shared/services/myid.service';

import './user-records.scss';

export function UserRecords(props: IUserRecordsProps) {
    const { mode } = props;
    const { getRecords, fetchRecords } = useUserRecordsService();
    const { isGod, currentUser } = useUserService();
    const { setLastSeenHash } = useMyIdService();
    const isRevealed = (record: IGoal | IMeta | IPrivateRecord | IRelation) => {
        if (isIObscurableInfo(record) && !record.isRevealed) {
            return false;
        }
        return true;
    };

    const records = useMemo(() => getRecords(mode), [mode, getRecords]);

    useEffect(function fetchData() {
        fetchRecords(mode);
        const hashType = modeMap.get(mode)?.hashProperty;
        hashType && setLastSeenHash(hashType);
    }, [currentUser]);

    useEffect(function setSeenHash() {
        const hashType = modeMap.get(mode)?.hashProperty;
        hashType && setLastSeenHash(hashType);
    }, []);

    const getRecord = (record: IGoal | IMeta | IPrivateRecord | IRelation) => {
        switch (record.recordType) {
            case UserRecordTypes.GOAL:
                return <GoalEntry goal={record as IGoal} key={record.id} />;
            case UserRecordTypes.META:
                return <MetaEntry meta={record as IMeta} key={record.id} />;
            case UserRecordTypes.PRIVATE_RECORD:
                return (
                    <PrivateRecordEntry
                        privateRecord={record as IPrivateRecord}
                        key={record.id}
                    />
                );
            case UserRecordTypes.RELATION:
                return (
                    <RelationEntry
                        relation={record as IRelation}
                        key={record.id}
                    />
                );
        }
    };

    return (
        <SectionBody>
            <Controls leftSideOption="back" />
            {records
                .filter((record) => isRevealed(record))
                .map((record) => getRecord(record))}

            {records
                .filter((record) => !isRevealed(record))
                .map((record) => (
                    <div className="user-records__locked" key={record.id}>
                        <LockedEntry />
                    </div>
                ))}

            {records.length === 0 && <FormattedMessage id="NO_RECORDS" />}

            {isGod && <NewRecord type={mode} />}
        </SectionBody>
    );
}
