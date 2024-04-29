import classNames from 'classnames';
import { useParams } from 'react-router';
import { GigStatus, IGig } from '../../../models/gig';
import { useUserService } from '../../../shared/services/user.service';

export function useGigHelpers() {
    const { currentUser } = useUserService();
    const { gigId } = useParams();
    const buttonColor = (status: GigStatus, isMine: boolean) => {
        let statusColor:
            | 'primary'
            | 'secondary'
            | 'accent'
            | 'accent2'
            | 'muted-accent' = 'primary';

        if (status === GigStatus.EXPIRED || status === GigStatus.COMPLETED) {
            return 'muted-accent';
        }

        if (isMine) {
            return 'accent';
        }

        switch (status) {
            case GigStatus.AVAILABLE:
                statusColor = 'primary';
                break;
            case GigStatus.IN_PROGRESS:
                statusColor = 'secondary';
                break;
            case GigStatus.DISPUTE:
                statusColor = 'accent2';
                break;
            case GigStatus.PENDING_CONFIRMATION:
                statusColor = 'secondary';
                break;
        }

        return statusColor;
    };

    const gigClassname = (gig: IGig) =>
        classNames({
            gig: true,
            'gig--completed': gig.status === GigStatus.COMPLETED,
            'gig--in-progress': gig.status === GigStatus.IN_PROGRESS,
            'gig--available': gig.status === GigStatus.AVAILABLE,
            'gig--dispute': gig.status === GigStatus.DISPUTE,
            'gig--pending': gig.status === GigStatus.PENDING_CONFIRMATION,
            'gig--expired': gig.status === GigStatus.EXPIRED,
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
            'gig__summary--pending':
                gig.status === GigStatus.PENDING_CONFIRMATION,
            'gig__summary--expired': gig.status === GigStatus.EXPIRED,
            'gig__summary--mine': gig.authorId === currentUser?.id
        });

    return {
        buttonColor,
        gigClassname,
        gigSummaryClassName
    };
}
