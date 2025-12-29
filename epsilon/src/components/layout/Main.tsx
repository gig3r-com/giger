'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';

interface MainProps {
    open: boolean;
    children?: React.ReactNode;

    /** LeftEdgePanel width (must match panel, default = 360px) */
    panelWidth?: number;
}

const Root = styled('main')<{ open: boolean; panelWidth: number }>(
    ({ theme, open, panelWidth }) => ({
        position: 'relative',
        flex: 1,
        minWidth: 0,
        overflow: 'auto',

        marginLeft: open ? panelWidth : '48px',

        transition: theme.transitions.create(['margin-left'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
        }),
    })
);

export default function Main({ open, panelWidth = 360, children, }: MainProps) {
    return (
        <Root open={open} panelWidth={panelWidth}>
            {children}
        </Root>
    );
}
