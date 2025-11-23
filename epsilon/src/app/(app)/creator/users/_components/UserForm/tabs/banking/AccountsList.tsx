import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Chip,
    IconButton,
    Radio,
    Stack,
    Typography,
    Tooltip,
    Button,
} from '@mui/material';

import type { Account } from '@/notes';
import Card from '@/components/forms/Card';
import BoxList from '@/components/forms/BoxList';
import BoxListItem from '@/components/forms/BoxListItem';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BoltIcon from '@mui/icons-material/Bolt';

interface Props {
    accounts: Account[];
    selectedAccountId: string | null;
    mainAccountNumber?: string | null;
    onSelectAccount: (id: string) => void;
    onRemoveAccount: (account: Account) => void;
    onSetMainAccount: (account: Account) => void;
    onOpenAddDialog: () => void;
    canAdd: boolean;
}

const AccountsList: React.FC<Props> = ({
                                           accounts,
                                           selectedAccountId,
                                           mainAccountNumber,
                                           onSelectAccount,
                                           onRemoveAccount,
                                           onSetMainAccount,
                                           onOpenAddDialog,
                                           canAdd,
                                       }) => {
    const isMain = (account: Account) =>
        !!mainAccountNumber && mainAccountNumber === account.accountNumber;

    if (!accounts.length) {
        return (
            <Card title="Accounts" sx={{ height: '100%' }}
                  action={<Button size="small" startIcon={<AddIcon />} onClick={onOpenAddDialog} disabled={!canAdd}>Add</Button>}
            >
                <CardContent>
                    <Typography
                        variant="body2"
                        sx={{ opacity: 0.8, fontStyle: 'italic', marginTop: 1 }}
                    >
                        This user has no registered accounts yet.
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    /*

     */
    return (
        <Card title="Accounts" subTitle="Select an account to inspect its flow." sx={{ height: '100%' }} contentSx={{ pl: 0, pr: 0 }}
              action={<Button size="small" startIcon={<AddIcon />} onClick={onOpenAddDialog} disabled={!canAdd}>Add</Button>}
        >
                <BoxList>
                    {accounts.map((account) => {
                        const isSelected = selectedAccountId === account.id;
                        const main = isMain(account);
                        const isBusiness = account.type === 'BUSINESS';
                        const name = isBusiness ? ((account as any).name as string | undefined) : undefined;

                        return (
                            <BoxListItem
                                key={account.id}
                                onClick={() => onSelectAccount(account.id)}
                                value={''}
                                selected={isSelected}
                                title={ isBusiness ?
                                    <>
                                        <Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                                            {name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ fontFamily: 'monospace', opacity: 0.85, }}>
                                            {account.accountNumber}
                                        </Typography>
                                    </> :
                                    <Typography variant="body2" sx={{fontFamily: 'monospace', fontWeight: 600, }}>
                                        {account.accountNumber}
                                    </Typography> }
                                actions={ <>
                                    { main && (
                                        <Chip
                                            size="small"
                                            label="MAIN"
                                            sx={(theme) => ({
                                                height: 18,
                                                fontSize: '0.6rem',
                                                borderRadius: 999,
                                                border: `1px solid ${alpha(theme.palette.primary.main, 0.7)}`,
                                                backgroundColor: alpha(theme.palette.primary.main, 0.14),
                                            })}
                                        />
                                    ) }
                                    <Tooltip title="Set as main account">
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSetMainAccount(account);
                                            }}
                                        >
                                            <BoltIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Remove from this user">
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemoveAccount(account);
                                            }}
                                        >
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </> }
                                main={
                                <>
                                    <Chip
                                        size="small"
                                        label={account.type === 'BUSINESS' ? 'BUSINESS' : 'PRIVATE'}
                                        sx={(theme) => ({
                                            height: 20,
                                            fontSize: '0.65rem',
                                            borderRadius: 999,
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.6)}`,
                                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                        })}
                                    />
                                    <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
                                        {account.balance >= 0 ? '+' : '-'}
                                        {Math.abs(account.balance ?? 0).toLocaleString('en-US', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}{' '}
                                        ¤
                                    </Typography>
                                </>
                                }
                                caption={ `Owners: ${account.owners.join(', ')}` }
                            />
                        );
                    })}
                </BoxList>
        </Card>
    )
};

export default AccountsList;
