import { FC, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { IGig } from '../../models/gig';
import { GigList } from './gigList/gigList';
import { GigListFilters } from './gigList/gig-list-filters/gig-list.filters';
import { NewGig } from './new-gig/new-gig';
import { RootState } from '../../store/store';
import { useGigsService } from '../../shared/services/gigs.service';

import './giger.scss';

export const Giger: FC = () => {
    const location = useLocation();
    const { gigId } = useParams();
    const navigate = useNavigate();
    const { fetchGigs, gigsVisibleToTheUser } = useGigsService();
    const selectedCategories = useSelector(
        (state: RootState) => state.gigs.selectedCategories
    );
    const [filteredGigs, setFilteredGigs] =
        useState<IGig[]>(gigsVisibleToTheUser);
    const [menuState, setMenuState] = useState<'list' | 'filters' | 'newGig'>(
        'list'
    );

    useEffect(function mountSetup() {
        if (filteredGigs.length === 0) {
            fetchGigs();
        }
    }, []);

    const gigs = useMemo(() => gigsVisibleToTheUser, [gigsVisibleToTheUser]);

    useEffect(
        function onFiltersUpdate() {
            const filteredList = gigs.filter((gig) =>
                selectedCategories.includes(gig.category)
            );
            setFilteredGigs(
                selectedCategories.length === 0 ? gigs : filteredList
            );
        },
        [selectedCategories, gigs]
    );

    const toggleMenuState = () => {
        setMenuState(menuState === 'filters' ? 'list' : 'filters');
    };

    useEffect(
        function redirectOnGigNotFound() {
            if (gigId && !gigs.some((gig) => gig.id === gigId)) {
                navigate('/giger');
            }
        },
        [gigId, gigs, navigate]
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
            <GigList gigs={filteredGigs} toggleMenuState={toggleMenuState} />
            <GigListFilters
                toggleMenuState={toggleMenuState}
                active={menuState === 'filters'}
            />
            <NewGig active={menuState === 'newGig'} />
            <Outlet />
        </article>
    );
};
