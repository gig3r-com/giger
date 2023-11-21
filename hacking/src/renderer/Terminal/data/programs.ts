export const BREACH_VALUES = {
    SUCCESS: 'success',
    PARTIAL_SUCCESS: 'partial success',
    FAIL: 'fail',
}

export const programTypes = {
    FIREWALL_BREACHER: 'firewall breacher',
    OS_BREACHER: 'os breacher',
}

export const programs = {
    A1: {
        name: 'ProgramA1',
        type: programTypes.FIREWALL_BREACHER,
    },
    B1: {
        name: 'ProgramB1',
        type: programTypes.FIREWALL_BREACHER,
    },
    C1: {
        name: 'ProgramC1',
        type: programTypes.FIREWALL_BREACHER,
    },
    W1: {
        name: 'ProgramW1',
        type: programTypes.OS_BREACHER,
    },
    X1: {
        name: 'ProgramX1',
        type: programTypes.OS_BREACHER,
    },
    Y1: {
        name: 'ProgramY1',
        type: programTypes.OS_BREACHER,
    },
    Z1: {
        name: 'ProgramZ1',
        type: programTypes.OS_BREACHER,
    },
};
