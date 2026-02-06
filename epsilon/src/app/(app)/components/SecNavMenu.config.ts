import { SecNavItem, SecNavMode } from './SecNavMenu.types';
import { PlayerAppsConfig } from "@/playerApps.config";

export const SEC_NAV_ITEMS: Record<SecNavMode, SecNavItem[] | (() => SecNavItem[])> = {
    default: [
        { type: 'link', href: '/overview', label: 'Overview' },
        { type: 'link', href: '/reports', label: 'Reports' },
        {
            type: 'group',
            key: 'tools',
            label: 'Tools',
            items: [
                { type: 'link', href: '/tools/search', label: 'Search' },
                { type: 'link', href: '/tools/logs', label: 'Logs' },
                { type: 'link', href: '/tools/monitoring', label: 'Monitoring' },
            ],
        },
    ],

    creator: [
        { type: 'link', href: '/creator', label: 'Dashboard', strict: true, },
        { type: 'link', href: '/creator/users', label: 'Users' },
        { type: 'link', href: '/creator/chats', label: 'Chats' },
        { type: 'link', href: '/creator/banking', label: 'Banking' },
        { type: 'link', href: '/creator/gigs', label: 'Gigs' },
        { type: 'link', href: '/creator/networks', label: 'Networks' },
    ],

    director: [
        { type: 'link', href: '/director/live', label: 'Live Control' },
        {
            type: 'group',
            key: 'session',
            label: 'Session',
            items: [
                { type: 'link', href: '/director/session/queue', label: 'Queue' },
                { type: 'link', href: '/director/session/scenes', label: 'Scenes' },
                { type: 'link', href: '/director/session/metrics', label: 'Metrics' },
            ],
        },
        {
            type: 'group',
            key: 'ops',
            label: 'Operations',
            items: [
                { type: 'link', href: '/director/ops/alerts', label: 'Alerts' },
                { type: 'link', href: '/director/ops/logs', label: 'Logs' },
            ],
        },
    ],

    player: [
        { type: 'link', href: '/player', label: 'Configure' },
        {
            type: 'group', key: 'apps', label: 'Apps',
            items: PlayerAppsConfig.map(app => ({
                type: 'link',
                href: app.url,
                label: app.name,
            })),
        },
    ],
};

export function getSecNavItemsForPathname(pathname: string): SecNavItem[] {
    const seg = pathname.split('/').filter(Boolean)[0] as SecNavMode | undefined;
    const mode: SecNavMode = seg === 'creator' || seg === 'director' || seg === 'player' ? seg : 'default';
    const entry = SEC_NAV_ITEMS[mode];
    return typeof entry === 'function' ? entry() : entry;
}
