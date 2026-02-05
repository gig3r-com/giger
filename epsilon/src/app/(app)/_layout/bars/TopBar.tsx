'use client';

import React from 'react';
import { Box, } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainNavMenu from '@/app/(app)/components/MainNavMenu';
import NavBridge from '@/app/(app)/components/NavBridge';
import SecNavMenu from '@/app/(app)/components/SecNavMenu';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { signOutAction } from '@/actions/auth';
import Avatar from '@mui/material/Avatar';
import GlitchTitle from '@/components/common/GlitchTitle';
import { TOP_BAR_HEIGHT } from '@/app/(app)/_layout/constants';

export function TopBar({ user }) {
    return (
        <Stack direction="row" alignItems="center" sx={ { gap: 3, px: 2, height: TOP_BAR_HEIGHT, } }>
            <GlitchTitle>EPSILON</GlitchTitle>
            <MainNavMenu value={ 0 }/>
            <NavBridge>
                <SecNavMenu/>
            </NavBridge>
            <ProfileSection user={ user }/>
        </Stack>
    );
}

function ProfileSection({ user }: { user: User | null }) {
    if (user) {
        return <ProfileAvatar user={ user }/>;
    }

    return (
        <Link href="/login">
            <Button color="primary">
                Sign in
            </Button>
        </Link>
    );
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
        <Box sx={ { display: 'flex', alignItems: 'center', gap: 1.25 } }>
            <Avatar
                src={ user.image ?? undefined }
                alt={ user.handle ?? user.name ?? '' }
                sx={ { width: 32, height: 32 } }
            />

            <Typography variant="body2">
                { user.handle ?? user.name }
            </Typography>

            <Button onClick={ signOutAndRedirect } color="secondary">
                Sign out
            </Button>
        </Box>
    );
}

export default TopBar;