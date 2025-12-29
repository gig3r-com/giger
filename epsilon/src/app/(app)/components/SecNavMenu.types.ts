// SecNavMenu.types.ts
export interface SecNavLinkItem {
    type: 'link';
    href: string;
    label: string;
    strict?: boolean;
}

export interface SecNavGroupItem {
    type: 'group';
    key: string;            // unikalny klucz grupy (do sterowania popoverem)
    label: string;          // nazwa grupy widoczna na przycisku
    items: SecNavLinkItem[]; // elementy w dropdownie
}

export type SecNavItem = SecNavLinkItem | SecNavGroupItem;

export type SecNavMode = 'creator' | 'director' | 'player' | 'default';
