import { styled } from '@mui/material/styles';
import Paper, { PaperProps } from '@mui/material/Paper';
import Stack, { StackProps } from '@mui/material/Stack';
import { useMemo } from 'react';

export interface StyledBubbleProps extends PaperProps {
  fullWidth?: boolean,
  vertical: 'top' | 'center' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  color?: string,
  secondaryColor?: string,
}

export interface WrapperProps extends StackProps {
  fullWidth?: boolean,
  vertical: 'top' | 'center' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

const bigRadius = 16;
const smallRadius = 4;

function hexToRgba(hex: string, a: number) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return `rgba(255,255,255,${a})`;
  const r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export const StyledBubble = styled(Paper,{
  shouldForwardProp: (prop) =>
    prop !== 'theme' && prop !== 'fullWidth' && prop !== 'vertical' && prop !== 'horizontal' && prop !== 'color' && prop !== 'secondaryColor',
})<StyledBubbleProps>(({ theme, fullWidth, vertical, horizontal, color, secondaryColor }) => {
  const {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = useMemo(() => ({
    borderTopLeftRadius: vertical === 'top' && horizontal === 'left' ? smallRadius : bigRadius,
    borderTopRightRadius: vertical === 'top' && horizontal === 'right' ? smallRadius : bigRadius,
    borderBottomLeftRadius: vertical === 'bottom' && horizontal === 'left' ? smallRadius : bigRadius,
    borderBottomRightRadius: vertical === 'bottom' && horizontal === 'right' ? smallRadius : bigRadius,
  }), [vertical, horizontal]);

  const { borderTint, bgTint, glow} = useMemo(() => ({
    borderTint: hexToRgba(color, 0.38),
    bgTint: hexToRgba(color, 0.10),
    glow: hexToRgba(color, 0.18),
  }), [color]);

  const background = useMemo(() => {
    const base = `linear-gradient(180deg, rgba(17,22,29,.9), rgba(21,28,36,.9))`;
    const tint = `linear-gradient(0deg, ${bgTint}, ${bgTint})`; // your primary tint overlay
    if (!secondaryColor) return `${tint}, ${base}`;
    const secSolid = hexToRgba(secondaryColor, 0.35);
    const secFade  = hexToRgba(secondaryColor, 0);
    const bottomUp = `linear-gradient(to top, ${secSolid} 0%, ${secSolid} 44%, ${secFade} 78%)`;
    return `${tint}, ${bottomUp}, ${base}`;
  }, [bgTint, secondaryColor]);

  return {
    flex: 1,
    padding: theme.spacing(1.25),
    position: 'relative',
    borderColor: borderTint,
    ...(fullWidth
      ? { maxWidth: '100%' }
      : { maxWidth: 728 }),
    float: 'right',
    background,
    boxShadow: `0 0 0 2px ${glow}`,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  };
});

export const Wrapper = styled(Stack, {
  shouldForwardProp: (prop) =>
    prop !== 'fullWidth' && prop !== 'vertical' && prop !== 'horizontal',
})<WrapperProps>(({ fullWidth, horizontal }) => ({
  display: 'flex',
  width: '100%',
  ...(fullWidth
    ? { maxWidth: '100%' }
    : { maxWidth: 680 }),
  marginLeft: horizontal === 'right' ? 'auto' : 0,
  marginRight: horizontal === 'right' ? 0 : 'auto',
}));