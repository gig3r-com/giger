import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { IGig } from '../../models/gig';
import { GigList } from './gigList/gigList';
import { GigListFilters } from './gigList/gig-list-filters/gig-list.filters';
import { RootState } from '../../store/store';
import { useGigsService } from '../../shared/services/gigs.service';
import './giger.scss';
import { GigForm } from './gig-form/gig-form';

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
    const [menuState, setMenuState] = useState<
        'list' | 'filters' | 'newGig' | 'editGig'
    >('list');

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
            console.log('showNewGigMenu', location.pathname);
            switch (location.pathname) {
                case '/giger/new-gig':
                    setMenuState('newGig');
                    break;
                case '/giger/edit-gig':
                    setMenuState('editGig');
                    break;
                default:
                    setMenuState('list');
                    break;
            }
        },
        [location.pathname]
    );

    const gigFormActive = menuState === 'newGig' || menuState === 'editGig';
    const gigFormMode = menuState === 'newGig' ? 'new' : 'edit';
    const activeGig = useMemo(() => {
        if (location.pathname !== '/giger/edit-gig') return undefined;
        const searchId = new URLSearchParams(location.search).get('gigId');
        return filteredGigs.find(({ id }) => id === searchId); // filterGigs to reduce searching time
    }, [filteredGigs, location.pathname, location.search]);
    return (
        <article className="giger">
            <GigList gigs={filteredGigs} toggleMenuState={toggleMenuState} />
            <GigListFilters
                toggleMenuState={toggleMenuState}
                active={menuState === 'filters'}
            />
            <GigForm
                active={gigFormActive}
                mode={gigFormMode}
                gig={activeGig}
            />
        </article>
    );
};
