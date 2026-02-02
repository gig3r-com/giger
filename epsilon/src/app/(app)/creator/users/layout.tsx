'use client';

import React, { useState, type ChangeEvent, type ReactNode } from 'react';
import Main from '@/components/layout/Main';
import LeftEdgePanel from '@/components/layout/LeftEdgePanel';
import { Stack, TextField, Typography } from '@mui/material';
import UserList from './_components/UserList';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const title = (
        <Stack direction="row" gap={2} alignItems="center" sx={{ width: '100%' }}>
            <Typography>Users</Typography>
            <TextField
                size="small"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search..."
                sx={{ flex: 1 }}
            />
        </Stack>
    );

    return (
        <>
            <LeftEdgePanel title={title} open={open} onOpenChange={setOpen}>
                <UserList useMockData search={search} />
            </LeftEdgePanel>
            <Main open={open}>{children}</Main>
        </>
    );
};

export default Layout;
