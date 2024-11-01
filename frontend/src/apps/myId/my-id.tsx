import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
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
    const wrapperClassnames = classNames({
        'my-id__content': true
    });

    useEffect(function checkNewRecords() {
        
    }, [])

    return (
        <motion.section className="my-id">
            <section className={wrapperClassnames} ref={navHook}>
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
            </section>
        </motion.section>
    );
};
