import { FC, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Controls } from '../../../shared/components/controls/controls';
import { SectionBody } from '../../../shared/components/section-body/section-body';
import { MyIdNavigation } from '../my-id-navigation';

import '../my-id-global.scss';

export const Details: FC = () => {
    const navigate = useNavigate();
    const navHook = useRef<HTMLDivElement>(null);

    return (
        <SectionBody>
            <Controls leftSideOption="back" />
            <div className="navigation-hook">
                <div className="navigation-hook" ref={navHook}>
                    <MyIdNavigation
                        active={true}
                        onItemClick={(item) =>
                            navigate(`/myid/details/${item}`)
                        }
                    />
                </div>
            </div>
        </SectionBody>
    );
};
