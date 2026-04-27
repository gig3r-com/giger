import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableRow,
  Avatar,
  Stack,
  Typography,
  Skeleton,
  IconButton,
} from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useUsers } from '@/components/modules/users/context';
import TableActionCell from '@/components/common/TableActionCell';
import Tooltip from '@mui/material/Tooltip';
import { useModal } from '@/contexts/ModalProvider';
import NetworkForm from '@/components/forms/NetworkForm';
import { redirect } from 'next/navigation';

// simple helper
const titleCase = (s?: string) =>
  (s ?? '')
    .toLowerCase()
    .replace(/(^|\s|_|-)+(\w)/g, (_, __, c) => ` ${c.toUpperCase()}`)
    .trim();

const UserRow = memo(function UserRow({ userHandle, onClick }) {
  const { usersByHandle, isLoading } = useUsers();
  const { open } = useModal();
  const user = usersByHandle?.[userHandle];
  const loading = isLoading && !user;

  const fullName =
    `${user?.name ?? ''} ${user?.surname ?? ''}`.trim() || '—';

  const handle = user?.handle ?? userHandle ?? '—';
  const type = titleCase(user?.typeActual) || '—';
  const factionRankActual = titleCase(user?.factionRankActual) || '—';
  const factionRankPublic = titleCase(user?.factionRankPublic) || '—';

  const openMoveForm = useCallback(() => {
    open({
      title: 'Move to new subnetwork',
      content: <NetworkForm network={ user.networkName } subnetwork={ user.subnetworkId } onSubmit={
        async (values, { setSubmitting, setStatus }) => {
          console.log(values)
          try {
            const res = await fetch(`/api/subnetworks/${values.subnetwork.id}/${user.id}`, {
              method: 'PUT',
              body: JSON.stringify({}),
            });

            if (!res.ok) {
              const err = await res.json().catch(() => ({}));
              throw new Error(err?.error || `Request failed (${res.status})`);
            }

            const data = await res.json();
            setStatus({ ok: true, message: 'Updated!' });
            // do something with data …
          } catch (e: any) {
            setStatus({ ok: false, message: e.message });
          } finally {
            setSubmitting(false);
          }
        }
      } />
    })
  }, [user]);

  return (
    <TableRow
      hover
      onClick={onClick}
      sx={{ cursor: onClick ? 'pointer' : 'default' }}
      aria-label={`User ${handle}`}
    >
      {/* Handle */}
      <TableCell width={160} sx={{ whiteSpace: 'nowrap' }}>
        {loading ? (
          <Skeleton variant="text" width={100} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            @{handle}
          </Typography>
        )}
      </TableCell>

      {/* Name + avatar */}
      <TableCell width={260}>
        {loading ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="circular" width={28} height={28} />
            <Skeleton variant="text" width={160} />
          </Stack>
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ width: 28, height: 28 }}>
              { type === 'Human' ? 'H' : type === 'Android' ? 'A' : 'AI' }
            </Avatar>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {fullName}
            </Typography>
          </Stack>
        )}
      </TableCell>

      <TableCell width={160}>
        {loading ? <Skeleton variant="text" width={90} /> : <Typography>{factionRankActual}</Typography>}
      </TableCell>

      <TableCell width={160}>
        {loading ? <Skeleton variant="text" width={90} /> : <Typography>{factionRankPublic}</Typography>}
      </TableCell>

      <TableActionCell>
        <Tooltip title="Edit in form">
          <span>
          <IconButton onClick={ () => redirect(`/users/${handle}`) } sx={{ mr: 1, }}>
            <EditIcon />
          </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Move to different subnetwork / network">
          <span>
          <IconButton onClick={openMoveForm}>
            <ChangeCircleIcon />
          </IconButton>
          </span>
        </Tooltip>
      </TableActionCell>
    </TableRow>
  )
    ;
});

UserRow.propTypes = {
  userHandle: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default UserRow;
