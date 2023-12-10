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

export const Router = () => {
    const { test } = useNotificationsService();

    useEffect(() => {
        test();
    }, []);

    const isLoggedIn = useSelector(
        (state: RootState) => !!state.users.currentUser
    );

    return (
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
                        <Route path="bank" element={<Bank />} />
                        <Route path="my.id" element={<MyId />} />
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
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};
