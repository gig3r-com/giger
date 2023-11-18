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

export const Router = () => {
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
                        <Route path="myid" element={<MyId />} />
                        <Route
                            path="report-problem"
                            element={<ReportProblem />}
                        />
                    </Routes>
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
