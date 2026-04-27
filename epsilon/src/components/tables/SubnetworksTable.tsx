import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { SubnetworkType } from '@/types'
import { useMemo } from 'react';

export interface SubnetworksTableProps {
  subnetworks: SubnetworkType[];
}

export interface SubnetworkRowProps {
  subnetwork: SubnetworkType;
}

export interface SubnetworkCellProps {
  children: string;
}

export default function SubnetworksTable({ subnetworks }: SubnetworksTableProps) {
  const rows = useMemo(() => {
    if (!Array.isArray(subnetworks)) return <EmptyRow />;
    return subnetworks.map(subnetwork =>
      <SubnetworkRow key={ subnetwork.id } subnetwork={ subnetwork } />)
  }, [ subnetworks ]);

  return (
    <TableContainer component={ Paper }>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Network</TableCell>
            <TableCell>Users</TableCell>
            <TableCell>Access Point</TableCell>
            <TableCell>Firewall</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SubnetworkRow({ subnetwork }: SubnetworkRowProps) {
  return (
    <TableRow hover>
      <SubnetworkCell>{subnetwork.name ?? "—"}</SubnetworkCell>
      <SubnetworkCell>{subnetwork.network ?? "—"}</SubnetworkCell>
      <SubnetworkCell>{subnetwork.users.length ? subnetwork.users.join(", ") : "—"}</SubnetworkCell>
      <SubnetworkCell>{subnetwork.accessPoint ?? "—"}</SubnetworkCell>
      <SubnetworkCell>{subnetwork.firewall ?? "—"}</SubnetworkCell>
    </TableRow>
  )
}

function SubnetworkCell({ children }: SubnetworkCellProps) {
  const cellSx = {
    maxWidth: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }

  return (
    <TableCell sx={cellSx} title={ children }>{children ?? "—"}</TableCell>
  )
}

function EmptyRow() {
  return (
    <TableRow>
      <TableCell colSpan={5}>No subnetworks found.</TableCell>
    </TableRow>
  )
}