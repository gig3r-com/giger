import React, { useState } from 'react';
import classNames from 'classnames';
import { cubicBezier, motion } from 'framer-motion';
import { IHexagonProps } from './hexagon.model';
import { categories } from '../../categories';

import './hexagon.scss';

export const Hexagon: React.FC<IHexagonProps> = ({
    category,
    select,
    delayMultiplier
}) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected);
        select(category);
    };

    const hexagonShapeClasses = classNames({
        hexagon__border: true,
        'hexagon__border--active': selected
    });

    const hexagonBackgroundClasses = classNames({
        hexagon__background: true,
        'hexagon__background--active': selected
    });

    const hexagonDotsClasses = classNames({
        hexagon__dots: true,
        'hexagon__dots--active': selected
    });

    return (
        <motion.div
            className="hexagon"
            initial={{ opacity: 0, translateY: -25, scale: 1.2 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            transition={{ 
                delay: delayMultiplier * 0.1,
                ease: cubicBezier(0.16, 1, 0.3, 1)
            }}
        >
            <img
                className="hexagon__icon"
                src={categories.find(cat => category === cat.type)!.icon}
                alt={category}
            />
            <svg
                width="113"
                height="114"
                viewBox="0 0 113 114"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g fill="none" fillRule="evenodd" className="hexagon__shape">
                    <path
                        className={hexagonBackgroundClasses}
                        d="m56.5 0 48.93 28.25v56.5L56.5 113 7.57 84.75v-56.5z"
                    />
                    <path
                        className={hexagonShapeClasses}
                        onClick={handleClick}
                        d="m56.5 1.732 47.43 27.384v54.768L56.5 111.268 9.07 83.884V29.116L56.5 1.732z"
                        stroke="#545AE9"
                        strokeWidth="3"
                    />
                    <path
                        className={hexagonDotsClasses}
                        stroke="#545AE9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="0,11"
                        d="M21 23v66M30.5 17.5v79M40 12.25V103M49.5 4.688v108.625M95 24v66M85.5 18.5v79M74 13.25V104M62.5 4.688v108.625"
                    />
                </g>
            </svg>

            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="100%"
                height="113"
                viewBox="0 0 97 110"
            >
                <polygon
                    onClick={handleClick}
                    className={hexagonShapeClasses}
                    points="48.3,5 5,30 5,80 48.3,105 91.6,80 91.6,30"
                ></polygon>
            </svg> */}
        </motion.div>
    );
};
