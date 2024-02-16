import { FC } from 'react';
import { Route } from 'react-router';
import { EventRecordType } from '../../models/events';
import { UserRecordTypes } from '../../models/user';
import { Contacts } from './contacts/contacts';
import { Details } from './details/details';
import { EventRecord } from './medical/event-record';
import { MyId } from './my-id';
import { UserRecords } from './user-records/user-records';
import { Vibe } from './vibe/vibe';

export const MyIdRoutes: FC = () => {
    return (
        <Route path="myid" element={<MyId />}>
            <Route path="details" element={<Details />} />
            <Route path="contacts" element={<Contacts />}>
                <Route path=":contactId" element={<Contacts />} />
            </Route>
            <Route path="vibe" element={<Vibe />} />
            <Route
                path="medical"
                element={<EventRecord type={EventRecordType.MEDICAL} />}
            />
            <Route
                path="criminal"
                element={<EventRecord type={EventRecordType.CRIMINAL} />}
            />
            <Route
                path="goals"
                element={<UserRecords mode={UserRecordTypes.GOAL} />}
            />
            <Route path="hacking" element={<MyId />} />
            <Route
                path="meta"
                element={<UserRecords mode={UserRecordTypes.META} />}
            />
            <Route
                path="private-records"
                element={<UserRecords mode={UserRecordTypes.PRIVATE_RECORD} />}
            />
            <Route
                path="goals"
                element={<UserRecords mode={UserRecordTypes.GOAL} />}
            />
            <Route
                path="relations"
                element={<UserRecords mode={UserRecordTypes.RELATION} />}
            />
        </Route>
    );
};
