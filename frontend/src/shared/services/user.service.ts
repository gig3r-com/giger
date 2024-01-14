import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { v4 } from 'uuid';
import { users } from '../../mocks/users';
import { setCurrentUser, setUser } from '../../store/users.slice';
import { IUser, UserRoles } from '../../models/user';
import { RootState } from '../../store/store';

/**
 * TODO: Connect to backend once it exists
 */
export function useUserService() {
    const dispatch = useDispatch();
    const currentUserId = useSelector(
        (state: RootState) => state.users.currentUserId
    );
    const userList = useSelector((state: RootState) => state.users.users);
    const currentUser = useSelector((state: RootState) =>
        state.users.users.find((user) => user.id === currentUserId)
    );
    const isAdmin = useMemo(() => {
        return !!currentUser?.roles?.includes(UserRoles.ADMIN);
    }, [currentUser]);

    /**
     * completely mocked now, obviously the password test will take place on backend
     */
    const login = async (username: string, password: string) =>
        new Promise<void>((resolve, reject) => {
            if (password === 'test' && username === 'test') {
                console.log(`logging in ${username} with password ${password}`);

                setTimeout(() => {
                    dispatch(setCurrentUser(users[35].id));
                    saveLoginData(users[35]);
                    resolve();
                }, 3000);
            } else if (username === 'admin' && password === 'admin') {
                console.log(`logging in ${username} with password ${password}`);
                setTimeout(() => {
                    dispatch(setCurrentUser(users[36].id));
                    saveLoginData(users[36]);
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

    const saveLoginData = (userData: IUser) => {
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
    };

    const retrieveLoginData = (): void => {
        const userData = localStorage.getItem('loggedInUser');

        if (userData) {
            dispatch(setCurrentUser(JSON.parse(userData).id));
        }
    };

    const logout = (): void => {
        localStorage.removeItem('loggedInUser');
        dispatch(setCurrentUser(undefined));
    };

    const updateUserData = (userId: string, userData: Partial<IUser>) => {
        const user = users.find((user) => user.id === userId);

        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }

        const updatedData: IUser = {
            ...user,
            ...userData
        };
        dispatch(setUser({ ...updatedData }));
    };

    const canAnonymizeChatHandle = () => {
        return currentUser && currentUser.hackingSkill >= 1 || isAdmin;
    }

    const getAnonymizedHandle = () => {
        const rand = v4().split('-');
        return [rand[0], rand[1]].join('');
    }

    const getUserById = (id: string) => {
        return userList.find((user) => user.id === id);
    }

    const getHandleForConvo = (convoId: string, userId: string) => {
        const user = getUserById(userId);

        return user?.aliasMap[convoId] ?? user?.handle;
    }

    return {
        login,
        logout,
        retrieveLoginData,
        isAdmin,
        updateUserData,
        currentUser,
        getAnonymizedHandle,
        canAnonymizeChatHandle,
        getUserById,
        getHandleForConvo
    };
}
