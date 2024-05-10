import { FC, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { Controls } from '../../shared/components/controls/controls';
import { BigButton } from '../../shared/components/big-button/big-button';
import { CharSummary } from './char-summary/char-summary';
import { useUserService } from '../../shared/services/user.service';

import './my-id.scss';
import './my-id-global.scss';

export const MyId: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const navHook = useRef<HTMLElement>(null);
    const { currentUser } = useUserService();
    const location = useLocation();
    const wrapperClassnames = classNames({
        'my-id__content': true
    });
    return (
        <motion.section className="my-id">
            {location.pathname !== '/myid' && (
                <Controls leftSideOption="back" />
            )}
            <section className={wrapperClassnames} ref={navHook}>
                {location.pathname === '/myid' && (
                    <motion.div key="my.id">
                        {currentUser && <CharSummary mode="private" />}
                        <div className="my-id__buttons">
                            <BigButton
                                className="my-id__all-info"
                                text={intl.formatMessage({
                                    id: 'SEE_ALL_THE_INFO'
                                })}
                                color="primary"
                                onClick={() => navigate('/myid/details')}
                            />
                        </div>
                    </motion.div>
                )}
            </section>
            <Outlet />
        </motion.section>
    );
};
