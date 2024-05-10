import { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { IControlsProps } from './controls.model';
import { standardTimingFunction } from '../../constants';
import ChevronLeft from '../../../assets/chevron-left-solid.svg?react';

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
    const location = useLocation();
    const navigate = useNavigate();
    const goBack = useCallback(() => {
        const newPath = location.pathname.split('/').slice(0, -1).join('/');
        navigate(newPath);
    }, [location.pathname, navigate]);

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
                    onClick={
                        navigateBack
                            ? () => goBack()
                            : () => onLeftSideClick && onLeftSideClick()
                    }
                >
                    <ChevronLeft />
                    <MemoizedFormattedMessage id="BACK" />
                </motion.span>
            )}
            {rightSideOption && (
                <motion.span
                    {...anim}
                    className="controls__right-side"
                    onClick={onRightSideClick}
                >
                    {rightSideOption}
                </motion.span>
            )}
        </header>
    );
};
