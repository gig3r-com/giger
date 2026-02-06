import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, alpha } from '@mui/material/styles';

const DimBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,                  // above drawers & app bar
  color: theme.palette.primary.main,               // spinner color
  backgroundColor: alpha(theme.palette.background.default, 0.6), // semi-transparent
}));

export default function Overlay() {
  return (
    <DimBackdrop open>
      <CircularProgress size={28} />
    </DimBackdrop>
  );
}
