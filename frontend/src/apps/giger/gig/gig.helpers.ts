import { useIntl } from 'react-intl';
import { GigStatus } from '../../../models/gig';

export function useGigHelpers() {
    const intl = useIntl();
    const buttonColor = (status: GigStatus) => {
        let statusColor: 'primary' | 'secondary' | 'accent';
        switch (status) {
            case GigStatus.AVAILABLE:
                statusColor = 'primary';
                break;
            case GigStatus.IN_PROGRESS:
                statusColor = 'secondary';
                break;
            case GigStatus.COMPLETED:
                statusColor = 'accent';
                break;
            case GigStatus.PENDING:
                statusColor = 'accent';
                break;
        }

        return statusColor;
    };

    const buttonText = (status: GigStatus) => {
        switch (status) {
            case GigStatus.PENDING:
                return intl.formatMessage({ id: 'PENDING' });
            case GigStatus.AVAILABLE:
                return intl.formatMessage({ id: 'ACCEPT_GIG' });
            case GigStatus.IN_PROGRESS:
                return intl.formatMessage({ id: 'MARK_AS_DONE' });
            case GigStatus.COMPLETED:
                return 'VIEW GIG';
        }
    };

    return {
        buttonColor,
        buttonText
    };
}
