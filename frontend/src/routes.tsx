import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Giger } from './apps/giger/giger';
import { MainMenu } from './shared/components/main-menu/main-menu';
import { Chat } from './apps/chat/chat';
import { Bank } from './apps/bank/bank';
import { MyId } from './apps/myId/my-id';
import { ReportProblem } from './shared/components/report-problem/reportProblem';
import { Login } from './apps/login/login';
import { RootState } from './store/store';
import { useEffect } from 'react';
import { useNotificationsService } from './shared/services/notifications.service';
import { Toaster } from 'react-hot-toast';
import { ToastItem } from './shared/components/toast/toast';
import { useVersionService } from './shared/services/version.service';
import { AdminMarker } from './shared/components/admin-marker/admin-marker';
import { Contacts } from './apps/myId/contacts/contacts';
import { Details } from './apps/myId/details/details';
import { Vibe } from './apps/myId/vibe/vibe';
import { EventRecord } from './apps/myId/medical/event-record';
import { EventRecordType } from './models/events';
import { UserRecords } from './apps/myId/user-records/user-records';
import { UserRecordTypes } from './models/user';
import { AnimatePresence, motion } from 'framer-motion';
import { NewTransaction } from './apps/bank/new-transaction/new-transaction';

export const Router = () => {
    const { test } = useNotificationsService();
    const { versionCheck } = useVersionService();

    useEffect(() => {
        versionCheck();
        test();
    }, []);

    const isLoggedIn = useSelector(
        (state: RootState) => !!state.users.currentUser
    );

    return (
        <AnimatePresence mode="wait">
            <BrowserRouter>
                {isLoggedIn ? (
                    <>
                        <Routes>
                            <Route path="/" element={<Giger />} />
                            <Route path="giger" element={<Giger />}>
                                <Route path="new-gig" element={<Giger />} />
                                <Route path=":gigId" element={<Giger />} />
                            </Route>
                            <Route path="chat" element={<Chat />}>
                                <Route path=":chatId" element={<Chat />} />
                                <Route path="new" element={<Chat />} />
                            </Route>
                            <Route path="bank" element={<Bank />}>
                                <Route path="new" element={<NewTransaction />} />
                            </Route>
                            <Route path="myid" element={<MyId />}>
                                <Route path="details" element={<Details />}>
                                    <Route
                                        path="contacts"
                                        element={
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key="myid"
                                                    initial={{ x: '-100vw' }}
                                                    animate={{ x: 0 }}
                                                    exit={{ x: '100vw' }}
                                                >
                                                    <Contacts />
                                                </motion.div>
                                            </AnimatePresence>
                                        }
                                    >
                                        <Route
                                            path=":contactId"
                                            element={<Contacts />}
                                        />
                                    </Route>
                                    <Route path="vibe" element={<Vibe />} />
                                    <Route
                                        path="medical"
                                        element={
                                            <EventRecord
                                                type={EventRecordType.MEDICAL}
                                            />
                                        }
                                    />
                                    <Route
                                        path="criminal"
                                        element={
                                            <EventRecord
                                                type={EventRecordType.CRIMINAL}
                                            />
                                        }
                                    />
                                    <Route
                                        path="goals"
                                        element={
                                            <UserRecords
                                                mode={UserRecordTypes.GOAL}
                                            />
                                        }
                                    />
                                    <Route path="hacking" element={<MyId />} />
                                    <Route
                                        path="meta"
                                        element={
                                            <UserRecords
                                                mode={UserRecordTypes.META}
                                            />
                                        }
                                    />
                                    <Route
                                        path="records"
                                        element={
                                            <UserRecords
                                                mode={
                                                    UserRecordTypes.PRIVATE_RECORD
                                                }
                                            />
                                        }
                                    />
                                    <Route
                                        path="goals"
                                        element={
                                            <UserRecords
                                                mode={UserRecordTypes.GOAL}
                                            />
                                        }
                                    />
                                    <Route
                                        path="relations"
                                        element={
                                            <UserRecords
                                                mode={UserRecordTypes.RELATION}
                                            />
                                        }
                                    />
                                </Route>
                            </Route>
                            <Route
                                path="report-problem"
                                element={<ReportProblem />}
                            />
                        </Routes>
                        <Toaster
                            position="bottom-center"
                            containerStyle={{
                                bottom: 80
                            }}
                        >
                            {(t) => <ToastItem toast={t} />}
                        </Toaster>
                        <MainMenu />
                        <AdminMarker />
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="*" element={<Login />} />
                    </Routes>
                )}
            </BrowserRouter>
        </AnimatePresence>
    );
};
