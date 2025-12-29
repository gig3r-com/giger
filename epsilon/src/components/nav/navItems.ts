import { NETWORKS } from '@/components/modules/networks';
import { NavItem } from '@/components/nav/TopNav';
import { AppMode } from '@/components/common/AppModeSelect';

const buildNetworkItems = (): NavItem[] =>
  Object.keys(NETWORKS).map(label => ({
    href: `/network/${label.toLowerCase()}`,
    label,
  }));

const BASE_ITEMS: NavItem[] = [
  // Users
  { href: '/users/ ', label: 'List' },
  { href: '/users/new', label: 'Create' },

  // Conversation group
  { href: '/conversation/edit', label: 'Edit' },
  { href: '/conversation/export', label: 'Export' },

  // Networks
  ...buildNetworkItems(),

  // Sector
  { href: '/sector/police', label: 'Police: Database' },
];

// Example: tailor sets per mode. Adjust as you need.
const POLICE_ITEMS: NavItem[] = [
  { href: '/sector/police', label: 'Police: Database' },
];

const DOC_ITEMS: NavItem[] = [

];

export const ITEMS_BY_MODE: Record<AppMode, (NavItem[] | (() => NavItem[]))> = {
  full: BASE_ITEMS,
  police: POLICE_ITEMS,
  doc: DOC_ITEMS,
};