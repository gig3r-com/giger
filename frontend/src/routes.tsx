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
                <Route path="my.id" element={<MyId />} />
            </Routes>
            <MainMenu />
        </BrowserRouter>
    );
};
