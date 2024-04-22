import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useUserService } from '../../../shared/services/user.service';
import { selectActiveUsers } from '../../../store/users.selectors';
import { setCurrentUser } from '../../../store/users.slice';

import './select-user.scss';

export const SelectUser: FC<{ showSelectionAtStart?: boolean }> = ({
    showSelectionAtStart
}) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLSelectElement>(null);
    const { isGod, getUserById, saveLoginData } = useUserService();
    const users = useSelector(selectActiveUsers);
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
            {isGod && (
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
                        value={''}
                        onChange={(event) => onSelection(event.target.value)}
                    >
                        <option disabled hidden value={''}><FormattedMessage id="SELECT_USER" /></option>
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
