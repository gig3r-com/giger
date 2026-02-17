import { styled } from '@mui/material/styles';
import Paper, { PaperProps } from '@mui/material/Paper';
import Chip, { ChipProps } from '@mui/material/Chip';

interface ChatBubbleProps extends PaperProps {
  right?: boolean;
  hacked?: boolean;
  focused?: boolean;
  radius?: number;
  tint?: string;
  hackBg?: string;
  hackBorder?: string;
  borderTint?: string;
  glow?: string;
  isGroupStart?: boolean;
}

export const ChatBubble = styled(Paper)<ChatBubbleProps>(({ theme, right, hacked, focused, radius = 12, tint = '#0E141B',
                       hackBg = '#1B2A3A', hackBorder = '#2C99FF', borderTint = '#22303C',
                       glow = 'rgba(44,153,255,.45)', isGroupStart }) => {
  const baseGradient = `linear-gradient(180deg, rgba(17,22,29,.9), rgba(21,28,36,.9))`;
  const overlay = `linear-gradient(0deg, ${hacked ? hackBg : tint}, ${hacked ? hackBg : tint})`;

  return {
    position: 'relative',
    padding: theme.spacing(1.25),
    borderRadius: radius,
    borderColor: hacked ? hackBorder : borderTint,
    background: `${overlay}, ${baseGradient}`,
    boxShadow: focused ? `0 0 0 2px ${glow}` : `0 0 12px ${glow}`,
    // maxWidth: 'min(680px, 100%)',
    // marginLeft: right ? 'auto' : 0,
    // marginRight: right ? 0 : 'auto',
    borderTopLeftRadius: right ? radius : (isGroupStart ? radius : 6),
    borderTopRightRadius: right ? (isGroupStart ? radius : 6) : radius,
    borderBottomLeftRadius: right ? radius : 6,
    borderBottomRightRadius: right ? 6 : radius,
    '&:focus-visible': {
      outline: `2px solid ${glow}`,
      outlineOffset: 2,
    },
  };
});

interface HackedChipProps extends ChipProps {
  isHacked?: boolean;
}

export const HackedChip = styled(Chip)<HackedChipProps>(({ isHacked, }) => {
  const collapsedWidth = 34;
  const expandedWidth = 220;

  return {
    width: isHacked ? expandedWidth : collapsedWidth,
    transition: "width 220ms ease, background-color 200ms ease",
    overflow: "hidden",
    "& .MuiChip-label": {
      transition: "opacity 120ms ease",
      px: 0.5,
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 0.5,
    },
    height: 34,
  };
});
