'use client';

import React from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { CodeSharp, DeviceHub, Folder } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useEpsilon } from '@/modules/epsilon/context';
import type { BottomPanelModes, LeftPanelModes, } from '@/modules/epsilon/types';
import SquareIconButton from '@/components/common/SquareIconButton';

/* =======================
   Types
======================= */

type SectionItemLeftButton = {
    type: 'left-item'
    icon: React.ReactNode
    mode: LeftPanelModes
}

type SectionItemBottomButton = {
    type: 'bottom-item'
    icon: React.ReactNode
    mode: BottomPanelModes
}

type SectionItemDivider = {
    type: 'divider'
    label?: string
}

type SectionItem =
    | SectionItemLeftButton
    | SectionItemBottomButton
    | SectionItemDivider

type Section = {
    items: SectionItem[]
}

/* =======================
   Sections
======================= */

const sectionsTop: Section[] = [
    {
        items: [
            { type: 'left-item', icon: <Folder/>, mode: 'FILES' },
            { type: 'left-item', icon: <DeviceHub/>, mode: 'NETWORKS' },
        ],
    },
];

const sectionsBottom: Section[] = [
    {
        items: [
            { type: 'divider' },
            { type: 'bottom-item', icon: <CodeSharp/>, mode: 'TERMINAL' },
        ],
    },
];

/* =======================
   Component
======================= */

export function LeftBar() {
    const theme = useTheme();
    const {
        leftPanelMode,
        isLeftPanelOpened,
        setIsLeftPanelOpened,
        setLeftPanelMode,

        bottomPanelMode,
        isBottomPanelOpened,
        setIsBottomPanelOpened,
        setBottomPanelMode,
    } = useEpsilon();

    const selectLeft = (mode: LeftPanelModes) => {
        if (mode === leftPanelMode && isLeftPanelOpened) {
            setIsLeftPanelOpened(false);
        } else {
            setLeftPanelMode(mode);
            setIsLeftPanelOpened(true);
        }
    };

    const selectBottom = (mode: BottomPanelModes) => {
        if (mode === bottomPanelMode && isBottomPanelOpened) {
            setIsBottomPanelOpened(false);
        } else {
            setBottomPanelMode(mode);
            setIsBottomPanelOpened(true);
        }
    };

    const renderItem = (item: SectionItem, key: string) => {
        if (item.type === 'divider') {
            return (
                <Divider
                    key={ key }
                    sx={ {
                        my: 0,
                        alignSelf: 'stretch',
                        borderColor: alpha(
                            theme.palette.text.primary,
                            0.3
                        ),
                        borderBottomWidth: 2,
                        textAlign: 'center',
                        '&::before, &::after': {
                            borderColor: alpha(
                                theme.palette.text.primary,
                                0.3
                            ),
                        },
                    } }
                >
                    { item.label && (
                        <Typography
                            variant="caption"
                            sx={ {
                                m: 0,
                                p: 0,
                                lineHeight: 1,
                                color: alpha(
                                    theme.palette.text.primary,
                                    0.6
                                ),
                                fontWeight: 600,
                                letterSpacing: 0.5,
                                textTransform: 'uppercase',
                            } }
                        >
                            { item.label }
                        </Typography>
                    ) }
                </Divider>
            );
        }

        const isSelected =
            item.type === 'left-item'
                ? isLeftPanelOpened && leftPanelMode === item.mode
                : isBottomPanelOpened && bottomPanelMode === item.mode;

        const onClick =
            item.type === 'left-item'
                ? () => selectLeft(item.mode)
                : () => selectBottom(item.mode);

        return (
            <Box
                key={ key }
                sx={ {
                    display: 'flex',
                    justifyContent: 'center',
                } }
            >
                <SquareIconButton
                    onClick={ onClick }
                    sx={ {
                        color: isSelected
                            ? theme.palette.primary.main
                            : 'inherit',

                        backgroundColor: isSelected
                            ? alpha(theme.palette.primary.main, 0.15)
                            : 'transparent',

                        '&:hover': {
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                isSelected ? 0.22 : 0.08
                            ),
                        },
                    } }
                >
                    { item.icon }
                </SquareIconButton>
            </Box>
        );
    };

    const renderSections = (sections: Section[]) =>
        sections.map((section, sectionIndex) => (
            <Box
                key={ `section-${ sectionIndex }` }
                sx={ {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                } }
            >
                { section.items.map((item, itemIndex) =>
                    renderItem(
                        item,
                        `section-${ sectionIndex }-item-${ itemIndex }`
                    )
                ) }
            </Box>
        ));

    return (
        <Box
            sx={ {
                flex: 0,
                display: 'flex',
                flexDirection: 'column',
                py: 1,
                pl: 1,
                height: '100%',
                gap: 1,
            } }
        >
            {/* Top sections */ }
            { renderSections(sectionsTop) }

            {/* Spacer */ }
            <Box sx={ { flexGrow: 1 } }/>

            {/* Bottom sections */ }
            { renderSections(sectionsBottom) }
        </Box>
    );
}

export default LeftBar;
