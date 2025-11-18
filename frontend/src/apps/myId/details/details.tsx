import { FC, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { MyIdNavigation } from '../my-id-navigation';

import '../my-id-global.scss';

export const Details: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const navHook = useRef<HTMLDivElement>(null);

    return (
        <div className="navigation-hook" key={location.pathname}>
            <div className="navigation-hook" ref={navHook}>
                {location.pathname === '/myid/details' && (
                    <MyIdNavigation
                        onItemClick={(item) =>
                            navigate(`/myid/details/${item}`)
                        }
                    />
                )}
            </div>
            <Outlet />
        </div>
    );
};
