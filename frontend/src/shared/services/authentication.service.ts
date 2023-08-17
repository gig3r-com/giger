import { IUser } from "../../models/user";

/**
 * TODO: Connect to backend once it exists
 */
export function useAuthenticationService() {
    const currentUser: () => IUser = () => {
        return {
            id: '55566ssaa5',
            handle: 'NeonTiger69',
            name: 'Johnny Sasaki'
        }
    }

    return { currentUser }
}
