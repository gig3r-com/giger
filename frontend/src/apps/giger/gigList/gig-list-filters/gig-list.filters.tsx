import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Hexagon } from '../hexagon/hexagon';
import { GigCategoryNames, GigModes } from '../../../../models/gig';
import { categoriesByRows } from '../../categories';
import { BigButton } from '../../../../shared/components/big-button/big-button';
import { IGigListFiltersProps } from './gig-list-filters.model';
import { RootState } from '../../../../store/store';
import { setCategories, setMode } from '../../../../store/gigs.slice';
import { Controls } from '../../../../shared/components/controls/controls';

import './gig-list-filters.scss';

export const GigListFilters: FC<IGigListFiltersProps> = ({
    toggleMenuState,
    active
}) => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const currentCategories = useSelector(
        (state: RootState) => state.gigs.selectedCategories
    );
    const currentMode = useSelector(
        (state: RootState) => state.gigs.selectedMode
    );
    const [gigMode, setGigMode] = useState<GigModes | 'all'>(currentMode);
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
        dispatch(setMode(gigMode as GigModes | 'all'));
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

            <select
                className="gig-list-filters__mode-select"
                value={gigMode}
                onChange={(e) => setGigMode(e.target.value as GigModes | 'all')}
            >
                <option value="all">
                    <FormattedMessage id="ALL" />
                </option>
                <option value={GigModes.CLIENT}>
                    <FormattedMessage id="CLIENT" />
                </option>
                <option value={GigModes.PROVIDER}>
                    <FormattedMessage id="PROVIDER" />
                </option>
            </select>
            <div className="gig-list-filters__body">
                {categoriesByRows.map((categoryRow, index) => (
                    <div
                        className="gig-list-filters__filter-row"
                        key={`catRow${index}`}
                    >
                        {categoryRow.map((category, catIndex) => (
                            <AnimatePresence key={category}>
                                <Hexagon
                                    select={selectCategory}
                                    category={category}
                                    delayMultiplier={catIndex}
                                    isSelected={newSelectedCategories.has(category)}
                                />
                            </AnimatePresence>
                        ))}
                    </div>
                ))}
                <BigButton text="SAVE" onClick={save} color="primary" />
            </div>
        </section>
    );
};
