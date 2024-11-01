import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Giger } from './apps/giger/giger';
import { QrScanner } from './apps/qr-scanner/qr-scanner';
import { Chat } from './apps/chat/chat';
import { Bank } from './apps/bank/bank';
import { MyId } from './apps/myId/my-id';
import { Login } from './apps/login/login';
import { RootState } from './store/store';
import { useEffect } from 'react';
import { useToastService } from './shared/services/toast.service';
import { Toaster } from 'react-hot-toast';
import { ToastItem } from './shared/components/toast/toast';
import { useVersionService } from './shared/services/version.service';
import { Contacts } from './apps/myId/contacts/contacts';
import { Details } from './apps/myId/details/details';
import { Vibe } from './apps/myId/vibe/vibe';
import { EventRecord } from './apps/myId/medical/event-record';
import { EventRecordType } from './models/events';
import { UserRecords } from './apps/myId/user-records/user-records';
import { UserRecordTypes } from './models/user';
import { AnimatePresence } from 'framer-motion';
import { NewTransaction } from './apps/bank/new-transaction/new-transaction';
import { useIntl } from 'react-intl';
import { CodeEntry } from './apps/myId/code-entry/code-entry';
import { LoggedInRoot } from './shared/components/logged-in-root/logged-in-root';

export const Router = () => {
    const intl = useIntl();
    const { test } = useToastService();
    const { versionCheck } = useVersionService();
    useEffect(() => {
        console.warn(intl.formatMessage({ id: 'DEVTOOLS_WARNING' }));
        versionCheck();
        test();
    }, []);

    const isLoggedIn = useSelector(
        (state: RootState) =>
            !!(state.users.currentUser && !state.users.requiresGodUserSelection)
    );

    return (
        <AnimatePresence mode="wait">
            <BrowserRouter>
                { !isLoggedIn && <Login /> }
                <Routes>
                    <Route path="/" element={<LoggedInRoot />}>
                        <Route path="scanner" element={<QrScanner />} />
                        <Route path="giger" element={<Giger />}>
                            <Route path="new-gig" element={<Giger />} />
                            <Route path=":gigId" element={<Giger />}>
                                <Route path="report-problem" element={<Giger />} />
                            </Route>
                        </Route>
                        <Route path="chat" element={<Chat />}>
                            <Route path=":chatId" element={<Chat />} />
                        </Route>\
                        <Route path="chat/new" element={<Chat />} />
                        <Route path="bank" element={<Bank />} />
                        <Route path="bank/new" element={<NewTransaction />} />
                        <Route path="myid" element={<MyId />} />
                        <Route path="myid/details" element={<Details />} />
                        <Route path="myid/details/contacts" element={<Contacts />}>
                            <Route path=":contactId" element={<Contacts />} />
                        </Route>
                        <Route path="myid/details/vibe" element={<Vibe />} />
                        <Route path="myid/details/medical" element={<EventRecord type={EventRecordType.MEDICAL} />} />
                        <Route path="myid/details/criminal" element={<EventRecord type={EventRecordType.CRIMINAL} />} />
                        <Route path="myid/details/goals" element={<UserRecords mode={UserRecordTypes.GOAL} />} />
                        <Route path="myid/details/hacking" element={<MyId />} />
                        <Route path="myid/details/meta" element={<UserRecords mode={UserRecordTypes.META} /> } />
                        <Route path="myid/details/records" element={<UserRecords mode={UserRecordTypes.PRIVATE_RECORD} />} />
                        <Route path="myid/details/goals" element={<UserRecords mode={UserRecordTypes.GOAL} />} />
                        <Route path="myid/details/relations" element={<UserRecords mode={UserRecordTypes.RELATION} />} />
                        <Route path="myid/details/code" element={<CodeEntry />} />
                    </Route>
                </Routes>
                <Toaster
                    position="bottom-center"
                    containerStyle={{
                        bottom: 80
                    }}
                >
                    {(t) => <ToastItem toast={t} />}
                </Toaster>
            </BrowserRouter>
        </AnimatePresence>
    );
};
