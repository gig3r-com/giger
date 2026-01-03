export enum MainMenuNames {
    GIGS = 'GIGS',
    BANK = 'BANK',
    CHAT = 'CHAT',
    MY_ID = 'MY_ID',
    OFFERS = 'OFFERS',
    PROFILE = 'PROFILE'
}

export interface IMainMenuOption {
    name: MainMenuNames;
    link: string;
}

export const mainMenuOptions: IMainMenuOption[] = [
    { name: MainMenuNames.GIGS, link: '/giger' },
    { name: MainMenuNames.BANK, link: '/bank' },
    { name: MainMenuNames.CHAT, link: '/chat' },
    { name: MainMenuNames.MY_ID, link: '/myid' }
];

export const cocMainMenuOptions: IMainMenuOption[] = [
    { name: MainMenuNames.OFFERS, link: '/giger' },
    { name: MainMenuNames.BANK, link: '/bank' },
    { name: MainMenuNames.CHAT, link: '/chat' },
    { name: MainMenuNames.PROFILE, link: '/myid' }
];
