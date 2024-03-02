import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router';
import { GigStatus, IGig } from '../../../models/gig';
import { useUserService } from '../../../shared/services/user.service';

export function useGigHelpers() {
    const intl = useIntl();
    const { currentUser } = useUserService();
    const { gigId } = useParams();
    const navigate = useNavigate();
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
            case GigStatus.DISPUTE:
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
            case GigStatus.DISPUTE:
                return intl.formatMessage({ id: 'DISPUTED' });
            case GigStatus.COMPLETED:
                return intl.formatMessage({ id: 'VIEW GIG' });
        }
    };

    const gigClassname = (gig: IGig) =>
        classNames({
            gig: true,
            'gig--completed': gig.status === GigStatus.COMPLETED,
            'gig--in-progress': gig.status === GigStatus.IN_PROGRESS,
            'gig--available': gig.status === GigStatus.AVAILABLE,
            'gig--selected': gigId === gig.id,
            'gig--other-selected': gigId !== gig.id && gigId !== undefined,
            'gig--mine': gig.authorId === currentUser?.id
        });

    const gigSummaryClassName = (gig: IGig) =>
        classNames({
            gig__summary: true,
            'gig__summary--completed': gig.status === GigStatus.COMPLETED,
            'gig__summary--in-progress': gig.status === GigStatus.IN_PROGRESS,
            'gig__summary--available': gig.status === GigStatus.AVAILABLE,
            'gig__summary--dispute': gig.status === GigStatus.DISPUTE,
            'gig__summary--mine': gig.authorId === currentUser?.id
        });

    const secondButtonText = (gigTaken: boolean) => {
        if (gigTaken) {
            return intl.formatMessage({ id: 'EDIT' });
        } else {
            return intl.formatMessage({ id: 'REPORT_A_PROBLEM' });
        }
    };

    const secondButtonAction = (gigTaken: boolean) => () => {
        if (gigTaken) {
            console.error('Not implemented');
        } else {
            navigate(`/report-problem?gigId=${gigId}`, { replace: true });
        }
    };

    return {
        buttonColor,
        buttonText,
        gigClassname,
        gigSummaryClassName,
        secondButtonText,
        secondButtonAction
    };
}
