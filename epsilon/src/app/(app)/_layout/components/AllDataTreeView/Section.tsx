import React, { useMemo } from 'react';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useStore } from '@/store/useStore';
import { useFormsStore } from '@/store/formsStore';
import type { ConfigsById } from './config';
import { configsById } from './config';
import { useHighlightText } from '@/app/(app)/_layout/components/AllDataTreeView/useHighlightText';

type SectionId = keyof ConfigsById;

type SectionProps<ID extends SectionId = SectionId> = {
    id: ID;
    fuseFilter: <T>(
        list: T[],
        keys: (keyof T)[]
    ) => T[];
    search: string;
};

function Section<ID extends SectionId>({ id, fuseFilter, search, }: SectionProps<ID>) {
    const highlightText = useHighlightText(search);
    const { addTab } = useFormsStore();
    const entities = useStore(s => s.entities);
    const statusesOfEntities = useStore(s => s.status.entities);

    const config = configsById[id];
    if (!config) return null;

    const { Icon, type, makeLabel, filterOptions } = config;

    type Entity = Parameters<typeof makeLabel>[0];

    const list = useMemo(
        () => Object.values(entities[id] as Record<string, Entity>),
        [entities, id]
    );

    const filteredList = useMemo(
        () => fuseFilter(list, filterOptions),
        [search, list, filterOptions]
    );

    const status = statusesOfEntities[id]; // 'idle' | 'loading' | 'ready' | 'error'
    if (id === 'users') console.log(status);

    return (
        <TreeItem
            itemId={ `${ id }` }
            label={
                <Box display="flex" alignItems="center" gap={ 0.5 }>
                    <span>{ capitalize(id) }</span>
                    <span>({ renderSectionMeta(status, filteredList.length) })</span>
                </Box>
            }
        >

            { filteredList.map((data) => {
                const label = makeLabel(data);

                const onClick = () =>
                    addTab({ id: data.id, name: label, type, data, });

                return (
                    <TreeItem
                        key={ data.id }
                        itemId={ `${ id }-${ data.id }` }
                        onClick={ onClick }
                        label={
                            <Box display="flex" alignItems="center" gap={ 0.5 }>
                                <Icon fontSize="inherit"/>
                                { highlightText(label) }
                            </Box>
                        }
                    />
                );
            }) }
        </TreeItem>
    );
}

const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1);

function renderSectionMeta(
    status: 'idle' | 'loading' | 'ready' | 'error',
    count: number
) {
    switch (status) {
        case 'loading':
            return <CircularProgress size={ 12 }/>;
        case 'ready':
            return <Typography component="span" color="primary">{ count }</Typography>;
        case 'error':
            return <Typography component="span" color="error">ERROR!</Typography>;
        case 'idle':
        default:
            return <Typography component="span" color="warning">-</Typography>;
            ;
    }
}

export default Section;
