import { motion } from 'framer-motion';
import { FC } from 'react';
import { MOTION_VARIANTS } from '../../../constants';

export const NestedPage: FC<{
    children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
    return (
        <motion.div
            className="nested-page"
            custom={{ direction: 'forward' }}
            initial="initial"
            animate="in"
            exit="out"
            variants={MOTION_VARIANTS}
            style={{ width: '100%', position: 'absolute', top: 50, left: 0, boxSizing: 'border-box', padding: '1rem' }}
        >
            <>{children}</>
        </motion.div>
    );
};
