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
    MARK_AS_EXPIRED = 'MARK_AS_EXPIRED',
    COMPLETE = 'COMPLETE'
}

const buttonDefinitions: {
    status: GigStatus;
    isMine?: boolean;
    mode?: GigModes;
    moderation?: boolean;
    reputationMatches?: boolean;
    hasCompanyAccount?: boolean;
    fundsMatch?: boolean;
    companyFundsMatch?: boolean;
    buttons: IButtonDefinition[];
}[] = [
        {
            status: GigStatus.AVAILABLE,
            isMine: false,
            reputationMatches: false,
            buttons: [
                {
                    label: 'INSUFFICIENT_REPUTATION',
                    color: 'primary',
                    disabled: true
                }
            ]
        },
        {
            status: GigStatus.AVAILABLE,
            isMine: false,

            reputationMatches: false,
            buttons: [
                {
                    label: 'INSUFFICIENT_REPUTATION',
                    color: 'primary',
                    disabled: true
                }
            ]
        },
        {
            status: GigStatus.AVAILABLE,
            isMine: false,
            hasCompanyAccount: false,
            fundsMatch: true,
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
            hasCompanyAccount: false,
            fundsMatch: false,
            mode: GigModes.PROVIDER,
            buttons: [
                {
                    label: 'INSUFFICIENT_FUNDS',
                    color: 'primary',
                    disabled: true
                }
            ]
        },
        {
            status: GigStatus.AVAILABLE,
            isMine: false,
            hasCompanyAccount: true,
            mode: GigModes.CLIENT,
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
            isMine: false,
            hasCompanyAccount: true,
            fundsMatch: false,
            companyFundsMatch: false,
            mode: GigModes.PROVIDER,
            buttons: [
                {
                    label: 'INSUFFICIENT_FUNDS',
                    color: 'primary',
                    disabled: true
                },
                {
                    label: 'INSUFFICIENT_COMPANY_FUNDS',
                    color: 'primary',
                    disabled: true
                }
            ]
        },
        {
            status: GigStatus.AVAILABLE,
            isMine: false,
            hasCompanyAccount: true,
            fundsMatch: true,
            companyFundsMatch: false,
            mode: GigModes.PROVIDER,
            buttons: [
                {
                    label: 'ACCEPT_GIG',
                    color: 'primary',
                    disabled: false,
                    actionId: ActionId.ACCEPT
                },
                {
                    label: 'INSUFFICIENT_COMPANY_FUNDS',
                    color: 'primary',
                    disabled: true
                }
            ]
        },
        {
            status: GigStatus.AVAILABLE,
            isMine: false,
            hasCompanyAccount: true,
            fundsMatch: false,
            companyFundsMatch: true,
            mode: GigModes.PROVIDER,
            buttons: [
                {
                    label: 'INSUFFICIENT_FUNDS',
                    color: 'primary',
                    disabled: true
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
            mode: GigModes.CLIENT,
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
            mode: GigModes.CLIENT,
            isMine: true,
            buttons: [
                {
                    label: 'AWAITING_COMPLETION',
                    color: 'secondary',
                    disabled: true
                }
            ]
        },
        {
            status: GigStatus.IN_PROGRESS,
            mode: GigModes.PROVIDER,
            isMine: false,
            buttons: [
                {
                    label: 'AWAITING_COMPLETION',
                    color: 'secondary',
                    disabled: true,
                }
            ]
        },
        {
            status: GigStatus.IN_PROGRESS,
            mode: GigModes.PROVIDER,
            isMine: true,
            buttons: [
                {
                    label: 'MARK_AS_DONE',
                    color: 'secondary',
                    disabled: false,
                    actionId: ActionId.MARK_AS_DONE_MINE
                }
            ]
        },
        {
            status: GigStatus.PENDING_CONFIRMATION,
            mode: GigModes.CLIENT,
            isMine: false,
            buttons: [
                {
                    label: 'AWAITING_ACCEPTANCE',
                    color: 'secondary',
                    disabled: true
                }
            ]
        },
        {
            status: GigStatus.PENDING_CONFIRMATION,
            mode: GigModes.CLIENT,
            isMine: true,
            buttons: [
                {
                    label: 'COMPLETE',
                    color: 'secondary',
                    disabled: false,
                    actionId: ActionId.COMPLETE
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
            isMine: false,
            buttons: [
                {
                    label: 'AWAITING_ACCEPTANCE',
                    color: 'secondary',
                    disabled: true
                }
            ]
        },
        {
            status: GigStatus.PENDING_CONFIRMATION,
            mode: GigModes.PROVIDER,
            isMine: true,
            buttons: [
                {
                    label: 'COMPLETE',
                    color: 'secondary',
                    disabled: false,
                    actionId: ActionId.COMPLETE
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
    hasCompanyAccount: boolean,
    reputationMatches: boolean,
    hasEnoughtFunds: boolean,
    companyHasEnoughtFunds: boolean
): IButtonDefinition[] => {
    const buttonDefinition = buttonDefinitions.find((def) => {
        const statusMatching = def.status === status;
        const moderationMatching =
            def.moderation === undefined ? true : def.moderation === moderation;
        const mineMatching =
            def.isMine === undefined ? true : def.isMine === isMine;
        const modeMatching = def.mode === undefined ? true : def.mode === mode;
        const reputationMatching =
            def.reputationMatches === undefined
                ? true
                : def.reputationMatches === reputationMatches;
        const hasCompanyAccountMatching =
            def.hasCompanyAccount === undefined
                ? true
                : def.hasCompanyAccount === hasCompanyAccount;
        const fundsMatching =
            def.fundsMatch === undefined
                ? true
                : def.fundsMatch === hasEnoughtFunds;
        const companyFundsMatching =
            def.companyFundsMatch === undefined
                ? true
                : def.companyFundsMatch === companyHasEnoughtFunds;

        return (
            statusMatching &&
            moderationMatching &&
            mineMatching &&
            modeMatching &&
            hasCompanyAccountMatching &&
            reputationMatching &&
            fundsMatching &&
            companyFundsMatching
        );
    })?.buttons ?? [];

    return buttonDefinition ?? [];
};
