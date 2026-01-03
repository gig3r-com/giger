import { FC } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { EventRecordType } from '../../models/events';
import { UserRecordTypes } from '../../models/user';
import { Contacts } from './contacts/contacts';
import { Details } from './details/details';
import { EventRecord } from './medical/event-record';
import { MyId } from './my-id';
import { UserRecords } from './user-records/user-records';
import { Vibe } from './vibe/vibe';
import { CodeEntry } from './code-entry/code-entry';
import { AnimatePresence } from 'framer-motion';
import { NestedPage } from '../../shared/components/pages/nested-page/nested-page';
import { Page } from '../../shared/components/pages/page/page';

export const MyIdRoutes: FC = () => {
    const location = useLocation();
    const locationArr = location.pathname?.split('/') ?? [];

    const vibe = <Route path="vibe" element={<Vibe />} />;
    const medical = (
        <Route
            path="medical"
            element={
                <Page>
                    <EventRecord type={EventRecordType.MEDICAL} />
                </Page>
            }
        />
    );
    const criminal = (
        <Route
            path="criminal"
            element={
                <Page>
                    <EventRecord type={EventRecordType.CRIMINAL} />
                </Page>
            }
        />
    );
    const goals = (
        <Route
            path="goals"
            element={
                <Page>
                    <UserRecords mode={UserRecordTypes.GOAL} />
                </Page>
            }
        />
    );
    const meta = (
        <Route
            path="meta"
            element={
                <Page>
                    <UserRecords mode={UserRecordTypes.META} />
                </Page>
            }
        />
    );
    const hacking = (
        <Route
            path="hacking"
            element={
                <Page>
                    <MyId />
                </Page>
            }
        />
    );
    const privateRecord = (
        <Route
            path="private-records"
            element={
                <Page>
                    <UserRecords mode={UserRecordTypes.PRIVATE_RECORD} />
                </Page>
            }
        />
    );
    const relations = (
        <Route
            path="relations"
            element={
                <Page>
                    <UserRecords mode={UserRecordTypes.RELATION} />
                </Page>
            }
        />
    );
    const codeEntry = (
        <Route
            path="code-entry"
            element={
                <Page>
                    <CodeEntry />
                </Page>
            }
        />
    );
    const contactId = (
        <Route
            path=":contactId"
            element={
                <NestedPage>
                    <Contacts />
                </NestedPage>
            }
        />
    );

    return (
        <AnimatePresence>
            <Routes location={location} key={locationArr[2]}>
                <Route
                    path="myid"
                    element={
                        <Page>
                            <MyId />
                        </Page>
                    }
                >
                    <AnimatePresence>
                        <Routes location={location} key={locationArr[3]}>
                            <Route
                                path="details"
                                element={
                                    <Page>
                                        <Details />
                                    </Page>
                                }
                            />
                            <Route
                                path="contacts"
                                element={
                                    <Page>
                                        <Contacts />
                                    </Page>
                                }
                            >
                                <Routes
                                    location={location}
                                    key={locationArr[4]}
                                >
                                    {contactId}
                                </Routes>
                            </Route>
                            {vibe}
                            {medical}
                            {criminal}
                            {goals}
                            {hacking}
                            {meta}
                            {privateRecord}
                            {goals}
                            {relations}
                            {codeEntry}
                        </Routes>
                    </AnimatePresence>
                </Route>
            </Routes>
        </AnimatePresence>
    );
};
