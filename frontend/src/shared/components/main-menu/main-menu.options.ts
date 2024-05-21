export enum MainMenuNames {
    GIGS = 'gigs',
    BANK = 'bank',
    CHAT = 'chat',
    MY_ID = 'my.id'
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
