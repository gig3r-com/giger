import wretch from 'wretch';

export function useApiService() {
    const loginCall = async (username: string, password: string) =>
        api
            .get(`Login/giger?userName=${username}&password=${password}`).res((r) => r.text())
            .then((authToken) => {
                localStorage.setItem('authToken', authToken);
            });

    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    const api = wretch(import.meta.env.VITE_API_ENDPOINT, {
        mode: 'cors'
    }).headers({ AuthToken: getAuthToken() as string });
    // .errorType('json')
    // .resolve((r) => r.json());

    return { loginCall, api };
}
