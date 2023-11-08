import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
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
    const { fetchGigs } = useGigsService();
    const gigs = useSelector((state: RootState) => state.gigs.gigs);
    const selectedCategories = useSelector(
        (state: RootState) => state.gigs.selectedCategories
    );
    const [filteredGigs, setFilteredGigs] = useState<IGig[]>(gigs);
    const [menuState, setMenuState] = useState<'list' | 'filters' | 'newGig'>(
        'list'
    );

    useEffect(function mountSetup() {
        fetchGigs();
    }, []);

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
        </article>
    );
};
