import { styled } from '@mui/material/styles';
import { Button, Stack, TableContainer } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Container = styled(TableContainer)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
}));

export const HeaderButton = styled(Button)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.25, 2),
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export const ExpandIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const MetaBar = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1.25, 2),
  borderBottom: `1px dashed ${theme.palette.divider}`,
  background: theme.palette.mode === 'dark'
    ? theme.palette.grey[900]
    : theme.palette.grey[50],
}));