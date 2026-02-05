'use client';

import React from 'react';
import { IconButton, InputAdornment, TextField, } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import { useEpsilon } from '@/modules/epsilon/context';

type SearchInputProps = {
    placeholder?: string
    autoFocus?: boolean
}

export function SearchInput({
                                placeholder = 'Search…',
                                autoFocus = false,
                            }: SearchInputProps) {
    const {
        leftPanelSearch,
        setLeftPanelSearch,
    } = useEpsilon();

    return (
        <TextField
            fullWidth
            size="small"
            autoFocus={ autoFocus }
            placeholder={ placeholder }
            value={ leftPanelSearch }
            onChange={ (e) => setLeftPanelSearch(e.target.value) }
            onKeyDown={ (e) => {
                if (e.key === 'Escape') {
                    setLeftPanelSearch('');
                }
            } }
            slotProps={ {
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            { leftPanelSearch && (
                                <IconButton
                                    size="small"
                                    aria-label="Clear search"
                                    onClick={ () => setLeftPanelSearch('') }
                                >
                                    <Clear fontSize="small"/>
                                </IconButton>
                            ) }
                            <Search fontSize="small"/>
                        </InputAdornment>
                    ),
                },
            } }
        />
    );
}

export default SearchInput;
