import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { users } from '../../mocks/users';
import { setCurrentUser, setUser } from '../../store/users.slice';
import { IUser, UserRoles } from '../../models/user';
import { RootState } from '../../store/store';
import { mockMedicalHistory } from '../../mocks/medical';
import { IMedHistory } from '../../models/medical';

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
        return currentUser?.roles?.includes(UserRoles.ADMIN);
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

        if (!isAdmin) {
            throw new Error('Only admins can update user data');
        }

        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }

        const updatedData: IUser = {
            ...user,
            ...userData
        };
        dispatch(setUser({ ...updatedData }));
    };

    const getMedicalHistoryForUser = (userId: string) =>
        new Promise<IMedHistory>((resolve, reject) => {
            const user = userList.find((user) => user.id === userId);

            if (!user) {
                reject('User not found');
            }

            resolve(user?.medical || mockMedicalHistory);
        });

    return {
        login,
        logout,
        retrieveLoginData,
        isAdmin,
        updateUserData,
        currentUser,
        getMedicalHistoryForUser
    };
}
