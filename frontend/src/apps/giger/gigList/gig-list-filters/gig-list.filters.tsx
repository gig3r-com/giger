import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Hexagon } from '../hexagon/hexagon';
import { GigCategoryNames } from '../../../../models/gig';
import { categoriesByRows } from '../../categories';
import { BigButton } from '../../../../shared/big-button/big-button';
import { IGigListFiltersProps } from './gig-list-filters.model';

import './gig-list-filters.scss';
import classNames from 'classnames';

// import { ShaderPrecision } from '../../shared/shader-bg/shader.types';
// import { ShaderBG } from '../../shared/shader-bg/shaderBg';
// import { blackFlower } from '../../shared/shader-bg/shaders/blackFlower/blackFlower';

export const GigListFilters: FC<IGigListFiltersProps> = ({
    onFiltersUpdate,
    toggleMenuState,
    active
}) => {
    const [previousSelectedCategories, setPreviousSelectedCategories] =
        useState<Set<GigCategoryNames>>(new Set());
    const [selectedCategories, setSelectedCategories] = useState<
        Set<GigCategoryNames>
    >(new Set());

    const selectCategory = (category: GigCategoryNames) => {
        if (selectedCategories.has(category)) {
            setSelectedCategories((prevSet) => {
                const newSet = new Set(prevSet);
                newSet.delete(category);
                return newSet;
            });
        } else {
            setSelectedCategories((prevSet) => new Set([...prevSet, category]));
        }
    };

    const cancel = () => {
        toggleMenuState();
        setSelectedCategories(previousSelectedCategories);
    };

    const save = () => {
        setPreviousSelectedCategories(selectedCategories);
        onFiltersUpdate(selectedCategories);
        toggleMenuState();
    };

    const filtersClasses = classNames({
        'gig-list-filters': true,
        'gig-list-filters--active': active
    });

    return (
        <section className={filtersClasses}>
            <header className="gig-list-filters__controls">
                <span className="gig-list-filters__cancel" onClick={cancel}>
                    CANCEL
                </span>
            </header>
            
            <div className="gig-list-filters__body">
                {categoriesByRows.map((categoryRow, index) => (
                    <div
                        className="gig-list-filters__filter-row"
                        key={`catRow${index}`}
                    >
                        {categoryRow.map((category, catIndex) => (
                            <AnimatePresence key={category}>
                                <Hexagon
                                    //selected={selectedCategories.has(category)}
                                    select={selectCategory}
                                    category={category}
                                    delayMultiplier={catIndex}
                                />
                            </AnimatePresence>
                        ))}
                    </div>
                ))}
            </div>

            <BigButton text="SAVE" onClick={save} />
        </section>
    );
};
