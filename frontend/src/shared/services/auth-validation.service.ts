import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken, setAuthToken } from '../../store/auth.slice';
import { setCurrentUser } from '../../store/users.slice';
import { useApiService } from './api.service';

export function useAuthValidation() {
    const dispatch = useDispatch();
    const token = useSelector(selectAuthToken);
    const { validateToken, api } = useApiService();

    useEffect(() => {
        const checkAuth = async () => {
            // Get token from localStorage if not in Redux
            const storedToken = localStorage.getItem('authToken');
            const tokenToValidate = token || storedToken;

            if (!tokenToValidate) {
                // No token, user not logged in
                return;
            }

            // Validate token with backend
            const result = await validateToken(tokenToValidate);

            if (!result.valid) {
                // Token is invalid, clear everything
                console.warn('Invalid auth token detected, clearing session');
                localStorage.removeItem('authToken');
                localStorage.removeItem('loggedInUser');
                dispatch(setAuthToken(null));
                dispatch(setCurrentUser(undefined));
                
                // Redirect to login if not already there
                if (window.location.pathname !== '/') {
                    window.location.href = '/';
                }
            } else if (result.username) {
                // Token is valid, ensure Redux store is updated
                if (!token && storedToken) {
                    dispatch(setAuthToken(storedToken));
                }

                // Load user data if not already loaded
                const storedUser = localStorage.getItem('loggedInUser');
                if (storedUser) {
                    try {
                        const userData = JSON.parse(storedUser);
                        dispatch(setCurrentUser(userData as any));
                    } catch (error) {
                        console.error('Error parsing stored user data:', error);
                    }
                } else {
                    // Fetch user data from backend
                    try {
                        const userData = await api
                            .get(`User/simple/byUsername?userName=${result.username}`)
                            .json();
                        dispatch(setCurrentUser(userData as any));
                        localStorage.setItem('loggedInUser', JSON.stringify(userData));
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                    }
                }
            }
        };

        checkAuth();
    }, []); // Run once on mount
}
