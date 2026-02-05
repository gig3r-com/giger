import React from 'react';
import { Box, } from '@mui/material';
import { SearchInput, AllDataTreeView } from '../../components';
import { useEpsilon } from '@/modules/epsilon/context';

export function Files() {
    const { leftPanelSearch } = useEpsilon();

    return (
        <Box
            sx={ {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                p: 2,
            } }
        >
            <Box sx={ { pb: 1 } }>
                <SearchInput/>
            </Box>
            <Box
                sx={ {
                    flex: 1,
                    overflow: 'auto',
                    minHeight: 0,
                    height: '100%',
                } }
            >
                <AllDataTreeView search={ leftPanelSearch } />
            </Box>
        </Box>
    );
}

export default Files;