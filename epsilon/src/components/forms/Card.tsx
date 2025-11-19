import React, { useMemo, ReactNode } from 'react';
import { CardContent, CardHeader, Divider, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import NotesIcon from "@mui/icons-material/Notes";
import { alpha } from "@mui/material/styles";
import type { CSSProperties } from "@mui/material/styles";

interface Props {
    variant?: 'normal' | 'primary' | 'secondary' | 'notes',
    children?: ReactNode,
    icon?: ReactNode,
    title?: ReactNode,
    subTitle?: ReactNode,
    sx?: CSSProperties,
    contentSx?: CSSProperties,
    action?: ReactNode,
}

const notesStyles = (theme) => ({
    flex: 2,
    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, 
    ${alpha(theme.palette.secondary.main, 0.2)} 35%, ${theme.palette.background.paper} 100%)`,
    border: `1px dashed ${alpha(theme.palette.secondary.main, 0.8)}`,
    boxShadow: `0 0 14px ${alpha(theme.palette.secondary.main, 0.38)}`,
});

const primaryStyles = (theme) => ({
    flex: 1,
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.18)} 0%, 
    ${theme.palette.background.paper} 35%, ${alpha(theme.palette.primary.main, 0.06)} 100%)`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    boxShadow: `0 0 16px ${alpha(theme.palette.primary.main, 0.22)}`,
});

const secondaryStyles = (theme) => ({
    flex: 1,
    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.18)} 0%, 
    ${theme.palette.background.paper} 35%, ${alpha(theme.palette.secondary.main, 0.06)} 100%)`,
    border: `1px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
    boxShadow: `0 0 16px ${alpha(theme.palette.secondary.main, 0.22)}`,
});

const normalStyles = (theme) => ({
    flex: 1,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.22)}`,
});

function Card({ variant = 'normal', children, icon, title, subTitle, sx, action, contentSx }: Props) {
    const header = useMemo(() => {
        if (typeof title === 'string') return <Typography variant="subtitle2">{title}</Typography>;
        return title;
    },[title]);

    const subHeader = useMemo(() => {
        if (typeof subTitle === 'string') return <Typography variant="caption">{subTitle}</Typography>;
        return subTitle;
    },[subTitle]);

    const avatar = useMemo(() => {
        if (icon) return icon;
        if (variant === 'notes') return <NotesIcon />;
    },[variant, icon]);

    const styles = useMemo(() => {
        if (variant === 'notes') return t => ({ ...notesStyles(t), ...sx });
        if (variant === 'primary') return t => ({ ...primaryStyles(t), ...sx });
        if (variant === 'secondary') return t => ({ ...secondaryStyles(t), ...sx });
        if (variant === 'normal') return t => ({ ...normalStyles(t), ...sx });
        return sx;
    }, [variant, sx]);

    return (
        <MuiCard sx={styles}>
            <CardHeader avatar={avatar} title={header} subheader={subHeader} action={action}/>
            <Divider />
            <CardContent sx={contentSx}>{ children }</CardContent>
        </MuiCard>
    );
}

export default Card;