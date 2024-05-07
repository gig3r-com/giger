import { useEffect, useMemo } from 'react';
import { IUserRecordsProps } from './user-records.model';
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

import './user-records.scss';
import { FormattedMessage } from 'react-intl';

export function UserRecords(props: IUserRecordsProps) {
    const { mode } = props;
    const { getRecords, fetchRecords } = useUserRecordsService();
    const { isGod } = useUserService();

    const records = useMemo(() => getRecords(mode), [mode, getRecords]);

    useEffect(function fetchData() {
        fetchRecords(mode);
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
        <section className="user-records">
            {records
                .filter((record) => record.isRevealed)
                .map((record) => getRecord(record))}

            {records
                .filter((record) => !record.isRevealed)
                .map((record) => (
                    <div className="user-records__locked" key={record.id}>
                        <LockedEntry />
                    </div>
                ))}

            {records.length === 0 && <FormattedMessage id="NO_RECORDS" />}

            {isGod && <NewRecord type={mode} />}
        </section>
    );
}
