'use client';

import React from 'react';
import { Box } from '@mui/material';
import { BottomBar, TopBar, } from './bars';
import { Main } from './Main';
import { useInitializeStore } from '@/hooks/useInitializeStore';

export function Layout({ children, session }: { children: React.ReactNode, session: any }) {
    useInitializeStore();

    return (
        <Box sx={ {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        } }>
            <TopBar user={ session?.user ?? null }/>
            <Main/>
            <BottomBar/>
        </Box>
    );
}

export default Layout;