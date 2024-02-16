import { FC, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { MyIdNavigation } from '../my-id-navigation';
import { useMyIdPresenceAnimation } from '../myIdPresenceAnimation.service';

import '../my-id-global.scss';

export const Details: FC = () => {
    const location = useLocation();
    const navHook = useRef<HTMLDivElement>(null);
    const { myIdNavigate } = useMyIdPresenceAnimation();

    return (
        <div className="navigation-hook" key={location.pathname}>
            <div className="navigation-hook" ref={navHook}>
                {location.pathname === '/myid/details' && (
                    <MyIdNavigation
                        active={true}
                        onItemClick={(item) =>
                            myIdNavigate(`/myid/details/${item}`, navHook)
                        }
                    />
                )}
            </div>
            <Outlet />
        </div>
    );
};
