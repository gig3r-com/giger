'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import { signOutAction } from '@/actions/auth'
import { FetchStatuses } from '@/components/modules/controller'
import MainNavMenu from "./MainNavMenu";
import SecNavMenu from "./SecNavMenu";
import NavBridge from "./NavBridge";

interface User {
    name?: string | null
    email?: string | null
    image?: string | null
    handle?: string | null
}

export default function AppHeader({ user }: { user: User | null }) {

    return (
        <AppBar position="fixed">
            <Toolbar sx={{ gap: 2 }}>
                <Stack direction="row" sx={{ gap: 3 }}>
                    <Typography
                        variant="h6"
                        className="glitch"
                        data-glitch="EPSILON"
                        sx={{ flexGrow: 1, letterSpacing: 1.5, mt: '-12px' }}
                    >
                        EPSILON
                    </Typography>
                    <FetchStatuses />
                </Stack>
                <MainNavMenu value={0} />
                <NavBridge>
                    <SecNavMenu />
                </NavBridge>
                <ProfileSection user={user} />
            </Toolbar>
        </AppBar>
    )
}

function ProfileSection({ user }: { user: User | null }) {
    if (user) {
        return <ProfileAvatar user={user} />
    }

    return (
        <Link href="/login">
            <Button color="primary">
                Sign in
            </Button>
        </Link>
    )
}

function signOutAndRedirect() {
    signOutAction('/login')
        .then(() => {
            console.log('logout successful');
        })
        .catch((e) => {
            console.error(e);
        });
}

function ProfileAvatar({ user }: { user: User }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Avatar
                src={user.image ?? undefined}
                alt={user.handle ?? user.name ?? ''}
                sx={{ width: 32, height: 32 }}
            />

            <Typography variant="body2">
                {user.handle ?? user.name}
            </Typography>

            <Button onClick={signOutAndRedirect} color="secondary">
                Sign out
            </Button>
        </Box>
    )
}
