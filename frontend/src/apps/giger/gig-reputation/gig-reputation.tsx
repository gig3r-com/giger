import { FC } from 'react';
import classNames from 'classnames';

import './gig-reputation.scss';

const GigReputation: FC<{
    reputation: 0 | 1 | 2 | 3 | 4 | 5;
    color: string;
}> = ({ reputation, color }) => {
    const classes = (index: number, reputation: number) => classNames({
        'gig-reputation__bar': true,
        [`gig-reputation__bar--${color}`]: true,
        [`gig-reputation__bar--${index < reputation ? 'filled' : 'empty'}`]: true
    })

    const bars = Array.from({ length: 6 }, (_, index) => (
        <div
            key={index}
            className={classes(index, reputation)}
        />
    )).reverse();

    return <div className="gig-reputation">{bars}</div>;
};

export default GigReputation;
