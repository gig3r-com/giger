import { GigStatus } from '../../../models/gig';

interface IButtonDefinition {
    label: string;
    actionId?: ActionId;
    color: 'primary' | 'secondary' | 'accent' | 'accent2';
    disabled?: boolean;
}

export enum GigRelation {
    POSTED_BY_ME = 'POSTED_BY_ME',
    TAKEN_BY_ME = 'TAKE_BY_ME',
    MODERATED_BY_ME = 'MODERATED_BY_ME'
}

export enum ActionId {
    ACCEPT = 'ACCEPT_GIG',
    DELETE = 'DELETE_GIG',
    MARK_AS_DONE_MINE = 'MARK_AS_DONE_MINE',
    MARK_AS_DONE_THEIRS = 'MARK_AS_DONE_THEIRS',
    REPORT_A_PROBLEM = 'REPORT_A_PROBLEM',
    MARK_AS_BULLSHIT = 'MARK_AS_BULLSHIT',
    MARK_AS_VALID = 'MARK_AS_VALID',    
}

const buttonDefinitions: {
    status: GigStatus;
    isMine: boolean;
    moderation?: boolean;
    buttons: IButtonDefinition[];
}[] = [
    {
        status: GigStatus.AVAILABLE,
        isMine: false,
        moderation: false,
        buttons: [
            {
                label: 'ACCEPT_GIG',
                color: 'primary',
                disabled: false,
                actionId: ActionId.ACCEPT
            }
        ]
    },
    {
        status: GigStatus.AVAILABLE,
        isMine: true,
        buttons: [
            {
                label: 'DELETE_GIG',
                color: 'primary',
                disabled: false,
                actionId: ActionId.DELETE
            }
        ]
    },
    {
        status: GigStatus.IN_PROGRESS,
        isMine: false,
        buttons: [
            {
                label: 'MARK_AS_DONE',
                color: 'secondary',
                disabled: false,
                actionId: ActionId.MARK_AS_DONE_THEIRS
            }
        ]
    },
    {
        status: GigStatus.IN_PROGRESS,
        isMine: true,
        buttons: [
            {
                label: 'AWAITING_COMPLETION',
                color: 'secondary',
                disabled: true,
                actionId: ActionId.MARK_AS_DONE_MINE
            }
        ]
    },
    {
        status: GigStatus.PENDING_CONFIRMATION,
        isMine: true,
        buttons: [
            {
                label: 'MARK_AS_DONE',
                color: 'secondary',
                disabled: false,
                actionId: ActionId.MARK_AS_DONE_MINE
            },
            {
                label: 'REPORT_A_PROBLEM',
                color: 'accent',
                disabled: false,
                actionId: ActionId.REPORT_A_PROBLEM
            }
        ]
    },
    {
        status: GigStatus.PENDING_CONFIRMATION,
        isMine: false,
        buttons: [
            {
                label: 'AWAITING_ACCEPTANCE',
                color: 'secondary',
                disabled: true,
            }
        ]
    },
    {
        status: GigStatus.DISPUTE,
        isMine: true,
        buttons: [
            {
                label: 'AWAITING_RESOLUTION',
                color: 'accent2',
                disabled: true
            }
        ]
    },
    {
        status: GigStatus.DISPUTE,
        isMine: false,
        buttons: [
            {
                label: 'AWAITING_RESOLUTION',
                color: 'accent2',
                disabled: true
            }
        ]
    },
    {
        status: GigStatus.DISPUTE,
        isMine: false,
        moderation: true,
        buttons: [
            {
                label: 'MARK_AS_VALID',
                color: 'accent2',
                disabled: false,
                actionId: ActionId.MARK_AS_VALID
            },
            {
                label: 'MARK_AS_BULLSHIT',
                color: 'accent2',
                disabled: false,
                actionId: ActionId.MARK_AS_BULLSHIT
            }
        ]
    },
    {
        status: GigStatus.COMPLETED,
        isMine: false,
        buttons: [
            {
                label: 'DONE',
                color: 'primary',
                disabled: true
            }
        ]
    },
    {
        status: GigStatus.COMPLETED,
        isMine: true,
        buttons: [
            {
                label: 'DONE',
                color: 'primary',
                disabled: true
            }
        ]
    },
    {
        status: GigStatus.EXPIRED,
        isMine: false,
        buttons: [
            {
                label: 'EXPIRED',
                color: 'primary',
                disabled: true
            }
        ]
    },
    {
        status: GigStatus.EXPIRED,
        isMine: true,
        buttons: [
            {
                label: 'EXPIRED',
                color: 'primary',
                disabled: true
            }
        ]
    }
];

export const getButtons = (
    status: GigStatus,
    isMine: boolean,
    moderation: boolean
): IButtonDefinition[] => {
    if (moderation && status === GigStatus.DISPUTE) {
        return buttonDefinitions.find(
            (def) => def.status === status && def.moderation === moderation
        )!.buttons;
    }

    const buttonDefinition = buttonDefinitions.find(
        (def) =>
            def.status === status &&
            def.isMine === isMine
    );

    return buttonDefinition ? buttonDefinition.buttons : [];
};
