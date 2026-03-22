'use client';

import { useEffect, useRef, useState } from 'react';
import { useEpsilon } from '../context';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider, ButtonGroup } from '@mui/material';

export default function AdminModal() {
  const { appMode, setAppMode, setLock, locked, authMode, setAuthMode } = useEpsilon();
  const [open, setOpen] = useState(false);
  const firstBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const element = document.activeElement as HTMLElement | null;
      const typing = !!element && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.isContentEditable);
      const useAdmin = e.key === 'F9' && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey;
      console.log(locked, typing, useAdmin)
      if (locked && !useAdmin) return;
      if (typing) return;
      if (useAdmin) {
        e.preventDefault(); e.stopPropagation(); setOpen(true);
      } else if (open && e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [open, locked]);

  useEffect(() => { if (open && firstBtnRef.current) firstBtnRef.current.focus(); }, [open]);

  const toFull = () => { setAppMode('full'); };
  const toPolice = () => { setAppMode('police'); };
  const toDoc = () => { setAppMode('doc'); };
  const lock = () => {
    setLock(true);
    setOpen(false);
  };
  const unlock = () => { setLock(false); };

  return (
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="admin-dialog-title" fullWidth maxWidth="xs">
        <DialogTitle id="admin-dialog-title">Admin Panel</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>Mode: <b>{appMode}</b> · Locked: <b>{locked ? 'yes' : 'no'}</b></Typography>

          <Divider sx={{ my: 2 }}>App Mode</Divider>
          <ButtonGroup fullWidth variant="outlined" sx={{ mt: 1, mb: 2 }}>
            <Button onClick={ toFull } disabled={ appMode === 'full' }>Director</Button>
            <Button onClick={ toPolice } disabled={ appMode === 'police' }>Police</Button>
            <Button onClick={ toDoc } disabled={ appMode === 'doc' }>Ripper doc</Button>
          </ButtonGroup>

          <Divider sx={{ my: 2 }}>Station</Divider>
          <ButtonGroup fullWidth variant="outlined" sx={{ mt: 1, mb: 2 }}>
            <Button color="warning" onClick={ lock } disabled={ locked }>Lock</Button>
            <Button color="success" onClick={ unlock } disabled={ !locked }>Unlock</Button>
          </ButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
        <Divider sx={{ my: 2 }}>Authentication</Divider>
        <ButtonGroup fullWidth variant="outlined" sx={{ mt: 1, mb: 2 }}>
          <Button
              color="success"
              onClick={() => setAuthMode('mock')}
              disabled={authMode === 'mock'}
          >
            Mock login
          </Button>

          <Button
              color="primary"
              onClick={() => setAuthMode('real')}
              disabled={authMode === 'real'}
          >
            Real backend
          </Button>
        </ButtonGroup>

        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          Current auth: <b>{authMode}</b>
        </Typography>
      </Dialog>
  );
}
