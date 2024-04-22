import { useMemo } from 'react';
import { useUserService } from '../../../shared/services/user.service';
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

import './user-records.scss';
import { LockedEntry } from '../../../shared/components/locked-entry/locked-entry';

export function UserRecords(props: IUserRecordsProps) {
    const { mode } = props;
    const { currentUser } = useUserService();
    const entriesProperty = modeMap.get(mode)!.entriesProperty;
    const entries = useMemo(
        () => currentUser![entriesProperty],
        [currentUser, entriesProperty]
    );

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
            {entries.map((record) => getRecord(record))}
            <LockedEntry />
            <NewRecord type={mode} />
        </section>
    );
}
