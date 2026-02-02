'use client';

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import type { DialogProps } from '@mui/material/Dialog';

type ModalOptions = {
  title?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode; // custom actions; if omitted + confirm() used, default Confirm/Cancel are shown
  dismissable?: boolean; // backdrop/esc close allowed
  dialogProps?: Omit<DialogProps, 'open' | 'onClose'>;
};

type ModalContextValue = {
  open: (opts: ModalOptions) => void;
  close: () => void;
  confirm: (opts: Omit<ModalOptions, 'actions'>) => Promise<boolean>;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState<ModalOptions>({});
  const resolverRef = useRef<((answer: boolean) => void) | null>(null);
  const isConfirmRef = useRef(false);

  const close = useCallback(() => {
    setOpen(false);
    // if confirm() was used and user closed via X/backdrop, treat as cancel
    if (isConfirmRef.current && resolverRef.current) {
      resolverRef.current(false);
      resolverRef.current = null;
      isConfirmRef.current = false;
    }
  }, []);

  const handleRequestClose = useCallback(
    (_e: unknown, reason?: 'backdropClick' | 'escapeKeyDown') => {
      if (opts.dismissable === false && (reason === 'backdropClick' || reason === 'escapeKeyDown')) return;
      close();
    },
    [close, opts.dismissable]
  );

  const openModal = useCallback((next: ModalOptions) => {
    isConfirmRef.current = false;
    resolverRef.current = null;
    setOpts(next);
    setOpen(true);
  }, []);

  const confirm = useCallback((next: Omit<ModalOptions, 'actions'>) => {
    return new Promise<boolean>((resolve) => {
      isConfirmRef.current = true;
      resolverRef.current = resolve;
      setOpts(next);
      setOpen(true);
    });
  }, []);

  const onConfirm = useCallback(() => {
    setOpen(false);
    if (resolverRef.current) resolverRef.current(true);
    resolverRef.current = null;
    isConfirmRef.current = false;
  }, []);

  const onCancel = useCallback(() => {
    setOpen(false);
    if (resolverRef.current) resolverRef.current(false);
    resolverRef.current = null;
    isConfirmRef.current = false;
  }, []);

  const value = useMemo<ModalContextValue>(() => ({ open: openModal, close, confirm }), [openModal, close, confirm]);

  return (
    <ModalContext.Provider value={value}>
      {children}

      <Dialog
        open={open}
        onClose={handleRequestClose}
        fullWidth
        maxWidth='sm'
        {...opts.dialogProps}
      >
        {opts.title && <DialogTitle>{opts.title}</DialogTitle>}
        {opts.content && <DialogContent dividers>{opts.content}</DialogContent>}

        <DialogActions sx={{ px: 3, py: 2 }}>
          {opts.actions ? (
            opts.actions
          ) : isConfirmRef.current ? (
            <>
              <Button onClick={onCancel} color='inherit' variant='text'>Cancel</Button>
              <Button onClick={onConfirm} variant='contained'>Confirm</Button>
            </>
          ) : (
            <Button onClick={close} variant='contained'>OK</Button>
          )}
        </DialogActions>
      </Dialog>
    </ModalContext.Provider>
  );
}
