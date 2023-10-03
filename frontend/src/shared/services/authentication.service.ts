import { users } from "../../mocks/users";
import { IUser } from "../../models/user";

/**
 * TODO: Connect to backend once it exists
 */
export function useAuthenticationService() {
    const currentUser: () => IUser = () => {
        return users[35];
    }

    return { currentUser }
}
