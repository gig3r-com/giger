'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  List,
  ListItemButton,
  ListItemText,
  Popover,
  ListItemIcon,
  Divider,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useControllers } from '@/components/modules/controller'; // ← import your context
import { ITEMS_BY_MODE } from './navItems';

type AppMode = 'full' | 'police' | 'doc';

export interface NavItem { href: string; label: string }

// Optional: explicit labels for group titles; falls back to TitleCase(section)
const groupLabels: Record<string, string> = {
  users: 'Users',
  network: 'Networks',
  conversation: 'Conversations',
};

const titleCase = (s: string) =>
  s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function TopNav() {
  const pathname = usePathname();
  const { appMode } = useControllers(); // ← read current mode

  // Compute the active item set for the current mode
  const items = useMemo<NavItem[]>(() => {
    const entry = ITEMS_BY_MODE[(appMode as AppMode) ?? 'full'];
    const list = typeof entry === 'function' ? entry() : entry;
    return list;
  }, [appMode]);

  // --- group the items by the first path segment ---
  const { directLinks, groups, groupsOrder } = useMemo(() => {
    const direct: NavItem[] = [];
    const map = new Map<string, NavItem[]>();
    const order: string[] = [];

    for (const it of items) {
      const parts = it.href.split('/').filter(Boolean);
      if (parts.length <= 1) {
        direct.push(it);
        continue;
      }
      const section = parts[0];
      if (!map.has(section)) {
        map.set(section, []);
        order.push(section);
      }
      map.get(section)!.push(it);
    }

    return {
      directLinks: direct,
      groups: map,
      groupsOrder: order,
    };
  }, [items]);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const open = Boolean(anchorEl) && Boolean(openKey);

  const toggleMenu = (section: string, el: HTMLElement) => {
    setAnchorEl((prev) => (open && openKey === section ? null : el));
    setOpenKey((prev) => (open && prev === section ? null : section));
  };

  useEffect(() => {
    setAnchorEl(null);
    setOpenKey(null);
  }, [pathname]);

  const renderNavButton = (it: NavItem) => {
    const active = pathname === it.href;
    return (
      <ListItemButton
        key={it.href}
        dense
        component={Link as any}
        href={it.href}
        selected={active}
        sx={{
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
          '& .MuiListItemText-root': {
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontWeight: active ? 700 : 500,
            color: active ? 'primary.main' : 'text.secondary',
          },
        }}
      >
        <ListItemText primary={it.label} />
      </ListItemButton>
    );
  };

  const isGroupActive = (section: string) =>
    pathname?.startsWith(`/${section}/`);

  const openGroupItems = openKey ? groups.get(openKey) ?? [] : [];

  return (
    <>
      <List component="nav" dense sx={{ display: 'flex', flexDirection: 'row', p: 0 }}>
        {directLinks.map(renderNavButton)}

        {groupsOrder.map((section) => {
          const active = isGroupActive(section);
          const label = groupLabels[section] ?? titleCase(section);
          return (
            <ListItemButton
              key={`grp-${section}`}
              dense
              aria-haspopup="true"
              aria-expanded={open && openKey === section ? 'true' : undefined}
              selected={active}
              onClick={(e) => toggleMenu(section, e.currentTarget)}
              sx={{
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
              }}
            >
              <ListItemText
                primary={label}
                sx={{
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  fontWeight: active ? 700 : 500,
                  color: active ? 'primary.main' : 'text.secondary',
                }}
              />
              <ListItemIcon sx={{ minWidth: 24 }}>
                <ArrowDropDownIcon />
              </ListItemIcon>
            </ListItemButton>
          );
        })}
      </List>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setOpenKey(null);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{ sx: { mt: 1, borderRadius: 1 } }}
        keepMounted
        disableRestoreFocus
        disableScrollLock
      >
        <List dense sx={{ minWidth: 220, p: 0 }}>
          {openGroupItems.map((it, idx) => {
            const isLast = idx === openGroupItems.length - 1;
            const isActive = pathname === it.href;
            return (
              <React.Fragment key={it.href}>
                <ListItemButton
                  dense
                  component={Link as any}
                  href={it.href}
                  selected={isActive}
                  sx={{
                    px: 2,
                    borderRadius: 0,
                    backgroundColor: isActive ? 'rgba(182,255,46,.12)' : 'transparent',
                    borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,.06)',
                    '&:hover': { backgroundColor: 'rgba(182,255,46,.08)' },
                    '& .MuiListItemText-root': {
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'primary.main' : 'text.secondary',
                    },
                  }}
                  onClick={() => {
                    setAnchorEl(null);
                    setOpenKey(null);
                  }}
                >
                  <ListItemText primary={it.label} />
                </ListItemButton>
                {!isLast && <Divider component="li" />}
              </React.Fragment>
            );
          })}
        </List>
      </Popover>
    </>
  );
}
