'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Stack,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  CircularProgress,
  Box,
} from '@mui/material';
import Collapsible from '@/components/common/Collapsible';
import { useUsers } from '@/components/modules/users/context';
import { ApiUser } from '@/app/api/mappers/user';

export default function UserList() {
  const { usersByHandle, selected, isLoading } = useUsers();
  const { push } = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = React.useState<string>('');

  const deferredQuery = React.useDeferredValue(query);
  const items = React.useMemo(
    () => Object.values(usersByHandle ?? {}),
    [usersByHandle]
  );

  const filtered = React.useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter((user) =>
      user.handle.includes(q) ||
      user.name.includes(q) ||
      user.faction.includes(q) ??
      user.handle === selected?.handle
    );
  }, [deferredQuery, items, selected]);

  const handleSelect = React.useCallback((user: ApiUser) => {
    if (user.handle === selected) return;
    const url = pathname.split('/');
    if (url[2]) url[2] = user.handle;
    else url.push(user.handle);
    push(url.join('/'));
  }, [selected, push, pathname]);

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
        { isLoading && <Box sx={{ width: '100%', height: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center' }}><CircularProgress /></Box> }

        { items.length === 0 ? <Typography color="text.secondary">No users loaded yet.</Typography> :
          <>
            <Divider sx={{ opacity: 0.5 }} />
            <List dense disablePadding sx={{ maxHeight: '400px', overflowY: 'scroll' }}>
              { filtered.map((user: ApiUser) => (
                <ListItemButton key={ user.id } sx={{ borderRadius: 1, mb: 0.5, mr: 1 }} selected={ selected?.id === user.id } onClick={ () => handleSelect(user) }>
                  <ListItemText primaryTypographyProps={{ noWrap: true }} primary={ user.handle } secondaryTypographyProps={{ noWrap: true }} secondary={ user.faction } />
                </ListItemButton>
              )) }
            </List>
          </>
        }
      </Stack>
    </Collapsible>
  );
}
