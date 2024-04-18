import { FC } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { IControlsProps } from './controls.model';
import { standardTimingFunction } from '../../constants';
import { ReactComponent as ChevronLeft } from '../../../assets/chevron-left-solid.svg';

import './controls.scss';

const anim = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: { ease: standardTimingFunction }
};

export const Controls: FC<IControlsProps> = ({
    leftSideOption,
    rightSideOption,
    onLeftSideClick,
    onRightSideClick,
    navigateBack = true
}) => {
    const navigate = useNavigate();

    return (
        <header className="controls">
            {leftSideOption !== 'back' && (
                <motion.span
                    {...anim}
                    className="controls__left-side"
                    onClick={onLeftSideClick}
                >
                    {leftSideOption}
                </motion.span>
            )}
            {leftSideOption === 'back' && (
                <motion.span
                    {...anim}
                    className="controls__back controls__left-side"
                    onClick={navigateBack ? () => navigate('../') : () => onLeftSideClick && onLeftSideClick()}
                >
                    <ChevronLeft />
                    <MemoizedFormattedMessage id="BACK" />
                </motion.span>
            )}
            {rightSideOption && <motion.span
                {...anim}
                className="controls__right-side"
                onClick={onRightSideClick}
            >
                {rightSideOption}
            </motion.span>}
        </header>
    );
};
