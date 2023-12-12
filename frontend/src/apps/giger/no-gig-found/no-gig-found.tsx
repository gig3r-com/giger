import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import notFoundImg from '../../../assets/no-gigs-found.gif';

import './no-gig-found.scss';

export const NoGigFound: FC = () => {
    return (
        <div className="no-gig-found">
            <img
                className="no-gig-found__image"
                src={notFoundImg}
                alt="No gigs found" />
            <h1 className="no-gig-found__title">
                <FormattedMessage id="NO_GIGS_FOUND_TITLE" />
            </h1>
            <p className="no-gig-found__text">
                <FormattedMessage id="NO_GIGS_FOUND_TEXT" />
            </p>
            <span className="no-gig-found__attribution">
                Illustration by
                <a href="https://icons8.com/illustrations/author/eEbrZFlkyZbD">
                    Anna A
                </a>
                from <a href="https://icons8.com/illustrations">Ouch!</a>
            </span>
        </div>
    );
};
