import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import {
    getUserPublicDataById,
    users
} from '../../mocks/users';
import {
    selectCurrentUser,
    selectIsAdmin,
    setCurrentUser,
    setIsAdmin,
    setRequiresAdminUserSelection,
    setUser,
    updateCurrentUser
} from '../../store/users.slice';
import { IUserBase, IUserPrivate, IUserPublic, UserRoles } from '../../models/user';
import { RootState } from '../../store/store';

/**
 * TODO: Connect to backend once it exists
 */
export function useUserService() {
    const dispatch = useDispatch();
    const userList = useSelector((state: RootState) => state.users.users);
    const currentUser = useSelector(selectCurrentUser);
    const isAdmin = useSelector(selectIsAdmin);

    /**
     * completely mocked now, obviously the password test will take place on backend
     * in case an admin user logs in, we set the requiresAdminUserSelection to true.
     * also we return a token for the admin to use as authentication
     */
    const login = async (username: string, password: string) =>
        new Promise<void>((resolve, reject) => {
            if (password === 'test' && username === 'test') {
                console.log(`logging in ${username} with password ${password}`);

                setTimeout(() => {
                    dispatch(setCurrentUser(users[35]));
                    saveLoginData(users[35]);
                    resolve();
                }, 3000);
            } else if (username === 'admin' && password === 'admin') {
                console.log(`logging in ${username} with password ${password}`);
                setTimeout(() => {
                    dispatch(setRequiresAdminUserSelection(true));
                    dispatch(setIsAdmin(true));
                    saveIsAdmin(true);
                    resolve();
                }, 3000);
            } else {
                console.log(
                    `login failed for ${username} with password ${password}`
                );
                setTimeout(() => {
                    reject('wrong password');
                }, 3000);
            }
        });

    const saveLoginData = (userData: IUserPrivate) => {
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
    };

    const saveIsAdmin = (isAdmin: boolean) => {
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    };

    const retrieveLoginData = (): void => {
        const userData = localStorage.getItem('loggedInUser');
        const isAdmin = localStorage.getItem('isAdmin');

        if (userData) {
            dispatch(setCurrentUser(JSON.parse(userData)));
        }

        if (isAdmin) {
            dispatch(setIsAdmin(JSON.parse(isAdmin)));
        }
    };

    const logout = (): void => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('isAdmin');
        dispatch(setCurrentUser(undefined));
    };

    const updateUserData = async (
        userId: string,
        userData: Partial<IUserPrivate>
    ) => {
        if (!userList.map((user) => user.id).includes(userId)) {
            throw new Error(`User with id ${userId} not found`);
        }

        const updatedData: Partial<IUserPrivate> = {
            ...userData
        };

        if (currentUser?.id === userId) {
            dispatch(updateCurrentUser(updatedData));
        } else {
            dispatch(setUser({ ...updatedData }));
        }
    };

    const canAnonymizeChatHandle = () => {
        return (currentUser && currentUser.hackingSkill >= 1) || isAdmin;
    };

    const getAnonymizedHandle = () => {
        const rand = v4().split('-');
        return [rand[0], rand[1]].join('');
    };

    const isInfluencer = (userId: string) => {
        const user = userList.find((user) => user.id === userId);

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
                return users.find((user) => user.id === userId)!;
            case 'public':
                return getUserPublicDataById(userId);
        }
    }

    const getBasicUserDataById = (userId: string): IUserBase | undefined => {
        return userList.find((user) => user.id === userId);
    };

    const getHandleForConvo = (convoId: string, userId: string) => {
        const user = userList.find((user) => userId === user.id);

        return user?.aliasMap[convoId] ?? user?.handle;
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

    return {
        login,
        logout,
        retrieveLoginData,
        isAdmin,
        updateUserData,
        currentUser,
        saveLoginData,
        getAnonymizedHandle,
        canAnonymizeChatHandle,
        getBasicUserDataById,
        getUserById,
        getHandleForConvo,
        toggleUserAsFavorite,
        isInfluencer
    };
}
