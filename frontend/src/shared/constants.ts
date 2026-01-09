import { Variants, cubicBezier } from 'framer-motion';

export const standardTimingFunction = cubicBezier(0.16, 1, 0.3, 1);

export const MOTION_VARIANTS: Variants = {
    initial: ({ direction }: { direction: 'forward' | 'backward' }) => ({
        x: direction === 'backward' ? '-100%' : '100%',
        transition: {
            type: 'spring',
            duration: 0.3,
            delay: 0
        }
    }),
    in: {
        x: 0,
        transition: {
            type: 'spring',
            duration: 0.3,
            delay: 0
        }
    },
    out: ({ direction }: { direction: 'forward' | 'backward' }) => ({
        x: direction === 'backward' ? '100%' : '-100%',
        transition: {
            type: 'spring',
            duration: 0.3,
            delay: 0
        }
    })
};
