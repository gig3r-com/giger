import { useMemo } from 'react';
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import { IUserPrivate } from '../../models/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken, setAuthToken } from '../../store/auth.slice';

export function useApiService() {
    const dispatch = useDispatch();
    const token = useSelector(selectAuthToken);
    const endpointBase =
        import.meta.env.VITE_API_ENDPOINT ?? `${window.origin}/api/`;

    const loginCall = async (
        username: string,
        password: string
    ): Promise<IUserPrivate> => {
        const authToken = await wretch(endpointBase, {
            mode: 'cors'
        })
            .get(`Login/giger?userName=${username}&password=${password}`)
            .res((r) => r.text());

        localStorage.setItem('authToken', authToken);
        dispatch(setAuthToken(authToken));

        return wretch(endpointBase, {
            mode: 'cors'
        })
            .headers({ AuthToken: authToken as string })
            .get(`User/private/byUsername?userName=${username}`)
            .json<IUserPrivate>();
    };

    const logout = (userName: string) => {
        api.query({ userName })
            .get('Login/giger/logout')
            .res()
            .then(() => {
                localStorage.removeItem('authToken');
                localStorage.removeItem('loggedInUser');
                dispatch(setAuthToken(null));
                window.location.reload();
            });
    };

    const api = useMemo(() => {
        const updatedInstance = wretch(endpointBase, {
            mode: 'cors'
        })
            .headers({ AuthToken: token as string })
            .addon(QueryStringAddon);
        return updatedInstance;
    }, [token, endpointBase]);

    return { loginCall, logout, api };
}
