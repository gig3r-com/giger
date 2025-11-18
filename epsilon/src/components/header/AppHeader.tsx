'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { signOutAction } from "@/actions/auth"
import TopNav from '@/components/nav/TopNav';
import { FetchStatuses } from '@/components/modules/controller';
import { Stack } from '@mui/material';

interface Props {
  user: { name?: string | null; email?: string | null; image?: string | null } | null
}

export default function AppHeader({ user }: Props) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ gap: 2 }}>
        <Stack direction="row" sx={{ gap: 3 }}>
          <Typography
            variant="h6"
            className="glitch"
            data-glitch="EPSILON"
            sx={{ flexGrow: 1, letterSpacing: 1.5, marginTop: '-12px' }}
          >
            EPSILON
          </Typography>
          <FetchStatuses />
        </Stack>
        <div style={{ flex: 1 }} />
        <TopNav />
        { !user ? <SignInButton /> : <ProfileAvatar user={ user } /> }
      </Toolbar>
    </AppBar>
  )
}

function SignInButton() {
  return (
    <Button color="primary" component={Link} href="/login">
      Sign in
    </Button>
  )
}

function ProfileAvatar({ user }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Avatar
        src={user.image ?? undefined}
        alt={user.handle ?? ''}
        sx={{ width: 32, height: 32 }}
      />
      <Typography variant="body2">{user.handle ?? user.name}</Typography>
      <form action={() => signOutAction('/login')} style={{ margin: 0 }}>
        <Button type="submit" color="secondary">
          Sign out
        </Button>
      </form>
    </Box>
  )
}
