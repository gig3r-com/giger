import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { Controls } from '../../shared/components/controls/controls';
import { BigButton } from '../../shared/components/big-button/big-button';
import { standardTimingFunction } from '../../shared/constants';
import { MyIdNavigation } from './my-id-navigation';
import { Contacts } from './contacts/contacts';
import { Neotribe } from './neotribe/neotribe';
import { CharSummary } from './char-summary/char-summary';
import { IUser } from '../../models/user';
import { EventRecord } from './medical/event-record';
import { useUserService } from '../../shared/services/user.service';
import { EventRecordType } from '../../models/events';
import { Relations } from './relations/relations';
import { Goals } from './goals/goals';
import { Meta } from './meta/meta';

import './my-id.scss';

export const MyId: FC = () => {
    const intl = useIntl();
    const { currentUser } = useUserService();
    const [userToShow, setUserToShow] = useState<IUser>();
    // const { userId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(function setUserOnMount() {
        setUserToShow(currentUser);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // console.log('userToShow', userToShow, userId);
    // const isCurrentUser = true;
    // const showSummary = userToShow && true;
    const buttons = (
        <div className="my-id__buttons">
            <BigButton
                className="my-id__all-info"
                text={intl.formatMessage({ id: 'SEE_ALL_THE_INFO' })}
                color="primary"
                onClick={() => navigate('/myid/details')}
            />
            {/* <BigButton className="my-id__msg" text="message" color="primary" onClick={() => {}} />
                <BigButton className="my-id__notes" text="notes" color="primary" onClick={() => {}} />
                <BigButton className="my-id__follow" text="follow" color="primary" onClick={() => {}} /> */}
        </div>
    );

    const navigationActive = useMemo(
        () => location.pathname === '/myid/details',
        [location.pathname]
    );
    const wrapperClassnames = classNames({
        'my-id__content': true
    });

    const contentMotionProps = {
        initial: { x: '-100vw' },
        animate: { x: '0' },
        exit: { x: '-100vw' },
        transition: {
            ease: standardTimingFunction,
            duration: 0.6
        }
    };

    const content = useMemo(() => {
        let result: JSX.Element | null = null;
        switch (location.pathname) {
            case '/myid/details':
                result = (
                    <motion.div
                        key={location.pathname}
                        {...contentMotionProps}
                        initial={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            x: '100vw'
                        }}
                        exit={{ x: '100vw' }}
                    >
                        <MyIdNavigation
                            active={navigationActive}
                            onItemClick={(item) => navigate(`/myid/${item}`)}
                        />
                    </motion.div>
                );
                break;
            case '/myid/contacts':
                result = (
                    <motion.div key={location.pathname} {...contentMotionProps}>
                        <Contacts />
                    </motion.div>
                );
                break;
            case '/myid/neotribe':
                result = userToShow ? (
                    <motion.div key={location.pathname} {...contentMotionProps}>
                        <Neotribe user={userToShow} />
                    </motion.div>
                ) : null;
                break;
            case '/myid/medical':
                result = userToShow ? (
                    <motion.div key={location.pathname} {...contentMotionProps}>
                        <EventRecord type={EventRecordType.MEDICAL} />
                    </motion.div>
                ) : null;
                break;
            case '/myid/criminal':
                result = userToShow ? (
                    <motion.div key={location.pathname} {...contentMotionProps}>
                        <EventRecord type={EventRecordType.CRIMINAL} />
                    </motion.div>
                ) : null;
                break;
            case '/myid/relations':
                result = userToShow ? (
                    <motion.div key={location.pathname} {...contentMotionProps}>
                        <Relations />
                    </motion.div>
                ) : null;
                break;
            case '/myid/goals':
                result = userToShow ? (
                    <motion.div key={location.pathname} {...contentMotionProps}>
                        <Goals />
                    </motion.div>
                ) : null;
                break;
            case '/myid/hacking':
            case '/myid/meta':
                result = userToShow ? (
                    <motion.div key={location.pathname} {...contentMotionProps}>
                        <Meta />
                    </motion.div>
                ) : null;
                break;
            default:
                result = (
                    <motion.div key={location.pathname} {...contentMotionProps}>
                        {currentUser && <CharSummary user={currentUser} />}
                        {buttons}
                    </motion.div>
                );
        }
        return result;
    }, [location.pathname, currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="my-id">
            <section className={wrapperClassnames}>
                <Controls leftSideOption="back" />
                <AnimatePresence>{content}</AnimatePresence>
            </section>
        </section>
    );
};
