import { FC } from 'react';
import { IGig } from '../../../models/gig';

import './complaint-details.scss';

export const ComplaintDetails: FC<{ gig: IGig }> = ({ gig }) => {
    return (
        <div className="complaint-details">
            <span className="complaint-deatils__entry">{gig.createdAt}</span>
            <span className="complaint-deatils__entry">{gig.category}</span>
            <span className="complaint-deatils__entry">{gig.description}</span>
            <span className="complaint-deatils__entry">{gig.payout}</span>
            <span className="complaint-deatils__entry">{gig.acceptedAt}</span>
            <span className="complaint-deatils__entry">
                {gig.markedAsComplaintAt}
            </span>
        </div>
    );
};
