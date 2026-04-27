// components/nav/AppNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Box, List, ListItemButton, ListItemText, Divider
} from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';

const items = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/users', label: 'Users' },
  { href: '/network', label: 'Network' },
  { href: '/subnetworks', label: 'Subnetworks' },
]

const drawerWidth = 160

export default function AppNav() {
  const pathname = usePathname();
  const links = items.map((it) => {
      const active = pathname === it.href
      return (
          <ListItemButton
              key={it.href}
              component={Link}
              href={`/` + it.href.replace(/^\//, '')}
              selected={active}
              sx={{
                  mb: 0.5,
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
              }}
          >
              <ListItemText primary={it.label} />
          </ListItemButton>
      )
  });

  return (
    <Drawer variant="permanent" sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}>
        <Toolbar />
      <List component="nav" dense>
        { links }
      </List>
      <Divider sx={{ my: 2, opacity: 0.3 }} />
      <Box sx={{ fontSize: 12, opacity: 0.7 }}>v0.1 • biomech</Box>
    </Drawer>
  )
}
