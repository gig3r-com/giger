import { Box, useTheme } from '@mui/material';
import React, { useCallback } from 'react';

export const useHighlightText = (search?: string) => {
    const theme = useTheme();

    return useCallback((text: string) => {
        if (!search) return text;
        const parts = text.split(new RegExp(`(${search})`, 'gi'));

        return (
            <>
                { parts.map((part, i) =>
                    part.toLowerCase() === search.toLowerCase() ? (
                        <Box
                            key={ i }
                            component="span"
                            sx={ {
                                bgcolor: theme.palette.primary.main,
                                color: 'black',
                                borderRadius: 0,
                                px: 0,
                                mx: 0,
                            } }
                        >
                            { part }
                        </Box>
                    ) : (
                        part
                    )
                ) }
            </>
        );
    }, []);
};