export type FeatureKey =
    | 'advancedTrades'
    | 'gmTools'
    | 'blackMarket'
    | 'reputation';

export type NavItem = {
    id: string;
    translateKey: string;
    route: string;
    icon?: string;
};

export type TenantConfig = {
    nav: NavItem[];
    features: Partial<Record<FeatureKey, boolean>>;
    strings?: Record<string, string>;
};

export const gigerDefault: TenantConfig = {
    nav: [
        { id: 'my.id', translateKey: 'My.id', route: '/my.id' },
        { id: 'market', translateKey: 'Market', route: '/market' },
        { id: 'ops', translateKey: 'Ops', route: '/ops' }
    ],
    features: {
        advancedTrades: true,
        gmTools: true,
        blackMarket: true,
        reputation: true
    }
};

export const cityOfChange: TenantConfig = {
    nav: [
        { id: 'my.id', translateKey: 'PROFILE', route: '/dashboard' },
        { id: 'ops', translateKey: 'Operations', route: '/ops' }
        // e.g. remove Market entirely
    ],
    features: {
        advancedTrades: false, // hide/disable
        gmTools: true,
        blackMarket: false,
        reputation: true
    },
    strings: {
        // optional copy tweaks
        'market.title': 'City Exchange'
    }
};

export const configs = { gigerDefault, cityOfChange } as const;
