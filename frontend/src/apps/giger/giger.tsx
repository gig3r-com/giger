import './giger.scss';
import { GigCategoryNames, IGig } from '../../models/gig';
import { useState } from 'react';
import { GigList } from './gigList/gigList';
import { mockGigs } from '../../mocks/gigs';
import { GigListFilters } from './gigList/gig-list-filters/gig-list.filters';
// import { ShaderPrecision } from '../../shared/shader-bg/shader.types';
// import { ShaderBG } from '../../shared/shader-bg/shaderBg';
// import { blackFlower } from '../../shared/shader-bg/shaders/blackFlower/blackFlower';

export const Giger = () => {
    const [menuState, setMenuState] = useState<'list' | 'filters'>('list');
    const [filteredGigs, setFilteredGigs] = useState<IGig[]>(mockGigs);

    const onFiltersUpdate = (categories: Set<GigCategoryNames>) => {
        const filteredList = mockGigs.filter((gig) =>
            categories.has(gig.category)
        );
        setFilteredGigs(categories.size === 0 ? mockGigs : filteredList);
    };

    const toggleMenuState = () => {
        setMenuState(menuState === 'filters' ? 'list' : 'filters');
    };

    return (
        <article className="giger">
            <GigList
                gigs={filteredGigs}
                toggleMenuState={toggleMenuState}
            />
            <GigListFilters
                onFiltersUpdate={onFiltersUpdate}
                toggleMenuState={toggleMenuState}
                active={menuState === 'filters'}
            />
        </article>
    );
};
