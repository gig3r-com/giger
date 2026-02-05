import { alpha, Box, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';

type TabItem = {
    label: string;
    content: ReactNode;
    icon?: ReactNode;          // optional icon
    dividerAfter?: boolean;    // optional divider after this tab
    sectionComment?: string;   // optional small text above label
}

type VerticalTabsProps = {
    tabs: TabItem[];
    initialTab?: number;
    labelWidth?: number;
}

export function VerticalTabs({
                                 tabs,
                                 initialTab = 0,
                                 labelWidth = 120,
                             }: VerticalTabsProps) {
    const [activeIndex, setActiveIndex] = useState(initialTab);

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: `${labelWidth}px 1fr`,
                columnGap: 0,
                height: '100%',
            }}
        >
            {/* Tab labels */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {tabs.map((tab, index) => (
                    <Box key={index}>
                        {/* Optional section comment */}
                        {tab.sectionComment && (
                            <Typography
                                sx={{
                                    fontSize: 10,
                                    color: 'text.primary',
                                    textAlign: 'left',
                                    padding: '0 8px 0',
                                    lineHeight: 1.2,
                                    marginBottom: '2px',
                                    userSelect: 'none',

                                }}
                            >
                                - {tab.sectionComment} -
                            </Typography>
                        )}

                        {/* Tab label + icon */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row-reverse',
                            }}
                        >
                            <Typography
                                onClick={() => setActiveIndex(index)}
                                sx={(theme) => ({
                                    fontSize: 12,
                                    textAlign: 'right',
                                    whiteSpace: 'nowrap',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    padding: '4px 8px',
                                    flex: 1,
                                    backgroundColor:
                                        index === activeIndex
                                            ? alpha(theme.palette.primary.main, 0.3)
                                            : 'transparent',
                                    color:
                                        index === activeIndex
                                            ? theme.palette.text.primary
                                            : theme.palette.text.secondary,
                                    '&:hover': {
                                        backgroundColor:
                                            index === activeIndex
                                                ? undefined
                                                : alpha(theme.palette.text.primary, 0.04),
                                    },
                                })}
                            >
                                {tab.label}
                            </Typography>
                            {tab.icon && (
                                <Box sx={{ marginRight: 4, display: 'flex', alignItems: 'center' }}>
                                    {tab.icon}
                                </Box>
                            )}
                        </Box>

                        {/* Optional divider after this tab */}
                        {tab.dividerAfter && (
                            <Box
                                sx={(theme) => ({
                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                    margin: '8px 0 2px',
                                })}
                            />
                        )}
                    </Box>
                ))}
            </Box>

            {/* Tab content with divider */}
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    borderLeft: `1px solid ${theme.palette.divider}`,
                })}
            >
                {tabs[activeIndex]?.content}
            </Box>
        </Box>
    );
}
