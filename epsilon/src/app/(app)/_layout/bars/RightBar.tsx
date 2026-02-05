'use client'

import React from 'react'
import { Box, Divider, Typography, useTheme } from '@mui/material'
import { Info, } from '@mui/icons-material'
import { alpha } from '@mui/material/styles'
import { useEpsilon } from '@/modules/epsilon/context'
import type { RightPanelModes } from '@/modules/epsilon/types'
import SquareIconButton from '@/components/common/SquareIconButton'

/* =======================
   Types
======================= */

type SectionItemButton = {
    type: 'item'
    icon: React.ReactNode
    mode: RightPanelModes
}

type SectionItemDivider = {
    type: 'divider'
    label?: string
}

type SectionItem = SectionItemButton | SectionItemDivider

type Section = {
    items: SectionItem[]
}

/* =======================
   Sections
======================= */

const sectionsTop: Section[] = [
    {
        items: [
            { type: 'item', icon: <Info />, mode: 'OTHER' },
        ],
    },
]

const sectionsBottom: Section[] = []

/* =======================
   Component
======================= */

export function RightBar() {
    const theme = useTheme()
    const {
        rightPanelMode,
        isRightPanelOpened,
        setIsRightPanelOpened,
        setRightPanelMode,
    } = useEpsilon()

    const select = (mode: RightPanelModes) => {
        if (mode === rightPanelMode && isRightPanelOpened) {
            setIsRightPanelOpened(false)
        } else {
            setRightPanelMode(mode)
            setIsRightPanelOpened(true)
        }
    }

    const renderItem = (item: SectionItem, key: string) => {
        if (item.type === 'divider') {
            return (
                <Divider
                    key={key}
                    sx={{
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
                    }}
                >
                    {item.label && (
                        <Typography
                            variant="caption"
                            sx={{
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
                            }}
                        >
                            {item.label}
                        </Typography>
                    )}
                </Divider>
            )
        }

        const isSelected =
            isRightPanelOpened && rightPanelMode === item.mode

        return (
            <Box
                key={key}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <SquareIconButton
                    onClick={() => select(item.mode)}
                    sx={{
                        color: isSelected
                            ? theme.palette.secondary.main
                            : 'inherit',

                        backgroundColor: isSelected
                            ? alpha(theme.palette.secondary.main, 0.15)
                            : 'transparent',

                        '&:hover': {
                            backgroundColor: alpha(
                                theme.palette.secondary.main,
                                isSelected ? 0.22 : 0.08
                            ),
                        },
                    }}
                >
                    {item.icon}
                </SquareIconButton>
            </Box>
        )
    }

    const renderSections = (sections: Section[]) =>
        sections.map((section, sectionIndex) => (
            <Box
                key={`section-${sectionIndex}`}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                }}
            >
                {section.items.map((item, itemIndex) =>
                    renderItem(
                        item,
                        `section-${sectionIndex}-item-${itemIndex}`
                    )
                )}
            </Box>
        ))

    return (
        <Box
            sx={{
                flex: 0,
                display: 'flex',
                flexDirection: 'column',
                py: 1,
                pr: 1,
                height: '100%',
                gap: 1,
            }}
        >
            {/* Top sections */}
            {renderSections(sectionsTop)}

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Bottom sections */}
            {renderSections(sectionsBottom)}
        </Box>
    )
}

export default RightBar
