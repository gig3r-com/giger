'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper, { PaperProps } from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { SxProps, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

export interface LeftEdgePanelProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;

    width?: number | string;
    collapsedSize?: number;
    margin?: number;

    topOffset?: number | string;
    offsetByAppBar?: boolean;
    appBarToolbarVariant?: 'regular' | 'dense';

    title?: React.ReactNode;
    elevation?: number;
    sx?: SxProps<Theme>;
    PaperProps?: Partial<PaperProps>;
    children?: React.ReactNode;
    id?: string;
}

type OwnerState = {
    open: boolean;
    width: number | string;
    collapsedSize: number;
    margin: number;
    elevation: number;
    topOffsetCss: string;
};

const Root = styled(Paper, {
    name: 'LeftEdgePanel',
    slot: 'Root',
})<{ ownerState: OwnerState }>(({ theme, ownerState }) => {
    const { open, width, collapsedSize, margin, topOffsetCss } = ownerState;

    const topCss = `calc(${margin}px + ${topOffsetCss} + 16)`;
    const heightOpenCss = `calc(100dvh - (${topOffsetCss}) - ${margin * 2}px - 32px)`;

    return {
        position: 'fixed',
        left: margin,
        top: topCss,
        height: open ? heightOpenCss : collapsedSize,
        width: open ? width : collapsedSize,
        zIndex: theme.zIndex.drawer + 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: open ? theme.shape.borderRadius : theme.shape.borderRadius,
        justifyContent: 'center',
        transition: theme.transitions.create(
            ['width', 'height', 'border-radius', 'box-shadow', 'top'],
            {
                duration: theme.transitions.duration.standard,
                easing: theme.transitions.easing.easeInOut,
            },
        ),
        boxShadow: open ? theme.shadows[8] : theme.shadows[2],
        willChange: 'width, height, top',
        backgroundColor: theme.palette.background.paper,
        ['@media (prefers-reduced-motion: reduce)']: {
            transition: 'none',
        },
    };
});

const Header = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1.25),
    paddingLeft: theme.spacing(2),
    minHeight: 48,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Body = styled('div')(({ theme }) => ({
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
    padding: theme.spacing(1.5),
}));

const CollapseButton = styled(IconButton)(() => ({
    borderRadius: 8,
}));

const ExpandButton = styled(IconButton)(() => ({
    width: '100%',
    height: '100%',
    borderRadius: 8,
}));

export const LeftEdgePanel = React.forwardRef<HTMLDivElement, LeftEdgePanelProps>(
    function LeftEdgePanel(props, ref) {
        const {
            open: openProp,
            defaultOpen = false,
            onOpenChange,
            width = 360,
            collapsedSize = 48,
            margin = 8,
            elevation = 3,
            title,
            sx,
            PaperProps,
            children,
            id,
            topOffset,
            offsetByAppBar = true,
            appBarToolbarVariant = 'regular',
        } = props;

        const theme = useTheme();
        const upSm = useMediaQuery(theme.breakpoints.up('sm'));

        const autoToolbarHeight =
            appBarToolbarVariant === 'dense'
                ? 48
                : (upSm ? 64 : 56);

        const resolvedTopOffset =
            topOffset !== undefined
                ? topOffset
                : (offsetByAppBar ? autoToolbarHeight : 0);

        const topOffsetCss =
            typeof resolvedTopOffset === 'number'
                ? `${resolvedTopOffset}px`
                : resolvedTopOffset;

        const isControlled = openProp !== undefined;
        const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>(defaultOpen);
        const open = isControlled ? Boolean(openProp) : uncontrolledOpen;

        const setOpen = (next: boolean) => {
            if (!isControlled) setUncontrolledOpen(next);
            onOpenChange?.(next);
        };

        const ownerState: OwnerState = {
            open,
            width,
            collapsedSize,
            margin,
            elevation,
            topOffsetCss,
        };

        return (
            <Root
                ref={ref}
                role="complementary"
                aria-expanded={open}
                aria-controls={id ? `${id}-content` : undefined}
                elevation={elevation}
                ownerState={ownerState}
                sx={sx}
                {...PaperProps}
            >
                {open ? (
                    <>
                        <Header>
                            { title ? title : (
                                <Box sx={{ flex: 1 }} />
                            ) }
                            <CollapseButton
                                size="small"
                                aria-label="Zwiń panel"
                                onClick={() => setOpen(false)}
                            >
                                <ChevronLeftIcon />
                            </CollapseButton>
                        </Header>
                        <Body id={id ? `${id}-content` : undefined}>
                            {children}
                        </Body>
                    </>
                ) : (
                    <ExpandButton
                        aria-label="Otwórz panel"
                        onClick={() => setOpen(true)}
                        title="Otwórz"
                    >
                        <ChevronRightIcon />
                    </ExpandButton>
                )}
            </Root>
        );
    },
);

export default LeftEdgePanel;