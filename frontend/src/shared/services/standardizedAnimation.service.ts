import { standardTimingFunction } from '../constants';

export interface IAnimationParams {
    timingFunction?: (t: number) => number;
    delay: number;
}

export type animationType =
    | 'fadeIn'
    | 'expandCollapse'
    | 'horExpand'
    | 'slideInLeft'
    | 'slideInRight'
    | 'slideInTop'
    | 'slideInBottom';

/**
 * A hook that returns a function that generates standardized animations used thorough the app.
 */
export function useStandardizedAnimation() {
    const generateAnimation = (
        animationType: animationType,
        params?: IAnimationParams
    ) => {
        switch (animationType) {
            case 'fadeIn':
                return {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: {
                        ease: params?.timingFunction || standardTimingFunction
                    }
                };
            case 'expandCollapse':
                return {
                    initial: { opacity: 0, height: 0 },
                    animate: { opacity: 1, height: 'auto' },
                    exit: { opacity: 0, height: 0 },
                    transition: {
                        ease: params?.timingFunction || standardTimingFunction
                    }
                };
            case 'horExpand':
                return {
                    initial: { opacity: 0, transform: 'scaleX(0)' },
                    animate: { opacity: 1, transform: 'scaleX(1)' },
                    exit: { opacity: 0, transform: 'scaleX(0)' },
                    transition: {
                        delay: params?.delay || 0,
                        ease: params?.timingFunction || standardTimingFunction
                    }
                };
            case 'slideInLeft':
                return {
                    initial: { x: '-100vw' },
                    animate: { x: '0' },
                    exit: { x: '100vw' },
                    transition: {
                        ease: params?.timingFunction || standardTimingFunction,
                        duration: .3
                    }
                };
            case 'slideInRight':
                return {
                    initial: { x: '100vw' },
                    animate: { x: '0' },
                    exit: { x: '-100vw' },
                    transition: {
                        ease: params?.timingFunction || standardTimingFunction,
                        duration: .3
                    }
                };
            case 'slideInTop':
                return {
                    initial: { y: '-100vh' },
                    animate: { y: '0' },
                    exit: { x: '-100vh' },
                    transition: {
                        ease: params?.timingFunction || standardTimingFunction,
                        duration: .3
                    }
                };
            case 'slideInBottom':
                return {
                    initial: { y: '100vh' },
                    animate: { y: '0' },
                    exit: { x: '100vh' },
                    transition: {
                        ease: params?.timingFunction || standardTimingFunction,
                        duration: .3
                    }
                };
            default:
                return {};
        }
    };

    return { generateAnimation };
}
