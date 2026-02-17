import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Radio,
    Stack,
    Typography,
} from '@mui/material';

import type { Account } from '@/notes';

const OptionBox = styled(Box)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    padding: theme.spacing(1),
    transition: 'all 0.15s ease-out',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
}));

interface Props {
    open: boolean;
    availableAccounts: Account[];
    onClose: () => void;
    onAdd: (account: Account) => void;
}

const AddAccountDialog: React.FC<Props> = ({
                                               open,
                                               availableAccounts,
                                               onClose,
                                               onAdd,
                                           }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;
        if (!availableAccounts.length) {
            setSelectedId(null);
            return;
        }
        const first = availableAccounts[0];
        setSelectedId(first.id ?? first.accountNumber);
    }, [open, availableAccounts]);

    const handleConfirm = () => {
        if (!selectedId) return;
        const acc =
            availableAccounts.find(
                (a) => a.id === selectedId || a.accountNumber === selectedId,
            ) ?? null;
        if (!acc) return;
        onAdd(acc);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Add account to this user</DialogTitle>
            <DialogContent dividers>
                {availableAccounts.length === 0 ? (
                    <Typography
                        variant="body2"
                        sx={{ opacity: 0.8, fontStyle: 'italic', marginTop: 1 }}
                    >
                        All mock accounts are already attached to this user.
                    </Typography>
                ) : (
                    <Stack spacing={1.25} sx={{ marginTop: 1 }}>
                        {availableAccounts.map((acc) => {
                            const isBusiness = acc.type === 'BUSINESS';
                            const name = isBusiness
                                ? ((acc as any).name as string | undefined)
                                : undefined;
                            const valueKey = acc.id ?? acc.accountNumber;
                            const isSelected = selectedId === valueKey;

                            return (
                                <OptionBox
                                    key={valueKey}
                                    sx={(theme) => ({
                                        borderColor: isSelected
                                            ? theme.palette.primary.main
                                            : theme.palette.divider,
                                        backgroundColor: isSelected
                                            ? alpha(theme.palette.primary.main, 0.06)
                                            : theme.palette.background.paper,
                                    })}
                                    onClick={() => setSelectedId(valueKey)}
                                >
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Radio checked={isSelected} size="small" />
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            {isBusiness && name ? (
                                                <>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        {name}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontFamily: 'monospace',
                                                            opacity: 0.85,
                                                        }}
                                                    >
                                                        {acc.accountNumber}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {acc.accountNumber}
                                                </Typography>
                                            )}
                                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                                {acc.type === 'BUSINESS'
                                                    ? 'Business account'
                                                    : 'Private account'}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </OptionBox>
                            );
                        })}
                    </Stack>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    disabled={!availableAccounts.length || !selectedId}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAccountDialog;
