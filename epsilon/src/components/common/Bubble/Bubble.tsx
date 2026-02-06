'use client';
import React, { memo, useMemo } from 'react';
import { Stack, SvgIconTypeMap } from '@mui/material';
import { StyledBubble, Wrapper } from '@/components/common/Bubble/styles';
import { OverridableComponent } from '@mui/types';
import Controls from '@/components/common/Bubble/Controls';

export interface ControlType {
  tooltip: string,
  disabled: boolean,
  color?: string,
  icon: OverridableComponent<SvgIconTypeMap>,
  onClick: (index: number) => void,
}

export interface BubbleProps {
  index: number;
  children: React.ReactNode;
  vertical: 'top' | 'center' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  color?: string;
  secondaryColor: string;
  fullWidth?: boolean;
  controls?: ControlType[];
}

function Bubble({ index, children, fullWidth, vertical, horizontal, color = '', secondaryColor, controls, }: BubbleProps) {
  const rightPanel = useMemo(() => {
    if (!controls) return;
    return <Controls index={ index } controls={ controls } />
  }, [index, controls]);

  return (
    <Wrapper direction={ horizontal === 'right' ? 'row-reverse' : 'row' } alignItems="flex-start" spacing={1} fullWidth={ fullWidth } vertical={ vertical } horizontal={ horizontal }>
      <StyledBubble variant="outlined" vertical={ vertical } horizontal={ horizontal } color={ color } secondaryColor={ secondaryColor } fullWidth={ fullWidth }>
        <Stack spacing={ 1 }>
          { children }
        </Stack>
      </StyledBubble>
      { rightPanel }
    </Wrapper>
  );
}

export default memo(Bubble);