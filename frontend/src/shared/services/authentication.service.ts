import { useDispatch } from 'react-redux';
import { users } from '../../mocks/users';
import { setCurrentUser } from '../../store/users.slice';
import { IUser } from '../../models/user';

/**
 * TODO: Connect to backend once it exists
 */
export function useAuthenticationService() {
    const dispatch = useDispatch();

    /**
     * completely mocked now, obviously the password test will take place on backend
     */
    const login = async (username: string, password: string) =>
        new Promise<void>((resolve, reject) => {
            if (password === 'test') {
                console.log(`logging in ${username} with password ${password}`);

                setTimeout(() => {
                    dispatch(setCurrentUser(users[35]));
                    saveLoginData(users[35]);
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
            dispatch(setCurrentUser(JSON.parse(userData)));
        }
    };

    return { login, retrieveLoginData };
}
