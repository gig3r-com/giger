import { motion } from 'framer-motion';
import { FC } from 'react';
import { MOTION_VARIANTS } from '../../../constants';

import './page.scss';

export const Page: FC<{
    children?: JSX.Element | JSX.Element[];
}> = ({ children }) => {
    return (
        <motion.div
            className="page"
            custom={{ direction: 'forward' }}
            initial="initial"
            animate="in"
            exit="out"
            variants={MOTION_VARIANTS}
            style={{
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                boxSizing: 'border-box',
                padding: '1rem'
            }}
        >
            <>{children}</>
        </motion.div>
    );
};
