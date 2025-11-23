import React from 'react';
import { alpha } from '@mui/material/styles';
import { Chip, Stack, Typography, } from '@mui/material';

import Select from '@/components/forms/Select';
import Input from '@/components/forms/Input';
import Card from '@/components/forms/Card';
import labels from '../../labels';
import { WEALTH_LEVELS } from '@/configs/UserSelectFields';

import SavingsIcon from '@mui/icons-material/Savings';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import BoltIcon from '@mui/icons-material/Bolt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

type Option = { value: string; label: string };

interface Props {
    totalBalance: number;
    accountCount: number;
    privateCount: number;
    businessCount: number;
    mainAccountNumber?: string | null;
    hasAccounts: boolean;
    mainAccountOptions: Option[];
}

const BankingSummary = ({ totalBalance, accountCount, privateCount, businessCount, mainAccountNumber, hasAccounts, mainAccountOptions, }: Props) => {
    return (
        <Stack direction="row" gap={2} alignItems="stretch">

            <Card variant="primary" icon={<SavingsIcon />} title={
                <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>
                    Net balance
                </Typography>
            } contentSx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {totalBalance.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })}{' '}
                    ¤
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, marginTop: 0.5 }}>
                    Across {accountCount || 'no'} accounts
                </Typography>
            </Card>

            <Card icon={<CreditScoreIcon />} title="Account mix">
                <Stack direction="column" spacing={2} flexWrap="wrap">
                    <AccountsChip label={`Private: ${privateCount}`} icon={<BoltIcon fontSize="small" />} />
                    <AccountsChip label={`Business: ${businessCount}`} icon={<SwapHorizIcon fontSize="small" />} />
                    <Select name="wealth" label={labels.wealth} options={WEALTH_LEVELS} />
                </Stack>
            </Card>

            <Card icon={<BoltIcon />} title="Main account"
                  subTitle={ mainAccountNumber ? 'mainAccountNumber' : 'No main account chosen yet.' }
            >
                { hasAccounts ? (
                    <Select
                        name="mainAccount"
                        label="Main account (account number)"
                        options={mainAccountOptions}
                        helperText="Choose which account should be treated as main."
                    />
                ) : (
                    <Typography
                        variant="body2"
                        sx={{ opacity: 0.8, fontStyle: 'italic', marginTop: 0.5 }}
                    >
                        This user has no registered accounts yet.
                    </Typography>
                ) }
            </Card>

            <Card variant="notes" title="Epsilon banking notes" subTitle="Off-game notes for writers about this character's finances.">
                <Input
                    color="epsilon"
                    name="epsilonBankingNotes"
                    label="Banking notes"
                    placeholder="Meta notes, hooks, secrets, planned twists about this character's banking and finances..."
                    multiline
                    minRows={3}
                />
            </Card>
        </Stack>
    );
};

function AccountsChip({ label, icon }) {
    return (
        <Chip
            size="small"
            label={label}
            icon={icon}
            sx={(theme) => ({
                borderRadius: 999,
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
                backgroundColor: alpha(theme.palette.secondary.main, 0.12),
            })}
        />
    )
}

export default BankingSummary;
