import wretch from 'wretch';

export function useApiService() {
    const loginCall = async (username: string, password: string) =>
        api
            .get(`Login/giger?username=${username}&password=${password}`)
            .then((authToken: unknown) => {
                localStorage.setItem('authToken', authToken as string);
            });

    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    const api = wretch(import.meta.env.VITE_API_ENDPOINT, { mode: 'cors' })
        .headers({ authToken: getAuthToken() as string })
        .errorType('json')
        .resolve((r) => r.json());

    return { loginCall, api };
}
