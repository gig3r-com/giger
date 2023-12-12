import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, 
    // useParams
 } from 'react-router';
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { RootState } from "../../store/store";
import { Controls } from '../../shared/components/controls/controls';
import { BigButton } from '../../shared/components/big-button/big-button';
import { standardTimingFunction } from '../../shared/constants';
import { MyIdNavigation } from './my-id-navigation';
import { Contacts } from './contacts/contacts';
import { Neotribe } from './neotribe/neotribe';
import { CharSummary } from './char-summary/char-summary';
import { IUser } from '../../models/user';
import './my-id.scss';


export const MyId: FC = () => {
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
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
                text="see all the info"
                color="primary"
                onClick={() => navigate('/myid/details')}
            />
            {/* <BigButton className="my-id__msg" text="message" color="primary" onClick={() => {}} />
                <BigButton className="my-id__notes" text="notes" color="primary" onClick={() => {}} />
                <BigButton className="my-id__follow" text="follow" color="primary" onClick={() => {}} /> */}
        </div>
    );

    const navigationActive = useMemo(() => location.pathname === '/myid/details', [location.pathname]);
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
                        <MyIdNavigation active={navigationActive} onItemClick={(item) => navigate(`/myid/${item}`)} />
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
            case '/myid/criminal':
            case '/myid/goals':
            case '/myid/hacking':
            case '/myid/meta':
                result = <div>not implemented</div>;
                break;
            default:
                result = (
                    <motion.div key={location.pathname} {...contentMotionProps}>
                        {userToShow && <CharSummary user={userToShow} />}
                        {buttons}
                    </motion.div>
                );
        }
        return result;
    }, [location.pathname, userToShow]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="my-id">
            <section className={wrapperClassnames}>
                <Controls leftSideOption="back" />
                <AnimatePresence>{content}</AnimatePresence>
            </section>
        </section>
    );
};
