import { FC } from 'react';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { IGig } from '../../../models/gig';

import './complaint-details.scss';

export const ComplaintDetails: FC<{ gig: IGig }> = ({ gig }) => {
    return (
        <div className="complaint-details">
            <span className="complaint-deatils__entry">
                <span className="complaint-details__label">
                    <FormattedMessage id="CREATED_AT" />{' '}
                </span>
                {dayjs(gig.createdAt).format('DD/MM HH:mm:ss')}
            </span>
            <span className="complaint-deatils__entry">{gig.acceptedAt}</span>
            <span className="complaint-deatils__entry">
                <span className="complaint-details__label">
                    <FormattedMessage id="CATEGORY" />{' '}
                </span>
                {gig.category}
            </span>
            <span className="complaint-deatils__entry">
                <span className="complaint-details__label">
                    <FormattedMessage id="MARKED_AS_COMPLAINT_AT" />{' '}
                </span>
                {dayjs(gig.markedAsComplaintAt).format('DD/MM HH:mm:ss')}
            </span>
            <span className="complaint-deatils__entry">
                <span className="complaint-details__label">
                    <FormattedMessage id="COMPLAINT_DESCRIPTION" />{' '}
                </span>
                {gig.complaintReason}
            </span>
        </div>
    );
};
