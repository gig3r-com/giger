export interface IMainMenuOption {
    name: string;
    link: string;
}

export const mainMenuOptions: IMainMenuOption[] = [
    {name: 'gigs', link: '/giger'},
    {name: 'bank', link: '/bank'},
    {name: 'chat', link: '/chat'},
    {name: 'my.id', link: '/myid'},
]
