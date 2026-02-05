'use client'

import React from 'react';
import Main from "@/components/layout/Main";
import LeftEdgePanel from "@/components/layout/LeftEdgePanel";
import { Typography } from "@mui/material";
import { RECORD_TYPES } from '@/constants';

function Page() {
    const [open, setOpen] = React.useState(false);
    const type = RECORD_TYPES[0];

    return (
        <>
            <LeftEdgePanel open={open} onOpenChange={setOpen}>
                <>…treść panelu…</>
            </LeftEdgePanel>
            <Main open={open} onOpenChange={setOpen}>
                <Typography variant="body1">
                    Tu jest Main. Zmienia szerokość płynnie razem z panelem.
                </Typography>
            </Main>
        </>
    );
}

export default Page;