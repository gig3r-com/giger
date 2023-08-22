import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Hexagon } from '../hexagon/hexagon';
import { GigCategoryNames } from '../../../../models/gig';
import { categoriesByRows } from '../../categories';
import { BigButton } from '../../../../shared/components/big-button/big-button';
import { IGigListFiltersProps } from './gig-list-filters.model';
import { RootState } from '../../../../store/store';
import { setCategories } from '../../../../store/gigs.slice';
import { Controls } from '../../../../shared/components/controls/controls';

import './gig-list-filters.scss';
// import { ShaderPrecision } from '../../shared/shader-bg/shader.types';
// import { ShaderBG } from '../../shared/shader-bg/shaderBg';
// import { blackFlower } from '../../shared/shader-bg/shaders/blackFlower/blackFlower';

export const GigListFilters: FC<IGigListFiltersProps> = ({
    toggleMenuState,
    active
}) => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const currentCategories = useSelector(
        (state: RootState) => state.gigs.selectedCategories
    );
    const [newSelectedCategories, setNewSelectedCategories] = useState<
        Set<GigCategoryNames>
    >(new Set(currentCategories));

    const selectCategory = (category: GigCategoryNames) => {
        if (newSelectedCategories.has(category)) {
            setNewSelectedCategories((prevSet) => {
                const newSet = new Set(prevSet);
                newSet.delete(category);
                return newSet;
            });
        } else {
            setNewSelectedCategories(
                (prevSet) => new Set([...prevSet, category])
            );
        }
    };

    const cancel = () => {
        toggleMenuState();
        setNewSelectedCategories(new Set(currentCategories));
    };

    const save = () => {
        dispatch(setCategories([...newSelectedCategories]));
        //setPreviousSelectedCategories(selectedCategories);
        //onFiltersUpdate(selectedCategories);
        toggleMenuState();
    };

    const filtersClasses = classNames({
        'gig-list-filters': true,
        'gig-list-filters--active': active
    });

    return (
        <section className={filtersClasses}>
            <Controls
                rightSideOption={intl.formatMessage({ id: 'CANCEL' })}
                onRightSideClick={cancel}
            />

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
                <BigButton text="SAVE" onClick={save} color='primary' />
            </div>
        </section>
    );
};
