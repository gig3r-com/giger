'use client'

import React, { useMemo, useState } from 'react';
import {
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  alpha
} from '@mui/material';
import { MetaBar, HeaderButton, Container, ExpandIcon } from './styles';
import UserRow from './UserRow';
import { SubnetworkType } from '@/types';

function EmptyRow() {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.disabled' }}>
        No users found
      </TableCell>
    </TableRow>
  );
}

function SubnetworkTable({ subnetwork }: { subnetwork: SubnetworkType }) {
  const [isOpen, setIsOpen] = useState(true);

  const rows = useMemo(() => {
    if (!subnetwork.users.length) return [<EmptyRow key="empty" />];
    return subnetwork.users.map((handle) => <UserRow key={ handle } userHandle={ handle } />);
  }, [subnetwork?.users]);

  return (
    <Box>
    <Container component={Paper}>
      <HeaderButton onClick={ () => setIsOpen((v) => !v) }>
        <Typography variant="h5" fontWeight={700} sx={{ py: 0.25 }}>
          {subnetwork.name}
        </Typography>
        <ExpandIcon sx={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </HeaderButton>

      <MetaBar direction="row" spacing={3} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          <strong>Access point:</strong> {subnetwork.accessPoint ?? '—'}
        </Typography>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="fw-label">Firewall</InputLabel>
          <Select label="Firewall" value={subnetwork?.firewall ?? ''} onChange={() => { /* no-op for now */ }} disabled>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="FIREWALL_X">FIREWALL_X</MenuItem>
            <MenuItem value="ENCRYPT_GUARD">ENCRYPT_GUARD</MenuItem>
          </Select>
        </FormControl>
      </MetaBar>

      <Collapse in={isOpen} timeout="auto">
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Handle</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Job</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </Collapse>
    </Container>
    </Box>
  );
}

export default SubnetworkTable;
