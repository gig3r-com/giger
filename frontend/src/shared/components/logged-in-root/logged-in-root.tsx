import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { RootState } from '../../../store/store';
import { IWebsocketContext } from '../../providers/websocket.model';
import { useWebSocketContext } from '../../providers/websocket.provider';
import { useBankingService } from '../../services/banking.service';
import { useNotificationsService } from '../../services/notifications.service';
import { useUserService } from '../../services/user.service';
import { GodMarker } from '../god-marker/god-marker';
import { MainMenu } from '../main-menu/main-menu';
import { useMessagesService } from '../../services/messages.service';
import { useMyIdService } from '../../services/myid.service';

export const LoggedInRoot: FC = () => {
    const { lastMessage, lastNotificationUpdate } =
        useWebSocketContext() as IWebsocketContext;
    const { fetchAccounts } = useBankingService();
    const { fetchAllUsers } = useUserService();
    const { fetchUserConvos } = useMessagesService();
    const { fetchRecordHashes } = useMyIdService();
    const { handleNewMessage, handleNewNotification } =
        useNotificationsService();
    useEffect(() => {
        lastMessage && handleNewMessage(lastMessage);
    }, [handleNewMessage, lastMessage]);

    useEffect(() => {
        lastNotificationUpdate && handleNewNotification(lastNotificationUpdate);
    }, [handleNewNotification, lastNotificationUpdate]);

    const isLoggedIn = useSelector(
        (state: RootState) =>
            !!(state.users.currentUser && !state.users.requiresGodUserSelection)
    );

    useEffect(function fetchData() {
        if (!isLoggedIn) return;
        fetchAllUsers();
        fetchAccounts();
        fetchUserConvos();
        fetchRecordHashes();
    }, []);
    return (
        <div className="logged-in-user">
            <Outlet />
            <MainMenu />
            <GodMarker />
        </div>
    );
};
