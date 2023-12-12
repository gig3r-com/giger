import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Giger } from './apps/giger/giger';
import { MainMenu } from './shared/components/main-menu/main-menu';
import { Chat } from './apps/chat/chat';
import { Bank } from './apps/bank/bank';
import { MyId } from './apps/myId/my-id';

export const Router = () => {
    return (
        <BrowserRouter>
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
                <Route path="myid" element={<MyId />}>
                    <Route path=":userId" element={<MyId />} />
                    <Route path="details" element={<MyId />} />
                    <Route path="contacts" element={<MyId />} />
                    <Route path="neotribe" element={<MyId />} />
                    <Route path="medical" element={<MyId />} />
                    <Route path="criminal" element={<MyId />} />
                    <Route path="goals" element={<MyId />} />
                    <Route path="hacking" element={<MyId />} />
                    <Route path="meta" element={<MyId />} />
                </Route>
            </Routes>
            <MainMenu />
        </BrowserRouter>
    );
};
