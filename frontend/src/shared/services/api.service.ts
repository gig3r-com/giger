import { useMemo, useState } from 'react';
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import { IUserPrivate } from '../../models/user';

export function useApiService() {
    const [token, setToken] = useState(
        localStorage.getItem('authToken') ?? null
    );
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
        setToken(authToken);

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
                setToken(null);
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
    }, [token]);

    return { loginCall, logout, api };
}
