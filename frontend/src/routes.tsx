import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Giger } from './apps/giger/giger';
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
import { useAuthValidation } from './shared/services/auth-validation.service';
import { Contacts } from './apps/myId/contacts/contacts';
import { Details } from './apps/myId/details/details';
import { Vibe } from './apps/myId/vibe/vibe';
import { EventRecord } from './apps/myId/medical/event-record';
import { EventRecordType } from './models/events';
import { UserRecords } from './apps/myId/user-records/user-records';
import { UserRecordTypes } from './models/user';
import { AnimatePresence, motion } from 'framer-motion';
import { NewTransaction } from './apps/bank/new-transaction/new-transaction';
import { useIntl } from 'react-intl';
import { CodeEntry } from './apps/myId/code-entry/code-entry';
import { LoggedInRoot } from './shared/components/logged-in-root/logged-in-root';

export const Router = () => {
    const intl = useIntl();
    const { test } = useToastService();
    const { versionCheck } = useVersionService();
    
    // Validate auth token on app load
    useAuthValidation();
    
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
                {isLoggedIn ? (
                    <Routes>
                        <Route path="/" element={<LoggedInRoot />}>
                            <Route path="giger" element={<Giger />}>
                                <Route path="new-gig" element={<Giger />} />
                                <Route path=":gigId" element={<Giger />}>
                                    <Route
                                        path="report-problem"
                                        element={<Giger />}
                                    />
                                </Route>
                            </Route>
                            <Route path="chat" element={<Chat />}>
                                <Route path=":chatId" element={<Chat />} />
                                <Route path="new" element={<Chat />} />
                            </Route>
                            <Route path="bank" element={<Bank />}>
                                <Route
                                    path="new"
                                    element={<NewTransaction />}
                                />
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
                                    <Route
                                        path="code"
                                        element={<CodeEntry />}
                                    />
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="*" element={<Login />} />
                    </Routes>
                )}
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
