export const simpleCommands = {
    CLEAR: 'clear',
    END: 'end',
}

export const simpleCommandsDescriptions = {
    [simpleCommands.CLEAR]: 'Clears console.',
    [simpleCommands.END]: 'Ends connection to an address.'
}

export const complexCommands = {
    LIST: 'list',
    SCAN: 'scan',
    RUN: 'run',
    PROFILE: 'profile',
}

export const listCommands = {
    CMD: 'cmd',
    PROG: 'prog',
}

export const scanCommands = {
    USERNAME: '[username]',
    USER_ID: '[userId]',
    HASH_ID: '[hashId]',
    ADDRESS: '[address]',
}

export const runCommands = {
    PROGRAM_ADDRESS: '[program] [address]',
}

export const profileCommands = {
    ADDRESS: '[address]',
}

export const complexCommandsDescriptions = {
    [complexCommands.LIST]: {
        [listCommands.CMD]: 'Lists all available commands.',
        [listCommands.PROG]: 'Lists all available exploits.',
    },
    [complexCommands.SCAN]: {
        [scanCommands.USERNAME]: 'Retrieve UserId.',
        [scanCommands.USER_ID]: 'Retrieve user data.',
        [scanCommands.HASH_ID]: 'Retrieve user data.',
        [scanCommands.ADDRESS]: 'Retrieve address data.',
    },
    [complexCommands.RUN]: {
        [runCommands.PROGRAM_ADDRESS]: 'Run program on given address.',
    },
    [complexCommands.PROFILE]: {
        [profileCommands.ADDRESS]: 'Run program on given address.',
    },
}
