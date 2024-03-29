import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUserService } from '../../../shared/services/user.service';
import { RootState } from '../../../store/store';
import { setCurrentUser } from '../../../store/users.slice';

import './select-user.scss';

export const SelectUser: FC<{ showSelectionAtStart?: boolean }> = ({
    showSelectionAtStart
}) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLSelectElement>(null);
    const { isAdmin, getUserById, saveLoginData } = useUserService();
    const users = useSelector((state: RootState) => state.users.users);
    const [showSelection, setShowSelection] = useState(false);

    const onSelection = async (userId: string) => {
        const user = await getUserById(userId, 'private');
        dispatch(setCurrentUser(user!));
        saveLoginData(user);
    };

    useEffect(function detectOutsideClick() {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShowSelection(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            {isAdmin && (
                <div
                    className="select-user material-icons material-symbols-outlined"
                    onClick={() => setShowSelection(true)}
                >
                    expand_circle_down
                </div>
            )}

            {(showSelection || showSelectionAtStart) && (
                <div className="select-user__modal">
                    <select
                        ref={ref}
                        className="select-user__select"
                        onChange={(event) => onSelection(event.target.value)}
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.handle}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </>
    );
};
