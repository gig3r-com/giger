'use client';
import React, { useCallback } from 'react';
import { styled, keyframes } from '@mui/material/styles';
import {
  Alert, Box, Button, Chip, Divider, IconButton, InputAdornment,
  Paper, Stack, TextField, Typography, Tooltip
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import BoltIcon from '@mui/icons-material/Bolt';
import { loginPoliceman } from '@/actions/auth';
import { redirect } from 'next/navigation';
import Backdrop from '@mui/material/Backdrop';

const CenterWrap = styled(Box)({
  display: 'grid',
  placeItems: 'center',
  minHeight: 'calc(100svh - 140px)',
  padding: 16,
  position: 'fixed',
  top: 0, left: 0, bottom: 0, right: 0,
  background:
    'radial-gradient(100vh 100vh at 10% 0%, rgba(0,255,200,0.08), transparent 60%), ' +
    'radial-gradient(100vh 100vh at 90% 100%, rgba(255,0,120,0.06), transparent 60%)',
});

// subtle CRT scanlines
const scan = keyframes`
  from { background-position: 0 0; }
  to   { background-position: 0 4px; }
`;

// neon “safety” shimmer
const shimmer = keyframes`
  0% { box-shadow: 0 0 0px rgba(0,255,200,0.0), inset 0 0 0 rgba(0,0,0,0); }
  50% { box-shadow: 0 0 18px rgba(0,255,200,0.25), inset 0 0 0 rgba(0,0,0,0); }
  100% { box-shadow: 0 0 0px rgba(0,255,200,0.0), inset 0 0 0 rgba(0,0,0,0); }
`;

const Card = styled(Paper)(({ theme }) => ({
  width: 'min(560px, 92vw)',
  padding: 22,
  border: `1px solid ${theme.palette.divider}`,
  background: 'linear-gradient(180deg, rgba(8,12,22,.92), rgba(10,15,26,.96))',
  position: 'relative',
  overflow: 'hidden',
  // inner scanlines + top HUD line
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.04), rgba(255,255,255,0.04)),' + // soft veil
      'repeating-linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px)',
    pointerEvents: 'none',
    animation: `${scan} 2.5s linear infinite`,
    opacity: 0.35,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 2,
    background: `linear-gradient(90deg,
      transparent 0%,
      ${theme.palette.primary.main} 25%,
      ${theme.palette.secondary.main} 50%,
      ${theme.palette.primary.main} 75%,
      transparent 100%)`,
    opacity: 0.7,
    filter: 'blur(0.3px)',
  },
}));

const NeonHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: 10,
  paddingBottom: 6,
  textTransform: 'uppercase',
  letterSpacing: 1.5,
  color: theme.palette.primary.main,
  textShadow: `0 0 10px ${theme.palette.primary.main}55`,
}));

const CyberButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.primary.main,
  fontWeight: 700,
  letterSpacing: 1,
  textTransform: 'uppercase',
  border: `1px solid ${theme.palette.primary.main}99`,
  background: `linear-gradient(180deg, ${theme.palette.primary.main}1A, ${theme.palette.primary.main}33)`,
  animation: `${shimmer} 3.5s ease-in-out infinite`,
  '&:hover': {
    background: `linear-gradient(180deg, ${theme.palette.primary.main}33, ${theme.palette.primary.main}55)`,
    boxShadow: `0 0 18px ${theme.palette.primary.main}55`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.2) 40%, transparent 80%)',
    transform: 'translateX(-100%)',
    transition: 'transform .6s ease',
  },
  '&:hover::before': {
    transform: 'translateX(100%)',
  },
}));

const DemoCard = styled(Paper)(({ theme }) => ({
  width: 'min(560px, 92vw)',
  padding: 14,
  border: `1px solid ${theme.palette.divider}`,
  borderTop: 'none',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  background: 'linear-gradient(180deg, rgba(7,10,18,.7), rgba(7,10,18,.88))',
}));

const MonoRow = styled('div')(({ theme }) => ({
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: 12,
  padding: '6px 8px',
  borderRadius: 6,
  border: `1px dashed ${theme.palette.divider}`,
  alignItems: 'center',
  transition: 'background .2s ease, border-color .2s ease',
  '&:hover': {
    background: 'rgba(0,255,200,0.05)',
    borderColor: theme.palette.primary.main,
  },
}));

export function LoginCard() {
  const [username, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const changeLogin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value), []);
  const changePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), []);

  const handleFill = (u: string, h: string) => {
    setError('');
    setUser(u);
    setPassword(h);
  };

  const onSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await loginPoliceman(username, password);
      if (result?.error) setError(result.error ?? 'Invalid credentials');
      setLoading(false);
    } catch (e) {
      console.log(e)
      setLoading(false);
    }
  };

  return (
    <CenterWrap>
      <Box>
        { loading && <Backdrop /> }
        <Card elevation={0}>
          <Stack
            component="form"
            onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
            spacing={2.2}
          >
            <NeonHeader direction="row">
              <FingerprintIcon />
              <Typography variant="h6">Police Network · Secure Login</Typography>
              <BoltIcon fontSize="small" />
            </NeonHeader>

            <Divider flexItem sx={{ borderColor: 'primary.main', opacity: 0.4 }} />

            {error && (
              <Alert severity="error" variant="filled">
                {error}
              </Alert>
            )}

            <TextField
              required
              size="small"
              label="Username"
              value={username}
              onChange={changeLogin}
              disabled={loading}
              name="username"
              autoComplete="username"
              placeholder="e.g. m1guel"
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'primary.main' },
                '& .MuiOutlinedInput-input': { fontWeight: 600, letterSpacing: 0.4 },
              }}
            />

            <TextField
              required
              size="small"
              name="password"
              type={show ? 'text' : 'password'}
              value={password}
              disabled={loading}
              onChange={changePassword}
              autoComplete="current-password"
              placeholder="•••••••"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={show ? 'Hide password' : 'Show password'}>
                      <span>
                        <IconButton onClick={() => setShow(s => !s)} edge="end" disabled={loading}>
                          {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </span>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'primary.main' },
                '& .MuiOutlinedInput-input': { fontWeight: 700, letterSpacing: 2 },
              }}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <CyberButton type="submit" disabled={loading} variant="contained" fullWidth>
                {loading ? 'Authorizing…' : 'Authorize'}
              </CyberButton>
            </Stack>

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Chip size="small" label="AES-256" variant="outlined" />
              <Chip size="small" label="Zone: OMEGA-3" variant="outlined" />
              <Chip size="small" label="v5.2" variant="outlined" />
            </Stack>
          </Stack>
        </Card>

        {/* Demo credentials — fused panel, no top border/radius */}
        <DemoCard variant="outlined" sx={{ mt: -1.1, zIndex: 0 }}>
          <Typography variant="overline" sx={{ opacity: 0.7 }}>
            Omni Police Credentials
          </Typography>

          <Stack spacing={1.0} sx={{ mt: 1 }}>
            {[
              { u: 'm1guel', h: 'resist', lvl: 3 },
              { u: 'nakajima', h: 'electronic', lvl: 2 },
              { u: 'not_bruce', h: 'nanotech', lvl: 2 },
              { u: 'schmidt', h: 'analytics', lvl: 1 },
              { u: 'the_han', h: 'mainframe', lvl: 1 },
              { u: 'nakage_900', h: 'optimize', lvl: 1 },
            ].map(({ u, h, lvl }) => (
              <MonoRow key={u} onClick={() => handleFill(u, h)} sx={{ cursor: 'pointer' }}>
                <Typography color="text.secondary">
                  {u} · {h} · Access level {lvl}
                </Typography>
              </MonoRow>
            ))}
          </Stack>
        </DemoCard>
      </Box>
    </CenterWrap>
  );
}
