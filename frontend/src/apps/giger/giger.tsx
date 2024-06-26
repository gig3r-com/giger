import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { GigList } from './gigList/gigList';
import { GigListFilters } from './gigList/gig-list-filters/gig-list.filters';
import { NewGig } from './new-gig/new-gig';
import { AnimatePresence } from 'framer-motion';
import { useGigsService } from '../../shared/services/gigs.service';
import { LoadingBar } from '../../shared/components/loading-bar/loading-bar';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectSelectedGig } from '../../store/gigs.selectors';
import { Gig } from './gig/gig';

import './giger.scss';

export const Giger: FC = () => {
    const intl = useIntl();
    const location = useLocation();
    const { gigId } = useParams();
    const navigate = useNavigate();
    const selectedGig = useSelector(selectSelectedGig);
    const [fetchingGigs, setFetchingGigs] = useState(true);
    const { fetchGigs, currentGigs } = useGigsService();
    const [menuState, setMenuState] = useState<'list' | 'filters' | 'newGig'>(
        'list'
    );

    useEffect(function mountSetup() {
        setFetchingGigs(true);
        fetchGigs().then(() => {
            setFetchingGigs(false);
            setFetchingGigs(false);
        });
    }, []);

    const toggleMenuState = () => {
        setMenuState(menuState === 'filters' ? 'list' : 'filters');
    };

    useEffect(
        function redirectOnGigNotFound() {
            if (gigId && !currentGigs.some((gig) => gig.id === gigId)) {
                navigate('/giger');
            }
        },
        [gigId, currentGigs, navigate]
    );

    useEffect(
        function showNewGigMenu() {
            if (location.pathname === '/giger/new-gig') {
                setMenuState('newGig');
            } else {
                setMenuState('list');
            }
        },
        [location.pathname]
    );

    return (
        <article className="giger">
            {fetchingGigs ? (
                <LoadingBar
                    showLogo={false}
                    mode="cycle"
                    isLoading={fetchingGigs}
                    text={intl.formatMessage({ id: 'LOADING' })}
                />
            ) : (
                <>
                    <GigList toggleMenuState={toggleMenuState} />
                    <GigListFilters
                        toggleMenuState={toggleMenuState}
                        active={menuState === 'filters'}
                    />
                    <AnimatePresence>
                        <NewGig active={menuState === 'newGig'} />
                    </AnimatePresence>
                    <AnimatePresence>
                        {selectedGig && (
                            <Gig
                                gig={selectedGig}
                                selectedId={gigId}
                                delayMultiplier={0.2}
                            />
                        )}
                    </AnimatePresence>
                </>
            )}
        </article>
    );
};
