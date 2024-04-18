import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '../../store/users.slice';
import { RootState } from '../../store/store';

export function useMyIdService() {
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );

    const enterRevealCode = async (code: string): Promise<'success' | 'wrongCode'> => {
        const currentRevealCodes = currentUser?.revealCodes ?? [];

        dispatch(
            updateCurrentUser({
                revealCodes: [...currentRevealCodes, { code, seen: false }]
            })
        );
        console.log(`Reveal code: ${code}`);

        // !MOCK
        if (code === 'TEST') {
            return 'success';
        }
        return 'wrongCode';
    };

    return {
        enterRevealCode
    };
}
