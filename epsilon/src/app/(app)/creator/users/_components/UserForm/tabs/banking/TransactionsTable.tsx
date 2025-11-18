import React from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

import Card from '@/components/forms/Card';
import type { Account, Transaction } from '@/notes';

const ScrollBox = styled(Box)(({ theme }) => ({
    overflow: 'auto',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
}));

const formatTimestamp = (ts: any): string => {
    if (!ts) return '-';

    let date: Date | null = null;

    if (typeof ts === 'string' || typeof ts === 'number') {
        const d = new Date(ts);
        if (!Number.isNaN(d.getTime())) {
            date = d;
        }
    } else if (ts?.toDate && typeof ts.toDate === 'function') {
        try {
            date = ts.toDate();
        } catch {
            date = null;
        }
    } else if (typeof ts === 'object' && 'seconds' in ts) {
        const seconds = (ts as { seconds: number }).seconds;
        date = new Date(seconds * 1000);
    }

    if (!date) return String(ts);

    return date.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const getAccountLabel = (account: Account) => {
    const base = account.type === 'BUSINESS' ? 'Business' : 'Private';

    if (account.type === 'BUSINESS' && (account as any).name) {
        const name = (account as any).name as string;
        return `${name} • ${account.accountNumber} • ${base}`;
    }

    return `${base} • ${account.accountNumber}`;
};

interface Props {
    account: Account | null;
}

const TransactionsTable: React.FC<Props> = ({ account }) => {
    const transactions = account?.transactions as Transaction[] | undefined;

    return (
        <Card title="Transactions" subTitle={account ? getAccountLabel(account) : 'No account selected'} sx={{ flex: 2 }} contentSx={{ pt: 2, pb: 4 }}>
            {!account || !transactions?.length ? (
                <Typography
                    variant="body2"
                    sx={{ opacity: 0.8, fontStyle: 'italic', marginTop: 2 }}
                >
                    No transactions for this account yet.
                </Typography>
            ) : (
                <ScrollBox>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Flow</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell>Ordering user</TableCell>
                                <TableCell>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions
                                .slice()
                                .reverse()
                                .map((tx) => {
                                    const isOutgoing = tx.from === account.accountNumber;
                                    const sign = isOutgoing ? '-' : '+';

                                    return (
                                        <TableRow key={tx.id} hover>
                                            <TableCell sx={{ maxWidth: 200 }}>
                                                <Typography variant="body2" noWrap title={tx.title}>
                                                    {tx.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="caption"
                                                    sx={{ fontFamily: 'monospace' }}
                                                >
                                                    {tx.from}
                                                    {' \u2192 '}
                                                    {tx.to}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {sign}
                                                    {tx.amount.toLocaleString('en-US', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                    })}{' '}
                                                    ¤
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">
                                                    {tx.orderingUser}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">
                                                    {formatTimestamp(tx.timestamp as any)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </ScrollBox>
            )}
        </Card>
    );
};

export default TransactionsTable;
