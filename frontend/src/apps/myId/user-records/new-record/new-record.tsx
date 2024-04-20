import { FC, useState } from 'react';
import { MetaTypes, UserRecordTypes } from '../../../../models/user';
import { useSelector } from 'react-redux';
import { useEventsService } from '../../../../shared/services/events.service';
import { FormattedMessage } from 'react-intl';
import { RootState } from '../../../../store/store';

import './new-record.scss';

export const NewRecord: FC<{ type: UserRecordTypes }> = ({ type }) => {
    const userList = useSelector((state: RootState) => state.users.users);
    const { addGoal, addMeta, addPrivateRecord, addRelation } =
        useEventsService();
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [metaType, setMetaType] = useState<MetaTypes | ''>('');
    const [relationTo, setRelationTo] = useState<string>('');

    const handleAdd = () => {
        setDescription('');
        setTitle('');

        switch (type) {
            case UserRecordTypes.GOAL:
                addGoal(title, description);
                break;
            case UserRecordTypes.META:
                metaType && addMeta(metaType, description);
                break;
            case UserRecordTypes.PRIVATE_RECORD:
                addPrivateRecord(title, description);
                break;
            case UserRecordTypes.RELATION:
                addRelation(relationTo, description);
                break;
        }
    };

    const showTitle =
        type === UserRecordTypes.GOAL ||
        type === UserRecordTypes.PRIVATE_RECORD;

    return (
        <div className="new-record">
            {showTitle && (
                <div className="new-record__title">
                    <input
                        className="new-record__input"
                        placeholder="Title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
            )}

            {type === UserRecordTypes.META && (
                <select
                    className="new-record__select"
                    value={metaType}
                    onChange={(event) =>
                        setMetaType(event.target.value as MetaTypes)
                    }
                >
                    <option value={MetaTypes.AESTHETICS}>
                        <FormattedMessage id="AESTHETICS" />
                    </option>
                    <option value={MetaTypes.ARCHETYPE}>
                        <FormattedMessage id="ARCHETYPE" />
                    </option>
                    <option value={MetaTypes.INSPIRATIONS}>
                        <FormattedMessage id="INSPIRATIONS" />
                    </option>
                    <option value={MetaTypes.MUSIC}>
                        <FormattedMessage id="MUSIC" />
                    </option>
                    <option value={MetaTypes.PROCEDURE}>
                        <FormattedMessage id="PROCEDURE" />
                    </option>
                </select>
            )}

            {type === UserRecordTypes.RELATION && (
                <select
                    className="new-record__select"
                    value={relationTo}
                    onChange={(event) => setRelationTo(event.target.value)}
                >
                    {userList.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.handle}
                        </option>
                    ))}
                </select>
            )}

            <div className="new-record__description">
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="new-record__input"
                    placeholder="Description"
                />
            </div>
            <button
                disabled={!(title || metaType || relationTo) || !description}
                className="new-entry__add material-icons"
                onClick={handleAdd}
            >
                add
            </button>
        </div>
    );
};
