import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import {
    setCurrentUser,
    setRequiresGodUserSelection,
    setUser,
    setUsers,
    updateCurrentUser,
    updateViewAsUser
} from '../../store/users.slice';
import {
    IUserBase,
    IUserPrivate,
    IUserPublic,
    UserRoles
} from '../../models/user';
import { RootState } from '../../store/store';
import {
    selectActiveUsers,
    selectCurrentUser,
    selectIsModerator,
    selectIsGod
} from '../../store/users.selectors';
import { useApiService } from './api.service';
import { useNotificationsService } from './notifications.service';
import { useIntl } from 'react-intl';

export function useUserService() {
    const intl = useIntl();
    const dispatch = useDispatch();
    const { api, loginCall } = useApiService();
    const { displayToast } = useNotificationsService();
    const userList = useSelector((state: RootState) => state.users.users);
    const activeUsers = useSelector(selectActiveUsers);
    const currentUser = useSelector(selectCurrentUser);
    const isGod = useSelector(selectIsGod);
    const isModerator = useSelector(selectIsModerator);

    /**
     * in case an godmode user logs in, we set the requiresGodUserSelection to true
     */
    const login = async (username: string, password: string) =>
        new Promise<void>((resolve, reject) => {
            return Promise.allSettled([
                loginCall(username, password),
                new Promise<void>((resolve) => setTimeout(resolve, 3000))
            ]).then((res) => {
                if (res[0].status !== 'fulfilled') {
                    reject();
                } else {
                    const userData = res[0].value;
                    const userIsGod = userData.roles.includes(UserRoles.GOD);

                    if (userIsGod) {
                        dispatch(setRequiresGodUserSelection(true));
                    }

                    dispatch(setCurrentUser(userData));
                    saveLoginData(userData);
                    resolve();
                }
            });
        });

    const fetchAllUsers = () => {
        api.get('User/public/all')
            .json<IUserPublic[]>()
            .then((data) => {
                dispatch(setUsers(data));
            })
            .catch(() =>
                displayToast(intl.formatMessage({ id: 'ERROR_FETCHING_USERS' }))
            );
    };

    const saveLoginData = (userData: IUserPrivate) => {
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
    };

    const retrieveLoginData = (): void => {
        const userData = localStorage.getItem('loggedInUser');

        if (userData) {
            dispatch(setCurrentUser(JSON.parse(userData)));
        }
    };

    const logout = (): void => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('authToken');
        api.get('Login/logout');
        dispatch(setCurrentUser(undefined));
    };

    const updateUserData = async (
        userId: string,
        userData: Partial<IUserPrivate>
    ) => {
        const updatedData: Partial<IUserPrivate> = {
            ...currentUser,
            reputationDescription: '',
            ...userData
        };

        api.url('User').put(updatedData);

        if (currentUser?.id === userId) {
            dispatch(updateViewAsUser(userData));
        } else {
            dispatch(setUser({ ...userData }));
        }
    };

    const canAnonymizeChatHandle = () => {
        return (currentUser && currentUser.hackingSkills.stat >= 1) || isGod;
    };

    const getAnonymizedHandle = () => {
        const rand = v4().split('-');
        return [rand[0], rand[1]].join('');
    };

    const isInfluencer = (handle: string) => {
        const user = userList.find((user) => user.handle === handle);

        return user?.roles?.includes(UserRoles.INFLUENCER);
    };

    async function getUserById(
        userId: string,
        type: 'private'
    ): Promise<IUserPrivate>;
    async function getUserById(
        userId: string,
        type: 'public'
    ): Promise<IUserPublic>;
    async function getUserById(
        userId: string,
        type: 'private' | 'public'
    ): Promise<IUserPrivate | IUserPublic> {
        switch (type) {
            case 'private':
                return await api
                    .get(`User/private/byId?id=${userId}`)
                    .json<IUserPrivate>();
            case 'public':
                return await api
                    .get(`User/public/byId?id=${userId}`)
                    .json<IUserPrivate>();
        }
    }

    async function getUserByName(
        name: string,
        type: 'private'
    ): Promise<IUserPrivate>;
    async function getUserByName(
        name: string,
        type: 'public'
    ): Promise<IUserPublic>;
    async function getUserByName(
        name: string,
        type: 'private' | 'public'
    ): Promise<IUserPrivate | IUserPublic> {
        switch (type) {
            case 'private':
                return await api
                    .get(`User/private/byName/${name}`)
                    .json<IUserPrivate>();
            case 'public':
                return await api
                    .get(`User/public/byName/${name}`)
                    .json<IUserPublic>();
        }
    }

    const fetchCurrentUser = async () => {
        if (!currentUser) {
            throw new Error('User not found');
        }

        const userdata = await api
            .get(`User/simple/byId?id=${currentUser.id}`)
            .json<IUserPrivate>();
        dispatch(updateCurrentUser(userdata));
    };

    const getBasicUserDataById = (userId: string): IUserBase | undefined => {
        return userList.find((user) => user.id === userId);
    };

    const getHandleForConvo = (convoId: string, userId: string) => {
        const user = userList.find((user) => userId === user.id);

        return (
            user?.aliasMap[convoId] ??
            user?.handle ??
            intl.formatMessage({ id: 'UNKNOWN' })
        );
    };

    const toggleUserAsFavorite = async (favoriteUserId: string) => {
        const favoriteUserIds = new Set(currentUser!.favoriteUserIds);

        if (favoriteUserIds.has(favoriteUserId)) {
            favoriteUserIds.delete(favoriteUserId);
        } else {
            favoriteUserIds.add(favoriteUserId);
        }

        await updateUserData(currentUser!.id, {
            favoriteUserIds: Array.from(favoriteUserIds)
        });
    };

    const getCurrentUserFaction = () => {
        return currentUser?.faction;
    };

    const visibleUsers = isGod ? userList : activeUsers;

    return {
        login,
        logout,
        retrieveLoginData,
        fetchCurrentUser,
        isGod,
        isModerator,
        updateUserData,
        currentUser,
        saveLoginData,
        getAnonymizedHandle,
        canAnonymizeChatHandle,
        getBasicUserDataById,
        getUserById,
        getUserByName,
        getHandleForConvo,
        toggleUserAsFavorite,
        isInfluencer,
        getCurrentUserFaction,
        visibleUsers,
        fetchAllUsers
    };
}
