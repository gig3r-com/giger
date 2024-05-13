import { GigModes, GigStatus } from '../../../models/gig';

interface IButtonDefinition {
    label: string;
    actionId?: ActionId;
    color: 'primary' | 'secondary' | 'accent' | 'accent2' | 'muted-accent';
    disabled?: boolean;
}

export enum GigRelation {
    POSTED_BY_ME = 'POSTED_BY_ME',
    TAKEN_BY_ME = 'TAKE_BY_ME',
    MODERATED_BY_ME = 'MODERATED_BY_ME'
}

export enum ActionId {
    ACCEPT = 'ACCEPT_GIG',
    ACCEPT_AS_COMPANY = 'ACCEPT_AS_COMPANY',
    DELETE = 'DELETE_GIG',
    MARK_AS_DONE_MINE = 'MARK_AS_DONE_MINE',
    MARK_AS_DONE_THEIRS = 'MARK_AS_DONE_THEIRS',
    REPORT_A_PROBLEM = 'REPORT_A_PROBLEM',
    MARK_AS_BULLSHIT = 'MARK_AS_BULLSHIT',
    MARK_AS_VALID = 'MARK_AS_VALID',
    MARK_AS_EXPIRED = 'MARK_AS_EXPIRED'
}

const buttonDefinitions: {
    status: GigStatus;
    isMine?: boolean;
    mode?: GigModes;
    moderation?: boolean;
    hasCompanyAccount?: boolean;
    buttons: IButtonDefinition[];
}[] = [
    {
        status: GigStatus.AVAILABLE,
        isMine: false,
        hasCompanyAccount: false,
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
        isMine: false,
        hasCompanyAccount: true,
        buttons: [
            {
                label: 'ACCEPT_GIG',
                color: 'primary',
                disabled: false,
                actionId: ActionId.ACCEPT
            },
            {
                label: 'ACCEPT_AS_COMPANY',
                color: 'primary',
                disabled: false,
                actionId: ActionId.ACCEPT_AS_COMPANY
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
        mode: GigModes.PROVIDER,
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
        mode: GigModes.CLIENT,
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
        mode: GigModes.CLIENT,
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
        mode: GigModes.PROVIDER,
        buttons: [
            {
                label: 'AWAITING_ACCEPTANCE',
                color: 'secondary',
                disabled: true
            }
        ]
    },
    {
        status: GigStatus.DISPUTE,
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
        buttons: [
            {
                label: 'DONE',
                color: 'muted-accent',
                disabled: true
            }
        ]
    },
    {
        status: GigStatus.EXPIRED,
        buttons: [
            {
                label: 'EXPIRED',
                color: 'muted-accent',
                disabled: true
            }
        ]
    }
];

export const getButtons = (
    status: GigStatus,
    isMine: boolean,
    moderation: boolean,
    mode: GigModes,
    hasCompanyAccount: boolean
): IButtonDefinition[] => {
    const buttonDefinition = buttonDefinitions.find((def) => {
        const statusMatching = def.status === status;
        const moderationMatching =
            def.moderation === undefined ? true : def.moderation === moderation;
        const mineMatching =
            def.isMine === undefined ? true : def.isMine === isMine;
        const modeMatching = def.mode === undefined ? true : def.mode === mode;
        const hasCompanyAccountMatching =
            def.hasCompanyAccount === undefined
                ? true
                : def.hasCompanyAccount === hasCompanyAccount;

        return (
            statusMatching &&
            moderationMatching &&
            mineMatching &&
            modeMatching &&
            hasCompanyAccountMatching
        );
    })!.buttons;

    return buttonDefinition ?? [];
};
