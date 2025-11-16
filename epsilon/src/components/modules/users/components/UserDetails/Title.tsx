import React from 'react';
import Link from 'next/link'
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { ApiUser } from '@/app/api/mappers/user';

function Title({ user, fullName }: { user: ApiUser | null, fullName: string, }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ px: 1, width: '100%' }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
        <Avatar sx={{ width: 56, height: 56 }}>
          {((user?.name?.[0] ?? user?.handle?.[0]) ?? '?').toUpperCase()}
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="h5" sx={{ lineHeight: 1.1 }}>
            {user ? fullName : 'No user selected'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user ? `@${user.handle} • ${user.typePublic} • ${user.faction}` : 'Pick a user from the list'}
          </Typography>
        </Box>
      </Stack>
      <Button variant="contained" disabled={ !user } component={ Link } href={ `/users/${user?.handle}/edit` }>
        Edit
      </Button>
    </Stack>
  );
}

export default Title;