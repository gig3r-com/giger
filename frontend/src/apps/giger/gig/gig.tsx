import classNames from 'classnames';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import { FC } from 'react';
import { GigStatus } from '../../../models/gig';
import { IGigProps } from './gig.model';

import './gig.scss';
import { BigButton } from '../../../shared/big-button/big-button';

export const Gig: FC<IGigProps> = ({ gig, selectedId, setSelected }) => {
    const gigClassname = classNames({
        gig: true,
        'gig--selected': selectedId === gig.id,
        'gig--other-selected': selectedId !== gig.id && selectedId !== undefined
    });

    const gigSummaryClassName = classNames({
        gig__summary: true,
        'gig__summary--completed': gig.status === GigStatus.COMPLETED,
        'gig__summary--in-progress': gig.status === GigStatus.IN_PROGRESS,
        'gig__summary--available': gig.status === GigStatus.AVAILABLE
    });

    return (
        <AnimatePresence>
            <motion.li className={gigClassname}>
                <div
                    className={gigSummaryClassName}
                    onClick={() => setSelected(gig)}
                    key={gig.id}
                    // //initial={{ opacity: 0, height: 0 }}
                    // animate={{ opacity: 1, height: 'auto' }}
                    // exit={{ opacity: 0, height: 0 }}
                    // transition={{
                    //     delay: delayMultiplier * 0.1,
                    //     ease: cubicBezier(0.16, 1, 0.3, 1)
                    // }}
                >
                    <h3 className="gig__title">{gig.title}</h3>
                    <span className="gig__payout">{gig.payout} ¤</span>
                    <span className="gig__reputation">
                        {gig.reputationRequired}★
                    </span>
                </div>

                <AnimatePresence>
                    {selectedId === gig.id && (
                        <motion.article
                            className="gig_details"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                                ease: cubicBezier(0.16, 1, 0.3, 1)
                            }}
                        >
                            <BigButton
                                text="ACCEPT GIG"
                                color="primary"
                                onClick={() => console.log('Gig accepted')}
                            />
                            <p className="gig__description">
                                {gig.description}
                            </p>
                            {gig.status === GigStatus.IN_PROGRESS &&
                                gig.messages.map((message) => (
                                    <span className="gig__message">{`${message.date} <${message.sender}> ${message.text}`}</span>
                                ))}
                        </motion.article>
                    )}
                </AnimatePresence>
            </motion.li>
        </AnimatePresence>
    );
};
