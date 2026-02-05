'use client';

import * as React from 'react';
import Fuse from 'fuse.js';
import { Box, CircularProgress } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import type { InitStatus } from '@/store/useStore';
import { useStore } from '@/store/useStore';
import Section from './Section';

type Props = {
    search?: string
}

export function AllDataTreeView({ search, }: Props) {
    const entities = useStore(s => s.entities);
    const initStatus: InitStatus = useStore(s => s.initStatus);
    const fuseFilter = <T, >(list: T[], keys: string[]): T[] => {
        if (!search) return list;
        const fuse = new Fuse(list, { keys, threshold: 0.3 });
        return fuse.search(search).map(r => r.item);
    };

    /** Loading / error */
    if (initStatus === 'idle' || initStatus === 'loading') {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" p={ 2 }>
                <CircularProgress size={ 20 }/>
            </Box>
        );
    }

    if (initStatus === 'error') {
        return (
            <Box color="red" p={ 2 }>
                Failed to load data
            </Box>
        );
    }

    return (
        <Box sx={ { fontSize: 13, borderRadius: 1 } }>
            <SimpleTreeView
                slots={ {
                    expandIcon: ChevronRightIcon,
                    collapseIcon: ExpandMoreIcon,
                } }
                sx={ {
                    '& .MuiTreeItem-content': {
                        paddingY: 0.25,
                    },
                } }
            >
                { Object.keys(entities).map((entityName) => {
                    return <Section key={entityName} id={entityName} search={search} fuseFilter={fuseFilter} />
                }) }
            </SimpleTreeView>
        </Box>
    );
}