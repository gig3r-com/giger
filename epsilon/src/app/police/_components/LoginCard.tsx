'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, IconButton, InputAdornment, OutlinedInput, Paper, Stack, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { apiLogin } from '../_lib/mockApi';

const CenterWrap = styled(Box)({
  display: 'grid',
  placeItems: 'center',
  minHeight: 'calc(100svh - 140px)',
});

const Card = styled(Paper)(({ theme }) => ({
  width: 'min(560px, 92vw)',
  padding: 20,
  border: `1px solid ${theme.palette.divider}`,
  background: 'linear-gradient(180deg, rgba(8,12,22,.92), rgba(10,15,26,.96))',
}));

export function LoginCard({ onLogin }: { onLogin: (o: { name: string; clearance: 1|2|3|4|5 }) => void }) {
  const [user, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string|null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await apiLogin(user, pass);
      onLogin(res);
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <CenterWrap>
      <Card elevation={0}>
        <Stack component="form" onSubmit={submit} spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <FingerprintIcon />
            <Typography variant="h6">Officer Login</Typography>
          </Stack>

          {error && <Alert severity="error" variant="filled">{error}</Alert>}

          <TextField label="Username" value={user} onChange={e=>setUser(e.target.value)} disabled={loading} required />
          <OutlinedInput
            required
            type={show ? 'text' : 'password'}
            value={pass}
            disabled={loading}
            onChange={(e)=>setPass(e.target.value)}
            placeholder="Password"
            startAdornment={<InputAdornment position="start">•••</InputAdornment>}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={()=>setShow(s=>!s)} edge="end" disabled={loading}>
                  {show ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
          />

          <Stack direction={{ xs:'column', sm:'row' }} spacing={1.5}>
            <Button type="submit" disabled={loading} variant="contained" fullWidth>
              {loading ? 'Authorizing…' : 'Authorize'}
            </Button>
            <Button type="button" variant="outlined" color="secondary" disabled={loading} fullWidth>
              Forgot?
            </Button>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            Dev users: alpha, bravo, charlie, delta, omega — pass: <code>delta-9</code>
          </Typography>
        </Stack>
      </Card>
    </CenterWrap>
  );
}
