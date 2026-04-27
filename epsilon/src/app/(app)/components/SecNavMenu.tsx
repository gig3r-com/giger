// SecNavMenu.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Popover,
    Divider,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
    SecNavItem,
    SecNavLinkItem,
    SecNavGroupItem,
} from './SecNavMenu.types';
import { getSecNavItemsForPathname } from './SecNavMenu.config';

const isLinkItem = (it: SecNavItem): it is SecNavLinkItem => it.type === 'link';
const isGroupItem = (it: SecNavItem): it is SecNavGroupItem => it.type === 'group';

// --- path helpers ----------------------------------------------------------

const normalizePath = (path: string) => {
    if (!path) return '/';
    if (path === '/') return '/';
    return path.endsWith('/') ? path.slice(0, -1) : path;
};

/**
 * Route matching:
 * - strict === true  -> only exact match
 * - strict === false -> exact match OR any subpath
 *   - with special case for "/" so it doesn't match everything
 */
const isRouteActive = (href: string, pathname: string, strict = false) => {
    if (!href) return false;

    const current = normalizePath(pathname);
    const target = normalizePath(href);

    if (strict) return current === target;

    // Exact match always counts
    if (current === target) return true;

    // "/" should not match everything
    if (target === '/') return current === '/';

    return current.startsWith(`${target}/`);
};

const isLinkActive = (link: SecNavLinkItem, pathname: string) =>
    isRouteActive(link.href, pathname, Boolean(link.strict));

// --- shared styles ---------------------------------------------------------

const navButtonSx = (active: boolean) => ({
    px: 2,
    borderRadius: '8px',
    m: '0 8px',
    backgroundColor: active ? 'rgba(182,255,46,.15)' : 'transparent',
    border: active ? '1px solid var(--bio-acid)' : '1px solid transparent',
    transition: 'all .2s ease',
    '&:hover': {
        backgroundColor: 'rgba(182,255,46,.08)',
        boxShadow: '0 0 12px rgba(182,255,46,.4)',
    },
});

const navTextSx = (active: boolean) => ({
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: active ? 700 : 500,
    color: active ? 'primary.main' : 'text.secondary',
});

const popoverItemSx = (active: boolean, isLast: boolean) => ({
    px: 2,
    borderRadius: 0,
    backgroundColor: active ? 'rgba(182,255,46,.12)' : 'transparent',
    borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,.06)',
    '&:hover': { backgroundColor: 'rgba(182,255,46,.08)' },
    '& .MuiListItemText-root': {
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: active ? 700 : 500,
        color: active ? 'primary.main' : 'text.secondary',
    },
});

// --------------------------------------------------------------------------

export default function SecNavMenu() {
    const pathname = usePathname() || '/';

    const items = React.useMemo(
        () => getSecNavItemsForPathname(pathname),
        [pathname],
    );

    const { directLinks, groups, order } = React.useMemo(() => {
        const direct: SecNavLinkItem[] = [];
        const map = new Map<string, SecNavGroupItem>();
        const ord: string[] = [];

        for (const it of items) {
            if (isLinkItem(it)) {
                direct.push(it);
            } else if (isGroupItem(it)) {
                map.set(it.key, it);
                ord.push(it.key);
            }
        }

        return { directLinks: direct, groups: map, order: ord };
    }, [items]);

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [openKey, setOpenKey] = React.useState<string | null>(null);
    const isOpen = Boolean(anchorEl) && Boolean(openKey);

    const handleToggleMenu = (key: string, el: HTMLElement) => {
        if (isOpen && openKey === key) {
            setAnchorEl(null);
            setOpenKey(null);
            return;
        }
        setAnchorEl(el);
        setOpenKey(key);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setOpenKey(null);
    };

    // Close on route change
    React.useEffect(() => {
        handleCloseMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <>
            <List
                component="nav"
                dense
                sx={{ display: 'flex', flexDirection: 'row', p: 0 }}
            >
                {directLinks.map((it) => {
                    const active = isLinkActive(it, pathname);

                    return (
                        <ListItemButton
                            key={it.href}
                            dense
                            component={Link as any}
                            href={it.href}
                            selected={active}
                            sx={navButtonSx(active)}
                        >
                            <ListItemText
                                primary={it.label}
                                sx={navTextSx(active)}
                            />
                        </ListItemButton>
                    );
                })}

                {order.map((key) => {
                    const grp = groups.get(key)!;
                    const active = grp.items.some((it) =>
                        isLinkActive(it, pathname),
                    );

                    return (
                        <ListItemButton
                            key={`grp-${key}`}
                            dense
                            aria-haspopup="true"
                            aria-expanded={
                                isOpen && openKey === key ? 'true' : undefined
                            }
                            selected={active}
                            onClick={(e) =>
                                handleToggleMenu(key, e.currentTarget)
                            }
                            sx={navButtonSx(active)}
                        >
                            <ListItemText
                                primary={grp.label}
                                sx={navTextSx(active)}
                            />
                            <ListItemIcon sx={{ minWidth: 24 }}>
                                <ArrowDropDownIcon />
                            </ListItemIcon>
                        </ListItemButton>
                    );
                })}
            </List>

            <Popover
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                PaperProps={{ sx: { mt: 1, borderRadius: 1 } }}
                keepMounted
                disableRestoreFocus
                disableScrollLock
            >
                <List dense sx={{ minWidth: 220, p: 0 }}>
                    {(openKey ? groups.get(openKey)?.items ?? [] : []).map(
                        (it, idx, arr) => {
                            const isLast = idx === arr.length - 1;
                            const active = isLinkActive(it, pathname);

                            return (
                                <React.Fragment key={it.href}>
                                    <ListItemButton
                                        dense
                                        component={Link as any}
                                        href={it.href}
                                        selected={active}
                                        sx={popoverItemSx(active, isLast)}
                                        onClick={handleCloseMenu}
                                    >
                                        <ListItemText primary={it.label} />
                                    </ListItemButton>
                                    {!isLast && <Divider component="li" />}
                                </React.Fragment>
                            );
                        },
                    )}
                </List>
            </Popover>
        </>
    );
}
