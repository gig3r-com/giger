'use client';

import * as React from 'react';
import {
  Stack,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';
import Collapsible from '@/components/common/Collapsible';
import { useUsers } from '@/components/modules/users/context';
import { ApiUser } from '@/app/api/mappers/user';

export default function UserList() {
  const { usersByHandle, selected, setSelected } = useUsers();

  // stable list of users
  const items = React.useMemo<ApiUser[]>(
    () => Object.values(usersByHandle ?? {}),
    [usersByHandle]
  );

  // lowercase index to make filtering cheap
  const lcIndex = React.useMemo(
    () =>
      items.map((u) => ({
        u,
        h: (u.handle ?? '').toLowerCase(),
        f: (u.faction ?? '').toLowerCase(),
      })),
    [items]
  );

  const [query, setQuery] = React.useState('');
  const deferredQuery = React.useDeferredValue(query);

  const filtered = React.useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();

    // Empty query — show all
    if (!q) return items;

    // Filter by handle or faction
    let base = lcIndex
      .filter((r) => r.h.includes(q) || r.f.includes(q))
      .map((r) => r.u);

    // Ensure selected is always visible
    if (selected && !base.some((u) => u.id === selected?.id)) {
      const sel = usersByHandle?.[selected?.id];
      if (sel) base = [sel, ...base];
    }
    return base;
  }, [deferredQuery, lcIndex, items, selected, usersByHandle]);

  return (
    <Collapsible title="Users">
      <Stack spacing={1.5}>
        <TextField
          size="small"
          placeholder="Filter by handle or faction…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />

        {items.length === 0 ? (
          <Typography color="text.secondary">No users loaded yet.</Typography>
        ) : (
          <>
            <Divider sx={{ opacity: 0.5 }} />
            <List dense disablePadding sx={{ maxHeight: '400px', overflowY: 'scroll' }}>
              {filtered.map((user) => (
                <ListItemButton
                  key={user.id}
                  sx={{ borderRadius: 1, mb: 0.5, mr: 1 }}
                  selected={selected?.id === user.id}
                  onClick={ () => setSelected(user) }
                >
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true }}
                    primary={user.handle}
                    secondaryTypographyProps={{ noWrap: true }}
                    secondary={user.faction}
                  />
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </Stack>
    </Collapsible>
  );
}
